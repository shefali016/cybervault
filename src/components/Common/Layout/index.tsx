import React, { Fragment } from 'react'
import SideBarComponent from '../SideBar'
import ToolBar from '../Header/header'
import NewProjectModal from '../../Projects/NewProjectModal'

const Layout = (props: any) => {
  return (
    <Fragment>
      <SideBarComponent {...props} />
      <div className='toolBarContainer'>
        <ToolBar {...props} />
      </div>
      <div className='pageContainer'>{props.children}</div>
      <NewProjectModal />
    </Fragment>
  )
}

export default Layout
