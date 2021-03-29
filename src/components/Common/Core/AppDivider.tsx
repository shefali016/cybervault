import React from 'react'
import { Divider } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import clsx from 'clsx'

type Props = {
  className?: string
  spacing?: number
  style?: {}
}

export const AppDivider = ({ className, spacing = 5, style }: Props) => {
  const classes = useStyles(spacing)
  return <Divider className={clsx(classes.divider, className)} style={style} />
}

const useStyles = (spacing: number) => {
  return makeStyles((theme) => ({
    divider: {
      marginTop: theme.spacing(spacing),
      marginBottom: theme.spacing(spacing),
      backgroundColor: theme.palette.background.surfaceHighlight,
      [theme.breakpoints.down('sm')]: {
        marginTop: theme.spacing(spacing * 0.75),
        marginBottom: theme.spacing(spacing * 0.75)
      }
    }
  }))()
}
