import React from 'react'
import { IconButton } from '@material-ui/core'

type Props = {
  Icon: any
  onClick?: (e: any) => void
  className?: string
  style?: {}
}

export const AppIconButton = ({ Icon, onClick, className, style }: Props) => {
  return (
    <IconButton onClick={onClick} className={className} style={style}>
      <Icon className={'icon'} />
    </IconButton>
  )
}
