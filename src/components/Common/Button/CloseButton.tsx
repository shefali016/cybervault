import ClearIcon from '@material-ui/icons/Clear'
import { IconButton } from '@material-ui/core'
import React from 'react'

type Props = {
  onClick: () => void
  style?: {}
  isLarge?: boolean
  className?: string
}

const CloseButton = ({ onClick, style, isLarge, className }: Props) => {
  return (
    <IconButton
      aria-label='delete'
      onClick={onClick}
      style={style}
      className={className}>
      <ClearIcon fontSize={isLarge ? 'large' : 'small'} />
    </IconButton>
  )
}

export default CloseButton
