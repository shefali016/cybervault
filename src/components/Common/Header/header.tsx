import React from 'react'
import { IconButton, Typography } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import defaultProfileIcon from '../../../assets/default_user.png'
import { FLEX } from 'utils/constants/stringConstants'
import NotificationIcon from '@material-ui/icons/Notifications'
import { User } from 'utils/Interface'
import PolymerSharpIcon from '@material-ui/icons/PolymerSharp'
import { AccountTabIds } from 'routes/DashboardSwitch'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import withWidth, { isWidthDown } from '@material-ui/core/withWidth'
import LightDarkThemeButton from 'components/Common/Button/LightDarkThemeButton'
import { AppIconButton } from '../Core/AppIconButton'

type Props = {
  isNotificationIcon?: boolean
  profilePictureIcon?: any
  headerTitle?: string
  onProfileClick?: () => void
  isEditInfoScreen?: boolean
  projectName?: string
  user?: User | undefined | null
  onEditProject?: boolean
  renderAppIcon?: boolean
  onLogoClick?: () => void
  renderHeaderContent?: () => React.ReactElement
  history?: any
  width: any
  hideBackArrow?: boolean
}

function Toolbar(props: Props) {
  const classes = useStyles()
  const theme = useTheme()

  const isMobile = isWidthDown('xs', props.width)

  const handleProfileClick = () => {
    if (props.onProfileClick) {
      return props.onProfileClick()
    }

    if (props.history) {
      props.history.replace(`/${AccountTabIds.profile}`)
    }
  }

  return (
    <div className={classes.Toolbar}>
      {props.renderAppIcon && (
        <div className={classes.backIconContainer} onClick={props.onLogoClick}>
          {!props.hideBackArrow && <ArrowBackIosIcon className={'backIcon'} />}
          <PolymerSharpIcon
            className={classes.appIcon}
            style={{ marginLeft: props.hideBackArrow ? 10 : 0 }}
          />
        </div>
      )}

      <div
        style={{
          marginLeft:
            isMobile && !props.renderAppIcon ? theme.spacing(8) + 10 : 25,
          display: FLEX,
          flex: 1
        }}>
        <Typography variant='h6' className={classes.title}>
          {props.headerTitle}
        </Typography>

        {typeof props.renderHeaderContent === 'function' &&
          props.renderHeaderContent()}
      </div>

      {props.user && (
        <div className='row'>
          <LightDarkThemeButton style={{ marginRight: 10 }} />
          {!props.isNotificationIcon ? (
            <AppIconButton
              Icon={NotificationIcon}
              style={{ marginRight: 18 }}
            />
          ) : null}

          <div onClick={handleProfileClick} style={{ cursor: 'pointer' }}>
            <img
              src={props.user.avatar ? props.user.avatar : defaultProfileIcon}
              style={{
                borderRadius: 20,
                height: 33,
                width: 33,
                marginRight: 22,
                cursor: 'pointer'
              }}
              alt={'profile-img'}
            />
          </div>
        </div>
      )}
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  title: {
    color: 'white',
    fontWeight: 'normal',
    [theme.breakpoints.down('sm')]: {
      fontSize: 18
    }
  },
  backIconContainer: {
    display: 'flex',
    cursor: 'pointer',
    alignItems: 'center'
  },
  notificationIcon: { color: theme.palette.common.white, fontSize: 26 },
  Toolbar: {
    alignSelf: 'stetch',
    height: theme.spacing(7),
    background: theme.palette.background.secondary,
    display: 'flex',
    minWidth: '100%',
    alignItems: 'center',
    boxSizing: 'border-box',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: theme.palette.background.surface
  },
  appIcon: {
    color: theme.palette.primary.light,
    fontSize: 43,
    cursor: 'pointer'
  },
  portfolioHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 15px',
    height: theme.spacing(7),
    background: theme.palette.background.secondary,
    boxSizing: 'border-box',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: theme.palette.background.default
  }
}))

export default withWidth()(Toolbar)
