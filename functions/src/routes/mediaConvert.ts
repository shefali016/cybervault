import * as functions from 'firebase-functions'
import * as express from 'express'
import config from '../config.json'
const { corsHandler } = require('../index')

const router = express.Router()
const bodyParser = require('body-parser')
var AWS = require('aws-sdk')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))
AWS.config.update({
  accessKeyId: functions.config().aws_config.access_key_id,
  secretAccessKey: functions.config().aws_config.secret_acces_key,
  region: functions.config().aws_config.region,
  endpoint: functions.config().aws_config.endpoint
})

let mediaConvert = new AWS.MediaConvert({ apiVersion: '2017-08-29' })

router.post('/convert', (req, res) => {
  return corsHandler(req, res, async () => {
    try {
      let videoArray = req.body.data.map(async (item: any, i: number) => {
        return await resizeVideo(item)
      })

      let result = await Promise.all(videoArray)
      return await res.status(200).send(result)
    } catch (error) {
      console.log('create_customer', error)
      return res.status(400).send(error)
    }
  })
})

const resizeVideo = async (item: any) => {
  return new Promise(async (resolve, reject) => {
    const {
      resolution,
      ratio,
      format,
      assetId,
      id,
      fileName,
      fileWidth,
      fileHeight
    } = item

    const name = fileName

    const originalRatio = fileWidth / fileHeight
    const newRatio = ratio.w / ratio.h

    const newWidth = Math.ceil(newRatio * resolution)

    // //That gives us `width` and `height` for cropping params

    // // Now we have crop frame but we need to center it.
    // // Since we are cropping width we will be centering with X.
    const croppedWidth = Math.ceil(fileWidth - newWidth) // This is amount of px being cut
    const X = Math.ceil(croppedWidth / 2) // Even spacing on both sides of video
    const Y = 0

    const getVideoDescription = () => {
      if (originalRatio > newRatio) {
        return {
          ScalingBehavior: 'DEFAULT',
          TimecodeInsertion: 'DISABLED',
          AntiAlias: 'ENABLED',
          Sharpness: 50,
          CodecSettings: codecSettings(),
          AfdSignaling: 'NONE',
          DropFrameTimecode: 'ENABLED',
          RespondToAfd: 'NONE',
          ColorMetadata: 'INSERT',
          Crop: {
            X: X,
            Y: Y,
            Width: newWidth,
            Height: resolution
          },
          Width: newWidth,
          Height: resolution
        }
      } else {
        return {
          ScalingBehavior: 'DEFAULT',
          TimecodeInsertion: 'DISABLED',
          AntiAlias: 'ENABLED',
          Sharpness: 50,
          CodecSettings: codecSettings(),
          AfdSignaling: 'NONE',
          DropFrameTimecode: 'ENABLED',
          RespondToAfd: 'NONE',
          ColorMetadata: 'INSERT',
          Width: newWidth,
          Height: resolution
        }
      }
    }
    const codecSettings = () => {
      if (format === 'prores') {
        return {
          Codec: 'PRORES',
          ProresSettings: {
            CodecProfile: 'APPLE_PRORES_422',
            FramerateControl: 'INITIALIZE_FROM_SOURCE',
            FramerateConversionAlgorithm: 'DUPLICATE_DROP',
            InterlaceMode: 'PROGRESSIVE',
            ParControl: 'INITIALIZE_FROM_SOURCE',
            ScanTypeConversionMode: 'INTERLACED',
            SlowPal: 'DISABLED',
            Telecine: 'NONE'
          }
        }
      } else {
        return {
          Codec: 'H_264',
          H264Settings: {
            InterlaceMode: 'PROGRESSIVE',
            ScanTypeConversionMode: 'INTERLACED',
            NumberReferenceFrames: 3,
            Syntax: 'DEFAULT',
            Softness: 0,
            GopClosedCadence: 1,
            GopSize: 90,
            Slices: 1,
            GopBReference: 'DISABLED',
            SlowPal: 'DISABLED',
            EntropyEncoding: 'CABAC',
            FramerateControl: 'INITIALIZE_FROM_SOURCE',
            RateControlMode: 'CBR',
            CodecProfile: 'MAIN',
            Telecine: 'NONE',
            MinIInterval: 0,
            AdaptiveQuantization: 'AUTO',
            CodecLevel: 'AUTO',
            FieldEncoding: 'PAFF',
            SceneChangeDetect: 'ENABLED',
            QualityTuningLevel: 'SINGLE_PASS',
            FramerateConversionAlgorithm: 'DUPLICATE_DROP',
            UnregisteredSeiTimecode: 'DISABLED',
            GopSizeUnits: 'FRAMES',
            ParControl: 'INITIALIZE_FROM_SOURCE',
            NumberBFramesBetweenReferenceFrames: 2,
            RepeatPps: 'DISABLED',
            DynamicSubGop: 'STATIC',
            Bitrate: resolution * 800
          }
        }
      }
    }

    const containerSettings = () => {
      if (format === 'prores') {
        return {
          Container: 'MOV',
          MovSettings: {
            ClapAtom: 'INCLUDE',
            CslgAtom: 'INCLUDE',
            PaddingControl: 'OMNEON',
            Reference: 'SELF_CONTAINED'
          }
        }
      } else {
        return {
          Container: 'MP4',
          Mp4Settings: {
            CslgAtom: 'INCLUDE',
            CttsVersion: 0,
            FreeSpaceBox: 'EXCLUDE',
            MoovPlacement: 'PROGRESSIVE_DOWNLOAD',
            AudioDuration: 'DEFAULT_CODEC_DURATION'
          }
        }
      }
    }
    try {
      var params = {
        Settings: {
          AdAvailOffset: 0,
          Inputs: [
            {
              FilterEnable: 'AUTO',
              PsiControl: 'USE_PSI',
              FilterStrength: 0,
              DeblockFilter: 'DISABLED',
              DenoiseFilter: 'DISABLED',
              InputScanType: 'AUTO',
              TimecodeSource: 'ZEROBASED',
              VideoSelector: {
                ColorSpace: 'FOLLOW',
                Rotate: 'DEGREE_0',
                AlphaBehavior: 'DISCARD'
              },
              AudioSelectors: {
                'Audio Selector 1': {
                  Offset: 0,
                  DefaultSelection: 'DEFAULT',
                  ProgramSelection: 1
                }
              },
              FileInput: `s3://${config.bucketName}/videos/${assetId}/original-${name}`
            }
          ],
          OutputGroups: [
            {
              Name: 'File Group',
              OutputGroupSettings: {
                Type: 'FILE_GROUP_SETTINGS',
                FileGroupSettings: {
                  Destination: `s3://${config.bucketName}/videos/${assetId}/${resolution}/${id}`,
                  DestinationSettings: {
                    S3Settings: {
                      AccessControl: {
                        CannedAcl: 'PUBLIC_READ'
                      }
                    }
                  }
                }
              },
              Outputs: [
                {
                  VideoDescription: getVideoDescription(),
                  AudioDescriptions: [
                    {
                      AudioTypeControl: 'FOLLOW_INPUT',
                      CodecSettings: {
                        Codec: 'AAC',
                        AacSettings: {
                          AudioDescriptionBroadcasterMix: 'NORMAL',
                          Bitrate: 96000,
                          RateControlMode: 'CBR',
                          CodecProfile: 'LC',
                          CodingMode: 'CODING_MODE_2_0',
                          RawFormat: 'NONE',
                          SampleRate: 48000,
                          Specification: 'MPEG4'
                        }
                      },
                      LanguageCodeControl: 'FOLLOW_INPUT'
                    }
                  ],
                  ContainerSettings: containerSettings()
                }
              ]
            }
          ],

          TimecodeConfig: {
            Source: 'ZEROBASED'
          }
        },
        Role:
          'arn:aws:iam::460614553226:role/service-role/MediaConvert_Default_Role'
      }

      let createJobPromise = mediaConvert.createJob(params).promise()
      return createJobPromise
        .then((res: any) => {
          getJobDetails(res.Job.Id)
            .then((jobDetails: any) => {
              console.log('jobDetails', jobDetails)

              resolve({
                height: resolution,
                width: newWidth,
                original: false,
                id: id,
                assetId: assetId,
                status: 'complete',
                url: `https://${
                  config.bucketName
                }.s3.us-east-2.amazonaws.com/videos/${assetId}/${id}${
                  format === 'prores' ? '.mov' : '.mp4'
                }`
              })
            })
            .catch((error: any) => {
              reject(error)
            })
        })
        .catch((error: any) => {
          reject(error)
        })
    } catch (error) {
      console.log('Convert error', error)
      reject(error)
    }
  })
}

async function getJobDetails(Id: any) {
  return new Promise(async (resolve: any, reject: any) => {
    try {
      let status = ''
      let result

      while (status == 'PROGRESSING' || status == '') {
        result = await mediaConvert
          .getJob({
            Id: Id
          })
          .promise()

        status = result.Job.Status

        console.log('Job status', status)

        await sleep(60)
      }

      resolve(result)
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}

async function sleep(second: any) {
  return new Promise((resolve) => setTimeout(resolve, second))
}

module.exports = router
