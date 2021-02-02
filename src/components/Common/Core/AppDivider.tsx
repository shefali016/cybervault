import React from 'react'
import { Divider } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import clsx from 'clsx'

type Props = {
  className?: string
  spacing?: number
}

export const AppDivider = ({ className, spacing = 3 }: Props) => {
  const classes = useStyles()
  const theme = useTheme()
  return (
    <Divider
      className={clsx(classes.divider, className)}
      style={{
        marginTop: theme.spacing(spacing),
        marginBottom: theme.spacing(spacing)
      }}
    />
  )
}

const useStyles = makeStyles((theme) => ({
  divider: {
    backgroundColor: theme.palette.background.surfaceHighlight
  }
}))
