import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { DragAndDropUploader } from 'components/Common/DragAndDropFileUpload'
import { FeatureAssetList } from '../Common/Carousel/FeatureAssetList'

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
  onFeatureSelect?: (id: string) => void
  featuredAsset?: string
}

export const FeatureAssetUpload = (props: AssetUploadDisplayProps) => {
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
    isVideo,
    onFeatureSelect,
    featuredAsset
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
      <div className={classes.wrapper}>
        <div className={clsx(classes.carousel, carouselClassName)}>
          <FeatureAssetList
            assetIds={assetIds}
            accountId={accountId}
            isVideo={isVideo}
            onFeatureSelect={onFeatureSelect}
            featuredAsset={featuredAsset}
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
    flex: 1,
    color: theme.palette.text.background
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column'
    }
  },
  carousel: {
    display: 'flex',
    flex: 1,
    alignSelf: 'stretch'
  },
  uploader: {
    flexShrink: 1,
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(3),
    paddingLeft: theme.spacing(6),
    [theme.breakpoints.down('md')]: {
      paddingLeft: 0,
      padding: 0,
      paddingTop: theme.spacing(3)
    }
  },
  title: { fontWeight: 'bold', marginBottom: theme.spacing(3) }
}))
