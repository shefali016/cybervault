import React, { Fragment } from 'react'
import SideBarComponent from '../SideBar';

const Layout = (props: any) => {
  return (
    <Fragment>
      <SideBarComponent {...props}/>
      <Fragment>
        {props.children}
      </Fragment>
    </Fragment>
  )
}

export default Layout
