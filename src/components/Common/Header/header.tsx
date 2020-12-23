import React from 'react';
import classes from './Toolbar.module.css';
import { IconButton } from "@material-ui/core";
import profileIcon from '../../../assets/userAvatar.png';
import notificationIcon from '../../../assets/notificationIcon.png';

function Toolbar(props: {
    isNotificationIcon?: boolean,
    profilePictureIcon?: any,
    headerTitle?: string
}){

      return (  <div className={classes.Toolbar}>
            <div style={{ marginLeft: 50 }}>
                <h2 style={{ color: 'white', fontWeight: 'normal' }}>
                    {props.headerTitle ? props.headerTitle : "Dashboard"}
                </h2>
            </div>
            <div>
                {!props.isNotificationIcon ? (<IconButton
                    style={{ borderRadius: 100, width: 10, marginRight: 20 }}
                >
                    <img src={notificationIcon} alt="notification icon" />
                </IconButton>) : (null)}
                <IconButton
                    style={{ borderRadius: 100, width: 60, marginRight: 20 }}
                >
                    <img src={props.profilePictureIcon ? props.profilePictureIcon : profileIcon} style={{ borderRadius: 100 }}/>
                </IconButton>
            </div>
        </div>);
  }


export default Toolbar;