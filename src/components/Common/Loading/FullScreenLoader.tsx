import React from 'react'
import { useTheme } from '@material-ui/core/styles'
import { AppLoader } from '../Core/AppLoader'

export const FullScreenLoader = () => {
  const theme = useTheme()
  return (
    <div className={'splashScreen'}>
      <AppLoader color={theme.palette.primary.main} />
    </div>
  )
}
