import React from 'react'
import { Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { CloudNotification } from 'utils/Interface'
import { useStyles } from './style'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import { AppIconButton } from 'components/Common/Core/AppIconButton'
import { ReduxState } from 'reducers/rootReducer'

type Props = {
  notification: CloudNotification
  onMarkRead: (notification: CloudNotification) => void
}

export const NotificationItem = ({ notification, onMarkRead }: Props) => {
  const classes = useStyles()
  const isLoading = useSelector(
    (state: ReduxState) => state.notification.readLoading === notification.id
  )
  return (
    <div className={classes.listItem}>
      <Typography variant='subtitle1' className={classes.listTitle}>
        {notification.title}
      </Typography>
      <AppIconButton
        Icon={VisibilityOffIcon}
        onClick={() => onMarkRead(notification)}
        isLoading={isLoading}
      />
    </div>
  )
}
