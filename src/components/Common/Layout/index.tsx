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
  const [drawerOpen, setDrawerOpen] = useState(window.outerWidth > 500)

  const classes = useStyles()
  const theme = useTheme()
  console.log(theme.palette.primary.light)
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
        {props.children}
      </div>
    </div>
  )
}

const useStyles = makeStyles((theme: any) => ({
  root: {
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

const mapDispatchToProps = (dispatch: any) => ({
  onLogout: () => dispatch(logout())
})

export default connect(null, mapDispatchToProps)(Layout)
