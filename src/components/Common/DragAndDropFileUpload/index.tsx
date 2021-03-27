import React, { Fragment, useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Typography } from '@material-ui/core'
import { useStyles } from './style'
import iconFolderUpload from '../../../assets/iconFolderUpload.png'
import ReactLoading from 'react-loading'
import clsx from 'clsx'

type Props = {
  isVideo?: boolean
  isLoading?: boolean
  onSubmit: (files: File[]) => void
}

export const DragAndDropUploader = ({
  isVideo,
  isLoading,
  onSubmit
}: Props) => {
  const classes = useStyles()

  // receives array of files that are done uploading when submit button is clicked
  const onDrop = useCallback(
    (files) => {
      onSubmit(files)
    },
    [onSubmit]
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: isVideo ? 'video/*' : 'image/*'
  })

  return (
    <div {...getRootProps({ className: clsx('dropBox', classes.dropzone) })}>
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
        <img
          src={iconFolderUpload}
          alt='upload-icon'
          className={classes.image}
        />

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
