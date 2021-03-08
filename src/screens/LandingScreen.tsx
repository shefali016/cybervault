import { IconButton, makeStyles, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import headerImage from '../assets/landing_screen_header_1.png'
import { AppIcon } from 'components/Common/Core/AppIcon'
import { AppButton } from 'components/Common/Core/AppButton'
import AppTextField from 'components/Common/Core/AppTextField'
import { InputChangeEvent } from 'utils/Interface'
import { GradiantButton } from 'components/Common/Button/GradiantButton'
import MenuIcon from '@material-ui/icons/Menu'
import clsx from 'clsx'

const LandingScreen = (props: any) => {
  const classes = useStyles()
  const [state, setState] = useState({ email: '' })

  const [navOpen, setNavOpen] = useState(false)

  const renderNavItem = (title: string, hide?: boolean) => {
    return (
      <AppButton
        className={clsx(classes.navItem, hide ? classes.navItemInactive : '')}>
        <Typography className={classes.navItemTitle}>{title}</Typography>
      </AppButton>
    )
  }

  const renderNav = () => {
    return (
      <div className={classes.navContainer}>
        <div className={clsx(classes.nav, navOpen ? classes.navOpen : '')}>
          <AppIcon className={classes.appIcon} />
          <div className={classes.navItemContainer}>
            {[
              'Features',
              'Pricing',
              'Customers',
              'News'
            ].map((navItem: string) => renderNavItem(navItem))}
          </div>
          <div className={classes.navLoginContainer}>
            <AppButton className={classes.loginButton}>
              <Typography className={classes.loginTitle}>Log in</Typography>
            </AppButton>
          </div>
          <IconButton
            className={classes.navToggle}
            onClick={() => setNavOpen(!navOpen)}>
            <MenuIcon className={classes.navToggleIcon} />
          </IconButton>
        </div>
        <div
          className={clsx(
            classes.navCollapsed,
            navOpen ? classes.navCollapsedOpen : classes.navCollapsedClosed
          )}>
          {['Features', 'Pricing', 'Customers', 'News'].map((navItem: string) =>
            renderNavItem(navItem, !navOpen)
          )}

          <AppButton
            className={clsx(
              classes.loginButton,
              !navOpen ? classes.navItemInactive : ''
            )}>
            <Typography className={classes.loginTitle}>Log in</Typography>
          </AppButton>
        </div>
      </div>
    )
  }

  const renderSignUpInput = () => {
    return (
      <div className={classes.signUpInputContainer}>
        <AppTextField
          onChange={(e: InputChangeEvent) =>
            setState((state) => ({ ...state, email: e.target.value }))
          }
          value={state.email}
          label='Enter your email'
          className={classes.signUpInput}
          style={{ maxWidth: 400 }}
          labelClassName={classes.signUpInputLabel}
          labelFocusedClassName={classes.signUpInputLabelFocused}
        />
        <div className={classes.signUpButtonContainer}>
          <GradiantButton className={classes.signUpButton}>
            <Typography>Sign up free</Typography>
          </GradiantButton>
          <Typography variant='caption' className={classes.signUpButtonCaption}>
            7-day free trial. Cancel anytime.
          </Typography>
        </div>
      </div>
    )
  }

  return (
    <div className={classes.container}>
      <img src={headerImage} className={classes.headerImage} />

      <div className={classes.header}>
        {renderNav()}
        <div className={classes.headerContent}>
          <Typography className={classes.headerTitle} variant='h2'>
            So you can do what you do best,
          </Typography>
          <Typography className={classes.headerTitle} variant='h2'>
            creating content.
          </Typography>
          <Typography className={classes.headerSubTitle} variant='h5'>
            Virtually upload, and invoice clients in the most secure way.
          </Typography>
          {renderSignUpInput()}
        </div>

        <div></div>
      </div>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.default,
    width: '100vw',
    height: '100vh',
    overflowY: 'scroll',
    position: 'relative'
  },

  navContainer: { position: 'fixed', width: '100%' },
  nav: {
    top: 0,
    display: 'flex',
    padding: theme.spacing(3),
    zIndex: 100,
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: theme.transitions.create(['background'], {
      duration: 500
    })
  },
  navOpen: { background: theme.palette.background.secondary },
  navItemContainer: {
    display: 'flex',
    justifyContent: 'center',
    flex: 1,
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  navItem: {
    color: theme.palette.common.white,
    width: 150,
    opacity: 1,
    [theme.breakpoints.down('md')]: {
      width: '90%',
      paddingTop: 15,
      paddingBottom: 15
    },
    transition: theme.transitions.create(['opacity'], {
      duration: 500
    })
  },
  navItemInactive: { opacity: 0 },
  navItemTitle: { fontSize: 20 },
  navLoginContainer: {
    width: 200,
    color: theme.palette.common.white,
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },

  navToggle: {
    display: 'none',
    [theme.breakpoints.down('md')]: {
      display: 'block'
    }
  },
  navToggleIcon: { fontSize: 40, color: theme.palette.common.white },
  navCollapsed: {
    paddingBottom: theme.spacing(3),
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: theme.transitions.create(['background', 'height', 'opacity'], {
      duration: 500
    })
  },
  navCollapsedOpen: {
    background: theme.palette.background.secondary
  },
  navCollapsedClosed: {
    pointerEvents: 'none'
  },

  loginButton: {
    color: theme.palette.common.white,
    width: 150,
    [theme.breakpoints.down('md')]: {
      width: '90%',
      paddingTop: 15,
      paddingBottom: 15,
      color: theme.palette.primary.light
    },
    transition: theme.transitions.create(['opacity'], {
      duration: 500
    })
  },
  loginTitle: { fontSize: 20 },

  headerContent: {
    color: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    padding: theme.spacing(10),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3)
    }
  },
  headerTitle: {
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      fontSize: 25
    }
  },
  headerSubTitle: {
    marginTop: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      fontSize: 18
    }
  },

  signUpInputContainer: {
    display: 'flex',
    marginTop: theme.spacing(6),
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  signUpInput: {
    maxWidth: 400,
    marginRight: 30,
    height: 60,
    borderRadius: 30,
    color: theme.palette.common.white,
    [theme.breakpoints.down('sm')]: {
      marginRight: 0
    }
  },
  signUpInputLabel: { marginTop: 10, marginLeft: 10 },
  signUpInputLabelFocused: { marginTop: 0, marginLeft: 0 },
  signUpButtonContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(2)
    }
  },
  signUpButton: { height: 60, borderRadius: 30 },
  signUpButtonCaption: { position: 'absolute', bottom: -25 },

  appIcon: {
    color: theme.palette.common.white,
    fontSize: 50
  },
  header: {
    width: '100vw',
    height: '100vh',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column'
  },
  headerImage: {
    top: 0,
    width: '100vw',
    height: '100vh',
    objectFit: 'cover',
    position: 'absolute'
  }
}))

export default LandingScreen
