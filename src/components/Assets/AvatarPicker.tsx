import { makeStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import clsx from 'clsx'
import React, { useRef } from 'react'
import { TRANSPARENT } from 'utils/constants/colorsConstants'
import { POSITION_ABSOLUTE } from 'utils/constants/stringConstants'
import defaultAvatar from '../../assets/default_user.png'

type Props = {
  url: string | undefined
  onChange: (file: File) => void
  size?: number
  className?: string
}

const AvatarPicker = ({ url, onChange, size = 80, className }: Props) => {
  const inputRef = useRef<any>(null)
  const classes = useStyles()
  const roundStyle = { width: size, height: size, borderRadius: size / 2 }

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
      <img
        src={url || defaultAvatar}
        className={classes.img}
        alt={'client-logo'}
        style={roundStyle}
      />
    </Button>
  )
}

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: TRANSPARENT,
    overflow: 'hidden'
  },
  img: {
    position: POSITION_ABSOLUTE
  }
}))

export default AvatarPicker
