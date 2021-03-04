import * as express from 'express'

const { corsHandler } = require('../index')

const router = express.Router()
const bodyParser = require('body-parser')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))
var AWS = require('aws-sdk')
AWS.config.update({
  accessKeyId: 'AKIAIP2UOWNJHVDDZDFQ',
  secretAccessKey: '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',
  region: 'us-east-2',
  endpoint: 'https://wa11sy9gb.mediaconvert.us-east-2.amazonaws.com'
})

router.post('/mediaConvert', (req, res) => {
  return corsHandler(req, res, async () => {
    try {
      const {
        resolution,
        ratio,
        format,
        container,
        assetId,
        fileName,
        fileWidth,
        fileHeight
      } = req.body

      //   const customer = await stripe.customers.create({
      //     email,
      //     name
      //   });

      await resizeVideo(
        resolution,
        ratio,
        format,
        container,
        assetId,
        fileName,
        fileWidth,
        fileHeight
      )

      //   return res.json(customer)
    } catch (error) {
      //   console.log("create_customer", error)
      //   return res.status(400).send(error)
    }
  })
})

const resizeVideo = async (
  resolution: number,
  ratio: any,
  format: any,
  container: string,
  assetId: string,
  fileName: string,
  fileHeight: number,
  fileWidth: number
) => {
  console.log(
    resolution,
    ratio,
    format,
    container,
    assetId,
    fileName,
    fileHeight,
    fileWidth,
    'vvvvvvvvvvvvvvvvvv'
  )

//const originalRatio =  fileWidth/fileHeight      //1280 x 720 
const newRatio = ratio.w/ratio.h      // 0.5625

// original ratio is larger than newRatio meaning width is larger than end size. We will crop width in this case.
const newWidth=fileWidth>ratio.w?newRatio*fileHeight:ratio.w
const newHeight=fileHeight>ratio.h?newRatio*fileWidth:ratio.h

// //That gives us `width` and `height` for cropping params

// // Now we have crop frame but we need to center it. 
// // Since we are cropping width we will be centering with X. 
const croppedWidth = fileWidth>ratio.w?fileWidth - newWidth:2 ;// This is amount of px being cut
const croppedHeight=fileHeight>ratio.h?fileHeight-newHeight:2
const X = fileWidth>ratio.w?croppedWidth / 2:0 ;// Even spacing on both sides of video
const Y = fileHeight>ratio.h?croppedWidth / 2:0 ;
  try {
    console.log('resizessssssssssssssssssssssssssssssssssssssssss')
    var params = {
      // Queue: "JOB_QUEUE_ARN",
      UserMetadata: {
        Customer: 'Amazon'
      },
      Role:
        'arn:aws:iam::460614553226:role/service-role/MediaConvert_Default_Role',
      Settings: {
        OutputGroups: [
          {
            Name: 'magnify-technologies',
            OutputGroupSettings: {
              Type: 'FILE_GROUP_SETTINGS',
              FileGroupSettings: {
                Destination: 's3://cybervault-bucket/new-file'
              }
            },
            Outputs: [
              {
                VideoDescription: {
                  ScalingBehavior: 'DEFAULT',
                  TimecodeInsertion: 'DISABLED',
                  AntiAlias: 'ENABLED',
                  Sharpness: 100,
                  CodecSettings:
                    format === 'h.264'
                      ? {
                          Codec: 'H_264',
                          H264Settings: {
                            Bitrate: 7200,
                            FramerateControl: 'INITIALIZE_FROM_SOURCE',
                            FramerateConversionAlgorithm: 'DUPLICATE_DROP',
                            FramerateDenominator: 50,
                            FramerateNumerator: 50,
                            GopSize: 50,
                            HrdBufferSize: 50,
                            MaxBitrate: 7200,
                            ParControl: 'INITIALIZE_FROM_SOURCE',
                            ParDenominator: 50,
                            ParNumerator: 50,
                            QualityTuningLevel: 'MULTI_PASS_HQ',
                            RateControlMode: 'VBR'
                          }
                        }
                      : {
                          Codec: 'PRORES',
                          ProresSettings: {
                            CodecProfile: 'APPLE_PRORES_422',
                            FramerateControl: 'INITIALIZE_FROM_SOURCE',
                            FramerateConversionAlgorithm: 'DUPLICATE_DROP',
                            FramerateDenominator: 50,
                            FramerateNumerator: 50,
                            ParControl: 'INITIALIZE_FROM_SOURCE',
                            ParDenominator: 50,
                            ParNumerator: 50
                          }
                        },
                  Crop: {
                      Height:croppedHeight,
                      Width: croppedWidth,
                      X: X,
                      Y: Y
                    },
                  // AfdSignaling: "NONE",
                  // DropFrameTimecode: "ENABLED",
                  // RespondToAfd: "NONE",
                  // ColorMetadata: "INSERT",
                  Height: resolution,
                },

                ContainerSettings: {
                  Container: container,
                  Mp4Settings: {
                    CslgAtom: 'INCLUDE',
                    FreeSpaceBox: 'EXCLUDE',
                    MoovPlacement: 'PROGRESSIVE_DOWNLOAD'
                  }
                }
              }
            ]
          }
        ],
        AdAvailOffset: 0,
        Inputs: [
          {
            VideoSelector: {
              ColorSpace: 'FOLLOW'
            },
            FilterEnable: 'AUTO',
            PsiControl: 'USE_PSI',
            FilterStrength: 0,
            DeblockFilter: 'DISABLED',
            DenoiseFilter: 'DISABLED',
            TimecodeSource: 'EMBEDDED',
            FileInput:
              's3://cybervault-bucket/8K ● Nature Videos high resolution.mp4'
          }
        ],
        TimecodeConfig: {
          Source: 'EMBEDDED'
        }
      }
    }

    var createJonPromise = new AWS.MediaConvert({ apiVersion: '2017-08-29' })
      .createJob(params)
      .promise()

    await createJonPromise
  } catch (error) {
    console.log(error, '=========')
  }
}

module.exports = router
