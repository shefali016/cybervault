import ClearIcon from '@material-ui/icons/Clear'
import { IconButton } from '@material-ui/core'
import React from 'react'

type Props = {
  onClick: () => void
  style?: {}
  isLarge?: boolean
}

const CloseButton = ({ onClick, style, isLarge }: Props) => {
  return (
    <IconButton aria-label='delete' onClick={onClick} style={style}>
      <ClearIcon fontSize={isLarge ? 'large' : 'small'} />
    </IconButton>
  )
}

export default CloseButton
