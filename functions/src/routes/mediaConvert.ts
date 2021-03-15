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

// var s3 = new AWS.S3()

router.post('/convert', (req, res) => {
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
      // return await getMedia(assetId, fileName)
      return await resizeVideo(
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
      console.log('create_customer', error)
      return res.status(400).send(error)
    }
  })
})

// const getMedia = async (assetId: string, fileName: string) => {
//   var params = {
//     Bucket: 'cybervault-bucket',
//     Key: `${assetId}${fileName}`
//   }
//   return await s3.getObject(params, (err: any, data: any) => {
//     if (err) {
//       console.log(err, err.stack,"yyyyyyyyyyyyyyyyyyy")
//     }
//     // an error occurred
//     else {
//       console.log(assetId,fileName,"rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
//       console.log(data.Metadata,"jjjjjjjjjjjjjjjjjjj")
//       return data
//     } // successful response
//     /*
//    data = {
//     AcceptRanges: "bytes", 
//     ContentLength: 3191, 
//     ContentType: "image/jpeg", 
//     ETag: "\"6805f2cfc46c0f04559748bb039d69ae\"", 
//     LastModified: <Date Representation>, 
//     Metadata: {
//     }, 
//     TagCount: 2, 
//     VersionId: "null"
//    }
//    */
//   })
// }

const resizeVideo = async (
  resolution: number,
  ratio: any,
  format: any,
  container: string,
  assetId: string,
  fileName: string,
  fileWidth: number,
  fileHeight: number
) => {
  console.log(
    resolution,
    ratio,
    format,
    container,
    assetId,
    fileName,
    fileWidth,
    fileHeight,
    'vvvvvvvvvvvvvvvvvv'
  )

const originalRatio =  fileWidth/fileHeight      //1280 x 720
const newRatio = ratio.w/ratio.h      // 0.5625

// original ratio is larger than newRatio meaning width is larger than end size. We will crop width in this case.
const cropWidth=originalRatio>newRatio?newRatio*fileHeight:ratio.w

// //That gives us `width` and `height` for cropping params

// // Now we have crop frame but we need to center it.
// // Since we are cropping width we will be centering with X.
const croppedWidth = originalRatio>newRatio?Math.ceil((fileWidth - cropWidth)/2)*2:2 ;// This is amount of px being cut
const croppedHeight=2
const X = originalRatio>newRatio?croppedWidth / 2:0 ;// Even spacing on both sides of video
const Y = originalRatio<newRatio?croppedWidth / 2:0 ;

console.log(originalRatio,newRatio,croppedWidth,croppedHeight,X,Y,"hhhhhhhhhhhhhhhhh")
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
                Destination: 's3://cybervault-bucket/'
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
              `s3://cybervault-bucket/${fileName}`
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
