import React, { Fragment } from 'react'
import SideBarComponent from '../SideBar';
import ToolBar from '../../Layout/Header/header'

const Layout = (props: any) => {
  return (
    <Fragment>
      <SideBarComponent {...props}/>
      <div className="toolBarContainer">
        <ToolBar />
      </div>
      <div className="pageContainer">
        {props.children}
      </div>
    </Fragment>
  )
}

export default Layout
