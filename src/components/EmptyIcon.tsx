import { SvgIconTypeMap, Typography } from '@material-ui/core'
import { OverridableComponent } from '@material-ui/core/OverridableComponent'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

interface Props {
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>
  title?: string
}

export const EmptyIcon = ({ Icon, title }: Props) => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
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
