import React from 'react'
import { Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

type Props = {
  className?: string
}

export const AppDivider = ({ className }: Props) => {
  const classes = useStyles()
  return <Divider className={clsx(classes.divider, className)} />
}

const useStyles = makeStyles((theme) => ({
  divider: {
    backgroundColor: theme.palette.grey[300]
  }
}))
