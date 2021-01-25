import { Typography } from '@material-ui/core'
import { GradiantButton } from 'components/Common/Button/GradiantButton'
import { ImageCarousel } from 'components/Common/Carousel'
import { DragAndDropUploader } from 'components/Common/DragAndDropFileUpload'
import { renderDevider } from 'components/ProjectInfoDisplay/renderDetails'
import { FLEX } from 'utils/constants/stringConstants'
import { ProjectAsset } from 'utils/Interface'

type UploadMediaImage = {
  textColor: string
  imageCorouselContainer: string
  image: Array<ProjectAsset>
  generalMarginTop: string
  onImageUpload: (data: any) => void
  isImageLoading: boolean | undefined
  button: string
  handleUpdateProject: () => void
  buttonText: string
  updateDetails: boolean
}

type UploadMediaVideo = {
  uploadVideoContainer: string
  textColor: string
  videoCorouselContainer: string
  onVideoUpload: (data: any) => void
  video: Array<ProjectAsset>
  isVideoLoading: boolean | undefined
  generalMarginTop: string
}

export const renderImageCarousel = (props: UploadMediaImage) => {
  const {
    textColor,
    imageCorouselContainer,
    image,
    generalMarginTop,
    onImageUpload,
    isImageLoading,
    button,
    handleUpdateProject,
    buttonText,
    updateDetails
  } = props

  return (
    <>
      <Typography className={textColor}>Upload Photo Content</Typography>
      <div style={{ display: FLEX }}>
        <div className={imageCorouselContainer}>
          <ImageCarousel source={image} isImageLoading={isImageLoading} />
        </div>
        <div className={generalMarginTop}>
          <DragAndDropUploader
            onSubmit={(file: File) => onImageUpload(file)}
            isLoading={isImageLoading}
          />
        </div>
      </div>
      <div className={button}>
        <GradiantButton
          onClick={() => handleUpdateProject()}
          width={135}
          height={40}
          loading={updateDetails}>
          <Typography className={buttonText}> Save Changes</Typography>
        </GradiantButton>
      </div>
    </>
  )
}

export const renderVideoCarousel = (props: UploadMediaVideo) => {
  const {
    uploadVideoContainer,
    textColor,
    videoCorouselContainer,
    onVideoUpload,
    video,
    isVideoLoading,
    generalMarginTop
  } = props
  return (
    <div className={uploadVideoContainer}>
      <Typography className={textColor}>Upload Videos</Typography>
      <div style={{ display: FLEX }}>
        <div className={videoCorouselContainer}>
          <ImageCarousel
            isVideo
            source={video}
            isVideoLoading={isVideoLoading}
          />
        </div>
        <div className={generalMarginTop}>
          <DragAndDropUploader
            isVideo
            onSubmit={onVideoUpload}
            isLoading={isVideoLoading}
          />
        </div>
      </div>
      {renderDevider({ editInfo: true })}
    </div>
  )
}
