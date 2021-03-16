import React from 'react'
import { Divider } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import clsx from 'clsx'

type Props = {
  className?: string
  spacing?: number
}

export const AppDivider = ({ className, spacing = 5 }: Props) => {
  const classes = useStyles(spacing)
  const theme = useTheme()
  return <Divider className={clsx(classes.divider, className)} />
}

const useStyles = (spacing: number) => {
  return makeStyles((theme) => ({
    divider: {
      marginTop: theme.spacing(spacing),
      marginBottom: theme.spacing(spacing),
      backgroundColor: theme.palette.background.surfaceHighlight
    }
  }))()
}
