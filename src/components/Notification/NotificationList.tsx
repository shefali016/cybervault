import React, { useRef } from 'react'
import { CloudNotification } from 'utils/Interface'
import { useDispatch, useSelector } from 'react-redux'
import { markNotificationRead } from 'actions/notification'
import { NotificationItem } from './NotificationItem'
import { ReduxState } from 'reducers/rootReducer'
import { useStyles } from './style'
import clsx from 'clsx'
import { useClickedOutside } from 'utils/hooks'
import { Typography } from '@material-ui/core'
import NotificationIcon from '@material-ui/icons/Notifications'

type Props = {
  className?: string
  style?: {}
  onClose: () => void
  open: boolean
}

export const NotificationList = ({
  className,
  style,
  open,
  onClose
}: Props) => {
  const dispatch = useDispatch()
  const notifications = useSelector(
    (state: ReduxState) => state.notification.data
  )

  const classes = useStyles()

  const ref = useRef(null)
  useClickedOutside(ref, open ? onClose : undefined)

  const handleMarkRead = (notification: CloudNotification) =>
    dispatch(markNotificationRead(notification))

  return (
    <div
      ref={ref}
      className={clsx(classes.listContainer, className)}
      style={style}>
      <div className={clsx('borderBottom', classes.listHeader)}>
        <Typography variant='h6'>Notifications</Typography>
      </div>
      {notifications.length > 0 ? (
        notifications.map((notification: CloudNotification) => (
          <NotificationItem
            notification={notification}
            onMarkRead={handleMarkRead}
          />
        ))
      ) : (
        <div className={classes.listEmptyContainer}>
          <NotificationIcon className={classes.listEmptyIcon} />
          <Typography variant='subtitle1' className={classes.listEmptyTitle}>
            No recent notifications
          </Typography>
        </div>
      )}
    </div>
  )
}
