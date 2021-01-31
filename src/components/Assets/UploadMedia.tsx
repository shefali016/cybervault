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
    <div className={clsx(classes.container, containerClassName)}>
      {!!title && (
        <Typography
          variant='h6'
          className={clsx(classes.title, titleClassName)}>
          {title}
        </Typography>
      )}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flex: 1,
          justifyContent: 'space-between'
        }}>
        <div className={carouselClassName}>
          <AssetCarousel
            assetIds={assetIds}
            accountId={accountId}
            isVideo={isVideo}
          />
        </div>
        <div className={clsx(classes.uploader, uploaderClassName)}>
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
  container: {
    display: 'flex',
    flexDirection: 'column',
    color: theme.palette.text.background
  },
  uploader: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center'
  },
  title: { fontWeight: 'bold', marginBottom: theme.spacing(3) }
}))
