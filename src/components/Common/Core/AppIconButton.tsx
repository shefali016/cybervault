import React from 'react'
import { IconButton } from '@material-ui/core'
import clsx from 'clsx'

type Props = {
  Icon: any
  onClick?: (e: any) => void
  className?: string
  style?: {}
  iconClass?: string
}

export const AppIconButton = ({
  Icon,
  onClick,
  className,
  style,
  iconClass
}: Props) => {
  return (
    <IconButton onClick={onClick} className={className} style={style}>
      <Icon className={clsx('icon', iconClass)} />
    </IconButton>
  )
}
