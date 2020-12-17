import React, { useState, useEffect, Fragment } from "react";
import { Button, Typography } from "@material-ui/core";
import Sidebar from "react-sidebar";
import { Nav, NavItem, NavLink } from 'reactstrap';
import { HamburgerIcon, SidebarLogo, Logo, StyledBadge } from './style'
import { HomeIcon, SwitchIcon, BellIcon, CogIcon, SignOutIcon, MenuIcon, HistoryIcon,
	AnnounceIcon } from './icons';

const SideBarComponent = (props: any) => {
    const { user, history } = props;
	const [sidebarOpen, setSideBarOpen] = useState(false)

	const handleSideBar = (open: boolean) => {
		setSideBarOpen(open)
	}

	const handleOptionClick = (url: string) => {
		// history.push(url);
    }

    const renderContent = () => {
        return (
            <>
                <Nav vertical className="ml-auto" navbar>
                    <NavItem>
						<NavLink onClick={() => handleOptionClick("/settings")}><CogIcon /> Settings</NavLink>
					</NavItem>
                    <NavItem onClick={(e) => handleSideBar(!sidebarOpen)} >
                        <NavLink> <SignOutIcon />Logout</NavLink>
                    </NavItem>
                </Nav>
            </>
        )
    }
    
    return (
        <Fragment>
          <Sidebar
            sidebar={renderContent()}
            defaultSidebarWidth={240}
            open={sidebarOpen}
            docked={true}
            onSetOpen={handleSideBar}
            rootClassName={`sidebar-wrapper ${sidebarOpen && 'sidebar-wrapper-active'}`}
            sidebarClassName="sidebar"
            contentClassName="sidebar-content"
            overlayClassName="sidebar-overlay"
          >
            <HamburgerIcon onClick={() => handleSideBar(true)}>
              <MenuIcon />
            </HamburgerIcon>
          </Sidebar>
        </Fragment>
      )

}

export default SideBarComponent