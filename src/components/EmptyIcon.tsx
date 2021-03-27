import { SvgIconTypeMap, Typography } from '@material-ui/core'
import { OverridableComponent } from '@material-ui/core/OverridableComponent'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import React from 'react'

interface Props {
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>
  title?: string
  className?: string
}

export const EmptyIcon = ({ Icon, title, className }: Props) => {
  const classes = useStyles()
  return (
    <div className={clsx(classes.container, className)}>
      <Icon className={classes.icon} />
      {!!title && <Typography className={classes.title}>{title}</Typography>}
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: { flexDirection: 'column' },
    color: theme.palette.text.meta,
    padding: theme.spacing(5)
  },
  icon: { marginRight: theme.spacing(1), fontSize: 40 },
  title: { fontSize: 20, textAlign: 'center' }
}))
