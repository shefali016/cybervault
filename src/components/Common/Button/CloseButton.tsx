import ClearIcon from '@material-ui/icons/Clear'
import { IconButton } from '@material-ui/core'
import React from 'react'

type Props = {
  onClick: () => void
  style?: {}
}

const CloseButton = ({ onClick, style }: Props) => {
  return (
    <IconButton aria-label='delete' onClick={onClick} style={style}>
      <ClearIcon fontSize='small' />
    </IconButton>
  )
}

export default CloseButton
