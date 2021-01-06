import React, { Fragment, useState } from 'react'
import SideBarComponent from '../SideBar'
import ToolBar from '../Header/header'
import { connect } from 'react-redux'
import ReactLoading from 'react-loading'
import { logout } from '../../../actions/authActions'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { POSITION_ABSOLUTE, CENTER } from 'utils/constants/stringConstants'

type Props = {
  onActionButtonPress: () => void
  actionButtonTitle: string
  headerTitle?: string
  children?: React.ReactNode
  history: any
  onLogout?: () => void
  isLoading: boolean
}

const Layout = (props: Props) => {
  const {
    onActionButtonPress,
    actionButtonTitle,
    history,
    onLogout,
    headerTitle,
    isLoading
  } = props
  const [drawerOpen, setDrawerOpen] = useState(true)

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
        <div style={{ flex: 1 }}>{props.children}</div>
      </div>
      {isLoading && (
        <div className={classes.loader}>
          <ReactLoading
            type={'bubbles'}
            color={theme.palette.primary.dark}
            height={'12%'}
            width={'12%'}
          />
        </div>
      )}
    </div>
  )
}

const useStyles = makeStyles((theme: any) => ({
  root: { display: 'flex' },
  main: { flexGrow: 1, height: '100vh' },
  loader: {
    flexGrow: 1,
    position: POSITION_ABSOLUTE,
    display: 'flex',
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: CENTER,
    justifyContent: CENTER,
    zIndex: 10000
  }
}))

const mapStateToProps = (state: any) => ({
  isLoading: state.project.isLoading
})

const mapDispatchToProps = (dispatch: any) => ({
  onLogout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
