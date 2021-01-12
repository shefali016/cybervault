import { Typography } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { COLUMN, FLEX } from '../../../utils/constants/stringConstants'
import ReactLoading from 'react-loading'
import { useTheme } from '@material-ui/core/styles'

type Props = {
  title: string
  data: Array<any>
  renderItem: (item: any) => React.ReactElement
  emptyMessage: string
  tabletColumn?: boolean
  loading?: boolean
  itemHeight?: number
}

const Widget = ({
  title,
  data,
  renderItem,
  emptyMessage,
  tabletColumn,
  loading,
  itemHeight
}: Props) => {
  const classes = useStyles()
  const theme = useTheme()
  return (
    <div className={clsx(classes.root)}>
      <Typography
        variant={'body1'}
        className={classes.title}
        color={'textPrimary'}>
        {title}
      </Typography>
      <div
        style={itemHeight ? { minHeight: itemHeight } : {}}
        className={clsx(
          classes.wrapper,
          tabletColumn ? classes.tabletColumn : undefined
        )}>
        {data && data.length > 0 ? (
          data.map(renderItem)
        ) : loading ? (
          <div className={classes.loader}>
            <ReactLoading
              type={'bubbles'}
              color={theme.palette.primary.main}
              height={100}
              width={100}
            />
          </div>
        ) : (
          <Typography variant={'h6'} style={{ color: '#888888' }}>
            {emptyMessage}
          </Typography>
        )}
      </div>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(4)
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'nowrap',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    paddingLeft: theme.spacing(4)
  },
  tabletColumn: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: COLUMN,
      alignItems: 'flex-start'
    }
  },
  title: {
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(4)
  },
  loader: {}
}))

export default Widget
