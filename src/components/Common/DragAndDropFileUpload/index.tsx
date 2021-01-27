import React, { Fragment, useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Typography } from '@material-ui/core'
import { useStyles } from './style'
import iconFolderUpload from '../../../assets/iconFolderUpload.png'
import ReactLoading from 'react-loading'

export const DragAndDropUploader = (props?: any) => {
  const classes = useStyles()
  const [image, setImageSource] = useState([])

  // receives array of files that are done uploading when submit button is clicked
  const onDrop = useCallback((acceptedFiles) => {
    setImageSource(acceptedFiles)
    props.onSubmit(acceptedFiles[0])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: props.isVideo ? 'video/*' : 'image/jpeg, image/png'
  })

  return (
    <div {...getRootProps({ className: classes.dropzone })}>
      <input {...getInputProps()} />
      {props.isLoading && (
        <div className={classes.loaderWrapper}>
          <ReactLoading
            type={'bubbles'}
            color={'#fff'}
            className={classes.loader}
          />
        </div>
      )}
      {props.isLoading && props.isVideo && (
        <div className={classes.loaderWrapper}>
          <ReactLoading
            type={'bubbles'}
            color={'#fff'}
            className={classes.loader}
          />
        </div>
      )}
      <div className={classes.topContainer}>
        {image && image.length
          ? image.map((file: any, index: number) => {
              // props.onSubmit(file)
              return (
                <Fragment key={index}>
                  <img
                    src={URL.createObjectURL(file)}
                    alt='icon'
                    className={classes.addedImage}
                  />
                </Fragment>
              )
            })
          : null}
      </div>
      <div className={classes.container}>
        {image && !image.length ? (
          <img src={iconFolderUpload} alt='icon' className={classes.image} />
        ) : null}
        <Typography className={classes.text}> Drag {`&`} Drop Media</Typography>
        <Typography className={classes.bottomText}>
          {!props.isVideo ? '.jpg or .png' : '.mp4 or .mov'}
        </Typography>
      </div>
    </div>
  )
}
