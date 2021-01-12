import React from 'react'
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

export const DragAndDropUploader = () => {
  // specify upload params and url for your files
  const getUploadParams = ({ meta }: any) => {
    return { url: 'https://httpbin.org/post' }
  }

  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }: any, status: any) => {
    console.log(status, meta, file)
  }

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files: any, allFiles: any) => {
    console.log(files.map((f: any) => f.meta))
    allFiles.forEach((f: any) => f.remove())
  }
  return (
    <Button>
      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        accept='image/*,video/*'
        inputContent=' '
        styles={{
          dropzone: {
            width: 100,
            height: 60,
            borderWidth: 1,
            paddingBottom: 0,
            paddingRight: 0,
            paddingLeft: 0,
            paddingTop: 0
          },
          dropzoneActive: { padding: 0 }
        }}
      />
    </Button>
  )
}

const useStyles = makeStyles((theme) => ({
  button: {}
}))
