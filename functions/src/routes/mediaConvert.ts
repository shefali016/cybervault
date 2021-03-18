import * as express from 'express'

const { corsHandler } = require('../index')

const router = express.Router()
const bodyParser = require('body-parser')
var AWS = require('aws-sdk')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))
AWS.config.update({
  accessKeyId: 'AKIAIP2UOWNJHVDDZDFQ',
  secretAccessKey: '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',
  region: 'us-east-2',
  endpoint: 'https://wa11sy9gb.mediaconvert.us-east-2.amazonaws.com'
})

// var s3 = new AWS.S3()

router.post('/convert', (req, res) => {
  return corsHandler(req, res, async () => {
    try {
      let videoArray = req.body.data.map(async (item: any, i: number) => {
        return await resizeVideo(item)
      })
      console.log(videoArray)
      let result = await Promise.all(videoArray)
      return await res.status(200).send(result)

      // console.log(req.body, videoArray, 'bodyyyyyy')

    } catch (error) {
      console.log('create_customer', error)
      return res.status(400).send(error)
    }
  })
})

const resizeVideo = async (item: any) => {
  return new Promise(async ( resolve, reject) => {
    const {
      resolution,
      ratio,
      format,
      // container,
      id,
      fileName,
      fileWidth,
      fileHeight
    } = item

    const name=fileName.replace(/ /g,"")
  
    const originalRatio = fileWidth / fileHeight //1280 x 720
    const newRatio = ratio.w / ratio.h // 0.5625
  
    // original ratio is larger than newRatio meaning width is larger than end size. We will crop width in this case.
    const cropWidth = originalRatio > newRatio ? newRatio * fileHeight : fileWidth
  
    // //That gives us `width` and `height` for cropping params
  
    // // Now we have crop frame but we need to center it.
    // // Since we are cropping width we will be centering with X.
    const croppedWidth =
      originalRatio > newRatio ? Math.ceil((fileWidth - cropWidth) / 2) * 2 : 2 // This is amount of px being cut
    const croppedHeight = 2
    const X = originalRatio > newRatio ? croppedWidth / 2 : 0 // Even spacing on both sides of video
    const Y = 0
  
    console.log(
      originalRatio,
      newRatio,
      croppedWidth,
      croppedHeight,
      X,
      Y,
      'hhhhhhhhhhhhhhhhh'
    )
    const codecSettings=()=>{
      if(format==='prores'){
          return {
            Codec: 'PRORES',
            ProresSettings: {
              CodecProfile: "APPLE_PRORES_422",
              FramerateControl: "INITIALIZE_FROM_SOURCE",
              FramerateConversionAlgorithm: "DUPLICATE_DROP",
              InterlaceMode: "PROGRESSIVE",
              ParControl: "INITIALIZE_FROM_SOURCE",
              ScanTypeConversionMode: "INTERLACED",
              SlowPal: "DISABLED",
              Telecine: "NONE"
            },
          }
      }
      else{
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
              FileInput: `s3://cybervault-bucket/${id}${name}`
            }
          ],
          OutputGroups: [
            {
              Name: 'File Group',
              OutputGroupSettings: {
                Type: 'FILE_GROUP_SETTINGS',
                FileGroupSettings: {
                  Destination: `s3://cybervault-bucket/${id}/${resolution}/`,
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
                  VideoDescription: {
                    ScalingBehavior: 'DEFAULT',
                    TimecodeInsertion: 'DISABLED',
                    AntiAlias: 'ENABLED',
                    Sharpness: 50,
                    CodecSettings: codecSettings(),
                    AfdSignaling: 'NONE',
                    DropFrameTimecode: 'ENABLED',
                    RespondToAfd: 'NONE',
                    ColorMetadata: 'INSERT',
                    // Crop: {
                    //   X: X,
                    //   Y: Y,
                    //   Width: croppedWidth,
                    //   Height: croppedHeight
                    // },
                    Width: cropWidth,
                    Height: resolution
                  },
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
                  ContainerSettings: {
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
  
      var createJonPromise = new AWS.MediaConvert({ apiVersion: '2017-08-29' })
        .createJob(params)
        .promise()
      createJonPromise.then(() => {
        resolve({
          height: resolution,
          width: cropWidth,
          original: false,
          id: id,
          url: `https://cybervault-bucket.s3.us-east-2.amazonaws.com/${id}/${resolution}/${id}${name}`
        })
      }).catch((error:any) => {
        reject(error)
      })
    } catch (error) {
      console.log(error, '=========')
      reject(error)
    }
  })
}

module.exports = router
