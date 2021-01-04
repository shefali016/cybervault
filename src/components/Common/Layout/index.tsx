import React, { Fragment, useState } from 'react'
import SideBarComponent from '../SideBar'
import ToolBar from '../Header/header'
import { connect } from 'react-redux'
import { logout } from '../../../actions/authActions'
import { makeStyles, useTheme } from '@material-ui/core/styles'

type Props = {
  onActionButtonPress: () => void
  actionButtonTitle: string
  headerTitle?: string
  children?: React.ReactNode
  history: any
  onLogout?: () => void
}

const Layout = (props: Props) => {
  const {
    onActionButtonPress,
    actionButtonTitle,
    history,
    onLogout,
    headerTitle
  } = props
  const [drawerOpen, setDrawerOpen] = useState(true)

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <SideBarComponent
        {...{
          onActionButtonPress,
          actionButtonTitle,
          history,
          onLogout,
          open: drawerOpen,
          setOpen: setDrawerOpen
        }}
      />
      <div className={classes.main}>
        <ToolBar {...{ headerTitle }} />
        <div style={{ flex: 1 }}>{props.children}</div>
      </div>
    </div>
  )
}

const useStyles = makeStyles((theme: any) => ({
  root: { display: 'flex' },
  main: { flexGrow: 1, height: '100vh' }
}))

const mapDispatchToProps = (dispatch: any) => ({
  onLogout: () => dispatch(logout())
})

export default connect(null, mapDispatchToProps)(Layout)
