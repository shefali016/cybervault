import React, { createContext, useState, useMemo, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { addAsset, handleMediaUpload } from 'apis/assets'
import { Typography } from '@material-ui/core'
import ArrowDown from '@material-ui/icons/KeyboardArrowDown'
import ArrowUp from '@material-ui/icons/KeyboardArrowUp'
import CloseIcon from '@material-ui/icons/Close'
import { AppIconButton } from 'components/Common/Core/AppIconButton'
import { connect } from 'react-redux'
import { ReduxState } from 'reducers/rootReducer'
import { Account, Asset, AssetUpload, UploadCache } from 'utils/Interface'
import { generateUid } from 'utils'
import { getImageObject } from 'utils/helpers'
import { ToastContext } from './Toast'
import { UploadStatuses } from 'utils/enums'
import { AssetUploadItem } from 'components/Assets/AssetUploadItem'
import clsx from 'clsx'
import { AWSError, S3 } from 'aws-sdk'

const AWS = require('aws-sdk')

export const AssetUploadContext = createContext({
  uploadFiles: (
    files: File[],
    type: 'video' | 'image',
    callback: (asset: Asset) => void
  ) => {}
})

type StateProps = { account: Account | null }

type DispatchProps = {}

type Props = {
  children: React.ReactElement
} & StateProps &
  DispatchProps

export const AssetUploadProvider = ({ children, account }: Props) => {
  const toastContext = useContext(ToastContext)

  const classes = useStyles()

  const [uploads, setUploads] = useState<UploadCache>({})
  const [windowOpen, setWindowOpen] = useState(false)

  const uploadFiles = (
    files: File[],
    type: 'video' | 'image',
    assetUploadedCallback: (asset: Asset) => void
  ) => {
    files.map((file: File) =>
      handleAssetUpload(file, type, assetUploadedCallback)
    )
  }

  const updateUploadField = (assetId: string, key: string, value: any) => {
    setUploads((uploadCache: UploadCache) => {
      const assetUpload: AssetUpload = uploadCache[assetId]
      if (!assetUpload) {
        return uploadCache
      }
      return { ...uploadFiles, [assetId]: { ...assetUpload, [key]: value } }
    })
  }

  const handleAssetUpload = async (
    file: File,
    type: 'video' | 'image',
    assetUploadedCallback: (asset: Asset) => void
  ) => {
    const asset: Asset = {
      type,
      files: [],
      fileName: file.name,
      id: generateUid()
    }

    try {
      if (!account) {
        throw Error('Not logged in')
      }

      const task: S3.ManagedUpload = handleMediaUpload(asset.id, file)

      setUploads((uploadCache: UploadCache) => ({
        ...uploadCache,
        [asset.id]: {
          asset,
          task,
          progress: 0,
          status: UploadStatuses.UPLOADING
        }
      }))
      setWindowOpen(true)

      task.on('httpUploadProgress', (Progress: S3.ManagedUpload.Progress) => {
        const { loaded, total } = Progress
        const progress = (loaded / total) * 100
        console.log('Upload is ' + progress + '% done')
        updateUploadField(asset.id, 'progress', progress)
      })

      task.send(async (err: AWSError, data: S3.ManagedUpload.SendData) => {
        if (!err) {
          const url = data.Location
          asset.files.push(getImageObject(file, url, asset.id))
          await addAsset(account.id, asset)
          updateUploadField(asset.id, 'status', UploadStatuses.COMPLETE)
          typeof assetUploadedCallback === 'function' &&
            assetUploadedCallback(asset)
        } else {
          console.log(err)
          updateUploadField(asset.id, 'status', UploadStatuses.FAILED)
        }
      })
    } catch (error) {
      console.log('Asset upload failed.', error)
      toastContext.showToast({
        title: `Failed to upload ${type === 'image' ? 'Image' : 'Video'}`
      })
    }
  }

  const handleTaskDelete = (assetUpload: AssetUpload) => {
    setUploads((uploadCache: UploadCache) => {
      const { [assetUpload.asset.id]: _, ...newCache } = uploadCache
      return newCache
    })
  }

  const handleClose = () => {
    setUploads({})
  }

  const handleToggleWindow = () => {
    setWindowOpen((open) => !open)
  }

  const headerTitle = useMemo(() => {
    return 'Title'
  }, [uploads])

  const uploadArray = useMemo(() => Object.values(uploads), [uploads])

  const hasUploads = !!uploadArray.length

  return (
    <AssetUploadContext.Provider value={{ uploadFiles }}>
      {children}
      <div className={classes.container}>
        <div
          className={clsx(
            classes.uploadWindowContainer,
            !hasUploads ? classes.windowDismissed : ''
          )}
          style={{ pointerEvents: hasUploads ? 'auto' : 'none' }}>
          <div className={classes.uploadWindowHeader}>
            <Typography variant={'body1'} className={classes.headerTitle}>
              {headerTitle}
            </Typography>
            <AppIconButton
              Icon={windowOpen ? ArrowDown : ArrowUp}
              onClick={handleToggleWindow}
              style={{ marginRight: 10 }}
            />
            <AppIconButton Icon={CloseIcon} onClick={handleClose} />
          </div>
          {windowOpen && (
            <div
              className={clsx(
                classes.uploadWindowBody,
                !hasUploads ? classes.windowBodyDismissed : ''
              )}>
              {uploadArray.map((upload: AssetUpload, index: number) => (
                <AssetUploadItem
                  key={upload.asset.id}
                  upload={upload}
                  lastItem={index !== uploadArray.length - 1}
                  onDelete={handleTaskDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </AssetUploadContext.Provider>
  )
}

const mapState = (state: ReduxState): StateProps => ({
  account: state.auth.account
})

const mapDispatch = (dispatch: any): DispatchProps => ({})

export default connect(mapState, mapDispatch)(AssetUploadProvider)

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    pointerEvents: 'none',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  uploadWindowContainer: {
    position: 'fixed',
    bottom: theme.spacing(3),
    right: theme.spacing(3),
    width: 450,
    borderRadius: 10,
    overflow: 'hidden',
    boxShadow: '0 0 15px 4px #00000040',
    zIndex: 2000,
    [theme.breakpoints.down('sm')]: {
      width: '90%'
    },
    transition: theme.transitions.create(['opacity'], { duration: 500 })
  },
  windowDismissed: { opacity: 0 },
  uploadWindowHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: `${theme.spacing(1)}px ${theme.spacing(3)}px`,
    background: theme.palette.background.surfaceHighlight,
    color: theme.palette.text.background
  },
  uploadWindowBody: {
    transition: theme.transitions.create(['height', 'opacity'])
  },
  windowBodyDismissed: { height: 0, opacity: 0 },

  headerTitle: { flex: 1 }
}))
