import React from 'react'
import { PopoverButton } from './PopoverButton'
import { useTheme } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { Props as PopoverButtonProps } from './PopoverButton'
import { AppIconButton } from '../Core/AppIconButton'

export const PopoverMoreIconButton = (
  props: Omit<PopoverButtonProps, 'children'> & {
    isLoading?: boolean
    isLoadingDescructive?: boolean
  }
) => {
  return (
    <PopoverButton {...props}>
      {({ onClick, id }) => (
        <AppIconButton
          Icon={MoreVertIcon}
          aria-owns={id}
          onClick={onClick}
          className={'iconButton'}
          isLoading={props.isLoading}
          isLoadingDescructive={props.isLoadingDescructive}
        />
      )}
    </PopoverButton>
  )
}
