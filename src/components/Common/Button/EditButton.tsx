import React from 'react'
import EditIcon from '@material-ui/icons/Edit'
import { IconButton } from '@material-ui/core'
import { AppIconButton } from '../Core/AppIconButton'

type Props = {
  onClick?: () => void
  className?: string
  iconClassName?: string
}

export const EditButton = ({ onClick, className, iconClassName }: Props) => {
  return (
    <AppIconButton
      Icon={EditIcon}
      onClick={onClick}
      className={className ? className : 'iconButton'}
      iconClassName={iconClassName ? iconClassName : 'metaIcon'}
    />
  )
}
