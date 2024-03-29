import { Typography } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { COLUMN } from '../../../utils/constants/stringConstants'
import ReactLoading from 'react-loading'
import { useTheme } from '@material-ui/core/styles'

type Props = {
  title?: string
  data: Array<any>
  renderItem: (item: any) => React.ReactElement
  emptyMessage?: string
  tabletColumn?: boolean
  loading?: boolean
  itemHeight?: number
  EmptyComponent?: any
  style?: {}
}

const Widget = ({
  title,
  data,
  renderItem,
  emptyMessage,
  tabletColumn,
  loading,
  itemHeight,
  EmptyComponent,
  style
}: Props) => {
  const classes = useStyles()
  const theme = useTheme()

  const renderEmpty = () => {
    if (EmptyComponent) {
      return EmptyComponent === 'function' ? <EmptyComponent /> : EmptyComponent
    } else if (emptyMessage) {
      return (
        <Typography variant={'h6'} style={{ color: '#888888' }}>
          {emptyMessage}
        </Typography>
      )
    }
    return null
  }

  return (
    <div className={clsx(classes.root)}>
      {!!title && (
        <Typography
          variant={'h6'}
          className={clsx(classes.title, 'responsiveHorizontalPadding')}>
          {title}
        </Typography>
      )}
      <div
        style={{ height: itemHeight, ...style }}
        className={clsx(
          classes.wrapper,
          tabletColumn ? classes.tabletColumn : undefined,
          'responsiveHorizontalPadding'
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
          renderEmpty()
        )}
      </div>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(6)
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'nowrap',
    overflowX: 'scroll',
    whiteSpace: 'nowrap',
    paddingTop: 15,
    paddingBottom: 15
  },
  tabletColumn: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: COLUMN,
      alignItems: 'flex-start'
    }
  },
  title: {
    color: theme.palette.text.background
  },
  loader: { marginLeft: theme.spacing(2) }
}))

export default Widget
