import React from 'react'
import EditIcon from '@material-ui/icons/Edit'
import { IconButton } from '@material-ui/core'
import { AppIconButton } from '../Core/AppIconButton'

type Props = {
  onClick?: () => void
  className?: string
}

export const EditButton = ({ onClick, className }: Props) => {
  return (
    <AppIconButton
      Icon={EditIcon}
      onClick={onClick}
      className={'iconButton'}
      iconClassName={'backgroundIcon'}
    />
  )
}
