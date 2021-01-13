import React from 'react'
import { IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import profileIcon from '../../../assets/userAvatar.png'
import notificationIcon from '../../../assets/notificationIcon.png'

type Props = {
  isNotificationIcon?: boolean
  profilePictureIcon?: any
  headerTitle?: string
}

function Toolbar(props: Props) {
  const classes = useStyles()
  return (
    <div className={classes.Toolbar}>
      <div style={{ marginLeft: 25 }}>
        <h2 style={{ color: 'white', fontWeight: 'normal' }}>
          {props.headerTitle ? props.headerTitle : 'Dashboard'}
        </h2>
      </div>
      <div>
        {!props.isNotificationIcon ? (
          <IconButton style={{ borderRadius: 100, width: 10, marginRight: 20 }}>
            <img src={notificationIcon} alt='notification icon' />
          </IconButton>
        ) : null}
        <IconButton style={{ borderRadius: 100, width: 60, marginRight: 20 }}>
          <img
            src={
              props.profilePictureIcon ? props.profilePictureIcon : profileIcon
            }
            style={{ borderRadius: 100 }}
          />
        </IconButton>
      </div>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  Toolbar: {
    height: theme.spacing(8),
    width: '100%',
    background: '#333333',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box'
  }
}))

export default Toolbar
