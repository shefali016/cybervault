import React, { useState } from 'react'
import SideBarComponent from '../SideBar'
import ToolBar from '../Header/header'
import { connect } from 'react-redux'
import { logout } from '../../../actions/authActions'
import { makeStyles } from '@material-ui/core/styles'
import { FLEX } from 'utils/constants/stringConstants'
import { Tab, User } from 'utils/Interface'
import { ReduxState } from 'reducers/rootReducer'

type StateProps = { user: User }
type DispatchProps = { onLogout: () => void }
type ReduxProps = StateProps & DispatchProps

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
    onProfileClick,
    user
  } = props
  const [drawerOpen, setDrawerOpen] = useState(window.outerWidth > 500)

  const classes = useStyles()
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
        <ToolBar {...{ headerTitle, onProfileClick, user }} />
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

const mapState = (state: ReduxState): StateProps => ({
  user: state.auth.user as User
})

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  onLogout: () => dispatch(logout())
})

export default connect(mapState, mapDispatchToProps)(Layout)
