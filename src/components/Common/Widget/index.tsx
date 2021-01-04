import { Typography } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { COLUMN } from '../../../utils/constants/stringConstants'

type Props = {
  title: string
  data: Array<any>
  renderItem: (item: any) => React.ReactElement
  emptyMessage: string
  tabletColumn?: boolean
}

const Widget = ({
  title,
  data,
  renderItem,
  emptyMessage,
  tabletColumn
}: Props) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Typography
        variant={'body1'}
        className={classes.title}
        color={'textPrimary'}>
        {title}
      </Typography>
      <div
        className={clsx(
          classes.wrapper,
          tabletColumn ? classes.tabletColumn : undefined
        )}>
        {data && data.length > 0 ? (
          data.map(renderItem)
        ) : (
          <Typography>{emptyMessage}</Typography>
        )}
      </div>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: { marginBottom: theme.spacing(4) },
  wrapper: {
    display: 'flex'
  },
  tabletColumn: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: COLUMN,
      alignItems: 'flex-start'
    }
  },
  title: {
    marginBottom: theme.spacing(1)
  }
}))

export default Widget
