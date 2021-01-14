import React from 'react'
import { IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import defaultProfileIcon from '../../../assets/default_user.png'
import notificationIcon from '../../../assets/notificationIcon.png'
import { SIDE_DRAWER_WIDTH } from 'utils/constants/stringConstants'
import NotificationIcon from '@material-ui/icons/Notifications'

type Props = {
  isNotificationIcon?: boolean
  profilePictureIcon?: any
  headerTitle?: string
  onProfileClick?: () => void
}

function Toolbar(props: Props) {
  const classes = useStyles()
  return (
    <div className={classes.Toolbar}>
      <div style={{ marginLeft: 25 }}>
        <h2 style={{ color: 'white', fontWeight: 'normal' }}>
          {props.headerTitle}
        </h2>
      </div>
      <div>
        {!props.isNotificationIcon ? (
          <IconButton style={{ borderRadius: 100, width: 10, marginRight: 25 }}>
            <NotificationIcon className={classes.notificationIcon} />
          </IconButton>
        ) : null}
        <IconButton
          style={{ borderRadius: 100, width: 45, marginRight: 22 }}
          onClick={props.onProfileClick}>
          <img
            src={
              props.profilePictureIcon
                ? props.profilePictureIcon
                : defaultProfileIcon
            }
            style={{ borderRadius: 20, height: 33, width: 33 }}
          />
        </IconButton>
      </div>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  notificationIcon: { color: theme.palette.common.white, fontSize: 26 },
  Toolbar: {
    height: theme.spacing(7),
    width: '100%',
    background: theme.palette.background.secondary,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
    minWidth: window.outerWidth - SIDE_DRAWER_WIDTH,
    [theme.breakpoints.down('sm')]: {
      minWidth: window.outerWidth - theme.spacing(8)
    }
  }
}))

export default Toolbar
