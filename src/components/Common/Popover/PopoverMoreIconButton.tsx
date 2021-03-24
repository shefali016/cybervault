import React from 'react'
import { PopoverButton } from './PopoverButton'
import { useTheme } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { Props as PopoverButtonProps } from './PopoverButton'

export const PopoverMoreIconButton = (
  props: Omit<PopoverButtonProps, 'children'>
) => {
  const theme = useTheme()

  return (
    <PopoverButton {...props}>
      {({ onClick, id }) => (
        <IconButton aria-owns={id} onClick={onClick} className={'iconButton'}>
          <MoreVertIcon
            style={{ color: theme.palette.grey[100] }}
            fontSize='small'
          />
        </IconButton>
      )}
    </PopoverButton>
  )
}
