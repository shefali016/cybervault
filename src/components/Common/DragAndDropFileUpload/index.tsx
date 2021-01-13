import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Typography } from '@material-ui/core'
import { useStyles } from './style'
import iconFolderUpload from '../../../assets/iconFolderUpload.png'

export const DragAndDropUploader = (props?: any) => {
  const classes = useStyles()
  const [image, setImageSource] = useState([])
  const [isImage, setIsImage] = useState(false)

  // receives array of files that are done uploading when submit button is clicked
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles)
    setImageSource(acceptedFiles)
    setIsImage(true)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: props.isVideo ? 'video/*' : 'image/jpeg, image/png'
  })
  return (
    <div {...getRootProps({ className: classes.dropzone })}>
      <input {...getInputProps()} />
      <div className={classes.topContainer}>
        {isImage
          ? image.map((file: any, index: number) => {
              return (
                <img
                  src={URL.createObjectURL(file)}
                  alt='icon'
                  className={classes.addedImage}
                />
              )
            })
          : null}
      </div>
      <div className={classes.container}>
        {!isImage ? (
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
