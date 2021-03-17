import React, { useState, useRef, useEffect } from 'react'
import { useStyles } from 'screens/LandingScreens/style'
import { useTheme } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import { AppIcon } from 'components/Common/Core/AppIcon'
import clsx from 'clsx'
import { IconButton, Typography } from '@material-ui/core'
import { AppButton } from 'components/Common/Core/AppButton'
import { GradiantButton } from 'components/Common/Button/GradiantButton'
import withWidth, { isWidthDown } from '@material-ui/core/withWidth'
import { useOnChange } from 'utils/hooks'

type Props = {
  history: any
  goToSignUp: () => void
  onLogout: () => void
  isLoggedIn: boolean
  width: any
}

const NavBar = ({
  history,
  goToSignUp,
  onLogout,
  isLoggedIn,
  width
}: Props) => {
  const classes = useStyles()
  const theme = useTheme()
  const [state, setState] = useState({
    atTop: window.scrollY < 30,
    navOpen: false
  })
  const { navOpen } = state
  const atTopRef = useRef(state.atTop)

  useOnChange(width, (width: any) => {
    if (!isWidthDown('sm', width) && state.navOpen) {
      setState((state) => ({ ...state, navOpen: false }))
    }
  })

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleScroll = (event: any) => {
    let scrollTop = window.scrollY
    const atTop = scrollTop < 30

    if (atTop !== atTopRef.current || navOpen) {
      setState((state) => ({ ...state, atTop, navOpen: false }))
    }

    atTopRef.current = atTop
  }

  const renderNavItem = (title: string, hide?: boolean) => {
    const handleClick = () => {
      let pathname
      switch (title) {
        case 'Features':
          pathname = 'features'
          break
        case 'Pricing':
          pathname = 'pricing'
          break
        case 'Customers':
          pathname = 'customers'
          break
        case 'News':
          pathname = 'news'
      }
      if (pathname) {
        history.push(pathname)
      }
    }

    return (
      <AppButton
        className={clsx(classes.navItem, hide ? classes.navItemInactive : '')}
        key={title}
        onClick={handleClick}>
        <Typography className={classes.navItemTitle}>{title}</Typography>
      </AppButton>
    )
  }

  const goToDashboard = () => {
    history.push('/dashboard')
  }

  const goHome = () => history.push('/')

  return (
    <div className={classes.navContainer}>
      <div
        className={clsx(
          classes.nav,
          navOpen ? classes.navOpen : '',
          state.atTop ? '' : classes.navTranslucent
        )}>
        <AppIcon className={classes.appIcon} onClick={goHome} />
        <div className={classes.navItemContainer}>
          {['Features', 'Pricing', 'Customers', 'News'].map((navItem: string) =>
            renderNavItem(navItem)
          )}
        </div>

        <div className={classes.navLoginContainer}>
          <AppButton
            className={classes.loginButton}
            onClick={isLoggedIn ? onLogout : goToDashboard}
            style={{ marginRight: 20 }}>
            <Typography className={classes.loginTitle}>
              {isLoggedIn ? 'Log out' : 'Log in'}
            </Typography>
          </AppButton>

          <GradiantButton
            className={classes.signUpButton}
            onClick={isLoggedIn ? goToDashboard : goToSignUp}>
            <Typography className={classes.loginTitle}>
              {isLoggedIn ? 'Dashboard' : 'Sign up'}
            </Typography>
          </GradiantButton>
        </div>

        <IconButton
          className={classes.navToggle}
          onClick={() =>
            setState((state) => ({ ...state, navOpen: !navOpen }))
          }>
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
          )}
          onClick={goToDashboard}>
          <Typography className={classes.loginTitle}>
            {isLoggedIn ? 'Dashboard' : 'Log in'}
          </Typography>
        </AppButton>

        <GradiantButton
          className={clsx(
            classes.signUpButton,
            !navOpen ? classes.navItemInactive : ''
          )}
          onClick={isLoggedIn ? goToDashboard : goToSignUp}>
          <Typography className={classes.loginTitle}>
            {isLoggedIn ? 'Dashboard' : 'Sign up'}
          </Typography>
        </GradiantButton>
      </div>
    </div>
  )
}

export const Nav = withWidth()(NavBar)
