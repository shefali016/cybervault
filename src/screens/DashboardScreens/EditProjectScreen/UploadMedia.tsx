import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { AssetCarousel } from 'components/Common/Carousel'
import { DragAndDropUploader } from 'components/Common/DragAndDropFileUpload'

type AssetUploadDisplayProps = {
  containerClassName?: string
  carouselClassName?: string
  uploaderClassName?: string
  titleClassName?: string
  assetIds: Array<string>
  accountId: string
  onUpload: (data: any) => void
  isLoading: boolean | undefined
  title: string
  isVideo?: boolean
}

export const AssetUploadDisplay = (props: AssetUploadDisplayProps) => {
  const {
    titleClassName,
    containerClassName,
    carouselClassName,
    uploaderClassName,
    assetIds,
    onUpload,
    isLoading,
    accountId,
    title,
    isVideo
  } = props

  const classes = useStyles()

  return (
    <div className={clsx(classes.containerClassName, containerClassName)}>
      {!!title && <Typography className={titleClassName}>{title}</Typography>}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flex: 1,
          justifyContent: 'space-around'
        }}>
        <div className={carouselClassName}>
          <AssetCarousel
            assetIds={assetIds}
            accountId={accountId}
            isVideo={isVideo}
          />
        </div>
        <div className={clsx(classes.uploaderClassName, uploaderClassName)}>
          <DragAndDropUploader
            onSubmit={(file: File) => onUpload(file)}
            isLoading={isLoading}
            isVideo={isVideo}
          />
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  containerClassName: {
    display: 'flex',
    flexDirection: 'column',
    color: theme.palette.text.background
  },
  uploaderClassName: {}
}))
