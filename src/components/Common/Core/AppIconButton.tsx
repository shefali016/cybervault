import React, { MouseEventHandler } from 'react'
import { IconButton } from '@material-ui/core'
import { AppLoader } from './AppLoader'
import { useTheme } from '@material-ui/core/styles'

type Props = {
  Icon: any
  onClick?: MouseEventHandler<any>
  className?: string
  iconClassName?: string
  style?: {}
  isLoading?: boolean
  isLoadingDescructive?: boolean
}

export const AppIconButton = ({
  Icon,
  onClick,
  className,
  iconClassName,
  style,
  isLoading,
  isLoadingDescructive
}: Props) => {
  const theme = useTheme()
  return (
    <IconButton onClick={onClick} className={className} style={style}>
      {isLoading || isLoadingDescructive ? (
        <AppLoader
          type={'spinningBubbles'}
          color={
            isLoadingDescructive
              ? theme.palette.error.main
              : theme.palette.primary.main
          }
          width={25}
          height={25}
        />
      ) : (
        <Icon
          className={iconClassName ? iconClassName : 'metaIcon'}
          fontSize='inherit'
        />
      )}
    </IconButton>
  )
}
