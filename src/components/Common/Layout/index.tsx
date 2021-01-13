import React, { Fragment, useState } from 'react'
import SideBarComponent from '../SideBar'
import ToolBar from '../Header/header'
import { connect } from 'react-redux'
import ReactLoading from 'react-loading'
import { logout } from '../../../actions/authActions'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import {
  POSITION_ABSOLUTE,
  CENTER,
  FLEX,
  COLUMN
} from 'utils/constants/stringConstants'
import { ButtonConfig, Tab } from 'utils/types'
import { TabsProps } from '@material-ui/core'

type ReduxProps = { onLogout: () => void }

export type LayoutProps = {
  actionButtonConfig?: any
  headerTitle?: string
  children?: React.ReactNode
  tabs: Array<Tab>
  onTabPress: (tab: Tab) => void
  activeTab: Tab
  onProfileClick?: () => void
  onActionButtonPress?: () => void
  actionButtonTitle?: string
}

const Layout = (props: LayoutProps & ReduxProps) => {
  const {
    actionButtonConfig,
    onLogout,
    headerTitle,
    tabs,
    onTabPress,
    activeTab,
    onProfileClick
  } = props
  const [drawerOpen, setDrawerOpen] = useState(window.outerWidth > 500)

  const classes = useStyles()
  const theme = useTheme()

  return (
    <div className={classes.root}>
      <SideBarComponent
        {...{
          actionButtonConfig,
          onLogout,
          open: drawerOpen,
          setOpen: setDrawerOpen,
          tabs,
          onTabPress,
          activeTab
        }}
      />
      <div className={classes.main}>
        <ToolBar {...{ headerTitle, onProfileClick }} />
        {props.children}
      </div>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    display: FLEX,
    height: '100vh'
  },
  main: {
    display: FLEX,
    flexDirection: 'column',
    height: '100vh',
    width: '100vw',
    overflowX: 'auto',
    flexWrap: 'nowrap'
  }
}))

const mapDispatchToProps = (dispatch: any): ReduxProps => ({
  onLogout: () => dispatch(logout())
})

export default connect(null, mapDispatchToProps)(Layout)
