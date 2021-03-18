import { AssetUpload } from 'utils/Interface'
import React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import { AppIconButton } from 'components/Common/Core/AppIconButton'
import clsx from 'clsx'

type Props = {
  upload: AssetUpload
  lastItem: boolean
  onDelete: (upload: AssetUpload) => void
}

export const AssetUploadItem = ({ upload, lastItem, onDelete }: Props) => {
  const classes = useStyles()
  const theme = useTheme()

  if (!upload) {
    return null
  }

  const { asset, progress = 0, status, task } = upload

  const renderProgress = () => {
    const height = 10

    return (
      <div
        style={{
          marginTop: theme.spacing(1),
          marginRight: theme.spacing(2),
          width: '95%',
          backgroundColor: '#e6e6e6',
          height,
          alignItems: 'center',
          borderRadius: 5,
          borderWidth: 4,
          borderColor: '#fff',
          overflow: 'hidden',
          boxSizing: 'content-box'
        }}>
        <div
          style={{
            height,
            width: `calc(100% * (${progress} / 100))`,
            backgroundColor: theme.palette.primary.main,
            borderRadius: 5
          }}
        />
      </div>
    )

    return null
  }

  const handleDelete = () => {
    // Cancel task
    task.cancel()
    onDelete(upload)
  }

  return (
    <div
      className={clsx(
        classes.container,
        !lastItem ? classes.borderBottom : ''
      )}>
      <div style={{ flex: 1 }}>
        <Typography variant='subtitle1'>{asset.fileName}</Typography>
        {renderProgress()}
      </div>
      <AppIconButton Icon={CloseIcon} onClick={handleDelete} />
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    padding: `${theme.spacing(2)}px ${theme.spacing(2)}px`,
    background: theme.palette.background.paper,
    display: 'flex',
    alignItems: 'center'
  },
  borderBottom: {
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: theme.palette.grey[400]
  }
}))
