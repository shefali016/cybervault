import React, { Fragment, useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Typography } from '@material-ui/core'
import { useStyles } from './style'
import iconFolderUpload from '../../../assets/iconFolderUpload.png'
import ReactLoading from 'react-loading'

type Props = {
  isVideo?: boolean
  isLoading: boolean
  onSubmit: (file: File) => void
}

export const DragAndDropUploader = ({ isVideo, isLoading, onSubmit }: any) => {
  const classes = useStyles()
  const [file, setFile] = useState<File | null>(null)

  // receives array of files that are done uploading when submit button is clicked
  const onDrop = useCallback((files) => {
    setFile(files)
    onSubmit(files[0])
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: isVideo ? 'video/*' : 'image/*'
  })

  return (
    <div {...getRootProps({ className: classes.dropzone })}>
      <input {...getInputProps()} />
      {isLoading && (
        <div className={classes.loaderWrapper}>
          <ReactLoading
            type={'bubbles'}
            color={'#fff'}
            className={classes.loader}
          />
        </div>
      )}
      <div className={classes.container}>
        {!(file && file.name) ? (
          <img src={iconFolderUpload} alt='icon' className={classes.image} />
        ) : (
          <Typography>{file.name}</Typography>
        )}
        <Typography className={classes.text}>
          Add {isVideo ? 'Video' : 'Image'}
        </Typography>
        <Typography className={classes.bottomText}>
          {!isVideo ? '.jpg or .png' : '.mp4 or .mov'}
        </Typography>
      </div>
    </div>
  )
}
