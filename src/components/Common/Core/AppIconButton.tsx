import React from 'react'
import { IconButton } from '@material-ui/core'
import clsx from 'clsx'

type Props = {
  Icon: any
  onClick?: (e: any) => void
  className?: string
  iconClassName?: string
  style?: {}
}

export const AppIconButton = ({
  Icon,
  onClick,
  className,
  iconClassName,
  style
}: Props) => {
  return (
    <IconButton onClick={onClick} className={className} style={style}>
      <Icon
        className={iconClassName ? iconClassName : 'metaIcon'}
        fontSize='inherit'
      />
    </IconButton>
  )
}
