import React from 'react'
import EditIcon from '@material-ui/icons/Edit'
import { IconButton } from '@material-ui/core'

type Props = {
  onClick?: () => void
}

export const EditButton = ({ onClick }: Props) => {
  return (
    <IconButton className={'iconButton'} onClick={onClick}>
      <EditIcon className={'editIcon'} fontSize='small' />
    </IconButton>
  )
}
