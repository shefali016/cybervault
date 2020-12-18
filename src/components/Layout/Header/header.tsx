import React from 'react';
import classes from './Toolbar.module.css';
import { IconButton } from "@material-ui/core";
import logo from '../../../assets/logo.png';
import profileIcon from '../../../assets/profileIcon.png';
import notificationIcon from '../../../assets/notificationIcon.png';

const Toolbar = (props: {
    isNotificationIcon?: boolean,
    profilePictureIcon?: any,
    title?: string
}): JSX.Element => (
        <header className={classes.Toolbar}>
            <div className={classes.Logo}>
                <img src={logo} style={{ height: 30, width: 30, marginTop: 10 }} />
            </div>

            <div style={{ position: "absolute", left: 90 }}>
                <h2 style={{ color: 'white' }}>
                    {props.title ? props.title : "DashBoard"}
                </h2>
            </div>

            <div>
                {props.isNotificationIcon ? (<IconButton
                    style={{ borderRadius: 100, width: 10, marginRight: 20 }}
                >
                    <img src={notificationIcon} alt="notification icon" />
                </IconButton>) : (null)}
                <IconButton
                    style={{ borderRadius: 100, width: 60, marginRight: 20 }}
                >
                    <img src={props.profilePictureIcon ? props.profilePictureIcon : profileIcon} />
                </IconButton>
            </div>
        </header>
    )

export default Toolbar;