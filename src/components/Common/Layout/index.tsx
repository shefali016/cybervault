import React, { Fragment } from 'react'
import SideBarComponent from '../SideBar'
import ToolBar from '../Header/header'
import { connect } from 'react-redux'
import { logout } from '../../../actions/authActions'

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
    headerTitle,
  } = props
  return (
    <Fragment>
      <SideBarComponent
        {...{ onActionButtonPress, actionButtonTitle, history, onLogout }}
      />
      <div className='toolBarContainer'>
        <ToolBar {...{ headerTitle }} />
      </div>
      <div className='pageContainer'>{props.children}</div>
    </Fragment>
  )
}

const mapDispatchToProps = (dispatch: any) => ({
  onLogout: () => dispatch(logout()),
})

export default connect(null, mapDispatchToProps)(Layout)
