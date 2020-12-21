import React, { useState } from "react";
import { Button, Typography, Drawer, Box, List, ListItem, LinearProgress, IconButton, CssBaseline, AppBar, Toolbar, Divider, ListItemIcon, ListItemText } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import PolymerSharpIcon from '@material-ui/icons/PolymerSharp';
import AddIcon from '@material-ui/icons/Add';

const drawerWidth = 200;
const APP_BAR_HEIGHT = 70;
const PRIMARY_COLOR = '#5ea5fc'

const SideBarComponent = (props: any) => {
    const { user, history } = props;
    const [sidebarOpen, setSideBarOpen] = useState(false)
    const classes = useStyles();

	const handleSideBar = (open: boolean) => {
		setSideBarOpen(open)
	}

	const handleOptionClick = (url: string) => {
		history.push(url);
    }

    const getListItemIcon = (text: string) => {
        switch (text) {
            case 'DashBoard':
                return <InboxIcon className={classes.listIconStyle}/>
            default:
                return <MailIcon className={classes.listIconStyle}/>
        }
    }

    const renderStorageView = () => {
        return(
            <div className={classes.storageContainer}>
                <LinearProgress variant="determinate" value={70} className={classes.linearProgress}/>
                <div className={classes.storageDetails}>
                    <Typography style={{ color: '#FFFFFF', fontSize: 8, marginTop: 5 }}>{'430GB of 500GB used'}</Typography>
                    <Typography style={{ color: '#FFFFFF', fontSize: 8 }}>{'Buy more storage'}</Typography>
                </div>
            </div>
        );
    }

    return (
        <div className={classes.root}>
        <CssBaseline />
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
            <ListItemIcon className={classes.appIconContainer}><PolymerSharpIcon className={classes.appIcon}/></ListItemIcon>
            <Button
                variant="contained"
                color="secondary"
                className={classes.addProjectButton}
                startIcon={<AddIcon className={classes.menuIconStyle}/>}
            >
                Add Project
            </Button>
            <Divider className={classes.divider}/>
            <List>
                {['DashBoard', 'Projects', 'Portfolio', 'Setting', 'Storage'].map((text, index) => (
                <ListItem button key={text} onClick={() => handleOptionClick('')} className={classes.listItem}>
                    <ListItemIcon>{getListItemIcon(text)}</ListItemIcon>
                    <ListItemText disableTypography primary={<Typography style={{ color: '#FFFFFF', fontSize: 14 }}>{text}</Typography>} className={classes.sideBarText}/>
                </ListItem>
                ))}
            </List>
            {renderStorageView()}
            <Divider className={classes.divider}/>
            <List>
                {['Invoices', 'Payment', 'Security'].map((text, index) => (
                <ListItem button key={text} onClick={() => handleOptionClick('')} className={classes.listItem}>
                    <ListItemIcon>{getListItemIcon(text)}</ListItemIcon>
                    <ListItemText disableTypography primary={<Typography style={{ color: '#FFFFFF', fontSize: 14 }}>{text}</Typography>} className={classes.sideBarText} />
                </ListItem>
                ))}
            </List>
        </Drawer>
      </div>
      )

}

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      '&:hover': {
        overflowY: 'auto',
      },
      '&::-webkit-scrollbar': {
        display: 'none',
      }
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: 'rgb(36, 38, 43)',
      borderRightColor: 'rgb(62, 64, 68)'
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(3),
    },
    divider: {
        backgroundColor: 'rgb(62, 64, 68)'
    },
    appIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: APP_BAR_HEIGHT,
        backgroundColor: 'rgb(51, 51, 51)'
    },
    appIcon: {
        color: 'green',
        fontSize: 60
    },
    sideBarText: {
        color: 'white',
        fontSize: 8
    },
    addProjectButton: {
        width: drawerWidth - 25,
        background: 'linear-gradient(45deg, #5ea5fc 30%, #3462fc 90%)',
        // boxShadow: '0 1px 2px 0.5px #5ea5fc',
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        marginTop: 25,
        marginBottom: 30
    },
    menuIconStyle: {
        marginRight: 15,
        color: 'white',
        fontSize: 18
    },
    listIconStyle: {
        marginRight: 15,
        color: 'white',
        fontSize: 18
    },
    storageContainer: {
        marginBottom: 20,
    },
    storageDetails: {
        marginLeft: 18,
    },
    linearProgress: {
        marginLeft: 18,
        marginRight: 18
    },
    listItem: {
        paddingTop: 3,
        paddingBottom: 3
    }
  }));

export default SideBarComponent;