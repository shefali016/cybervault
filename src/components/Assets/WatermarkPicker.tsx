import { makeStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import clsx from 'clsx'
import React, { useRef } from 'react'
import { POSITION_ABSOLUTE } from 'utils/constants/stringConstants'

type Props = {
  url: string | undefined
  onChange: (file: File) => void
  size?: number
  className?: string
}

const WatermarkPicker = ({ url, onChange, size = 120, className }: Props) => {
  const inputRef = useRef<any>(null)
  const classes = useStyles()
  const roundStyle = { width: size, height: size }

  return (
    <Button
      variant='contained'
      onClick={() => inputRef.current?.click()}
      className={clsx(classes.button, className)}
      style={roundStyle}>
      <input
        type='file'
        accept='image/*'
        capture='camera'
        name='avatar'
        ref={inputRef}
        onChange={(event: any) => onChange(event.target.files[0])}
        style={{ display: 'none' }}
      />
      {!!url && (
        <img
          src={url}
          className={classes.img}
          alt={'client-logo'}
          style={roundStyle}
        />
      )}
    </Button>
  )
}

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    overflow: 'hidden'
  },
  img: {
    position: POSITION_ABSOLUTE
  }
}))

export default WatermarkPicker
