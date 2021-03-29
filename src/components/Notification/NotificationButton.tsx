import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import NotificationIcon from '@material-ui/icons/Notifications'
import { makeStyles } from '@material-ui/core/styles'
import { ReduxState } from 'reducers/rootReducer'
import { AppIconButton } from 'components/Common/Core/AppIconButton'
import { Typography } from '@material-ui/core'

type Props = {
  style?: {}
  onClick: () => void
}

export const NotificationButton = ({ style, onClick }: Props) => {
  const classes = useStyles()
  const notifications = useSelector(
    (state: ReduxState) => state.notification.data
  )

  return (
    <div className={classes.buttonContainer} style={style}>
      <AppIconButton Icon={NotificationIcon} onClick={onClick} />
      {notifications.length > 0 && (
        <div className={classes.countBubble}>
          <Typography variant='body1' className={classes.count}>
            {notifications.length}
          </Typography>
        </div>
      )}
    </div>
  )
}

const countSize = 18

const useStyles = makeStyles((theme) => ({
  buttonContainer: { position: 'relative' },
  countBubble: {
    height: countSize,
    width: countSize,
    borderRadius: countSize / 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CC0400',
    position: 'absolute',
    right: 4,
    top: 9,
    pointerEvents: 'none'
  },
  count: { color: '#fff', fontSize: 12 }
}))
