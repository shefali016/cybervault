import React, { useMemo } from 'react'
import {
  Button,
  Typography,
  Drawer,
  List,
  ListItem,
  LinearProgress,
  Divider,
  ListItemIcon,
  ListItemText
} from '@material-ui/core'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import PolymerSharpIcon from '@material-ui/icons/PolymerSharp'
import {
  SIDE_DRAWER_WIDTH,
  CENTER
} from '../../../utils/constants/stringConstants'
import {
  WHITE_COLOR,
  BORDER_COLOR
} from '../../../utils/constants/colorsConstants'
import { Link } from 'react-router-dom'
import { Tab, ButtonConfig } from 'utils/Interface'
import LogoutIcon from '@material-ui/icons/ExitToApp'

type Props = {
  actionButtonConfig: ButtonConfig
  onLogout?: () => void
  open: boolean
  setOpen: (open: boolean) => void
  tabs: Array<Tab>
  onTabPress: (tab: Tab) => void
  activeTab: Tab
}

const SideBarComponent = (props: Props) => {
  const {
    actionButtonConfig,
    onLogout,
    open = false,
    setOpen,
    tabs,
    onTabPress,
    activeTab
  } = props
  const classes = useStyles()

  const [topTabs, bottomTabs] = useMemo(() => {
    return [tabs.slice(0, 5), tabs.slice(5)]
  }, [tabs])

  const handleLogout = () => {
    onLogout && onLogout()
  }

  const renderStorageView = () => {
    return (
      <div className={classes.storageContainer}>
        <LinearProgress
          variant='determinate'
          value={70}
          className={classes.linearProgress}
        />
        <div
          className={clsx(classes.storageDetails, {
            [classes.visible]: open,
            [classes.hidden]: !open
          })}>
          <Typography style={{ color: WHITE_COLOR, fontSize: 8, marginTop: 5 }}>
            {'430GB of 500GB used'}
          </Typography>
          <Typography style={{ color: WHITE_COLOR, fontSize: 8 }}>
            {'Buy more storage'}
          </Typography>
        </div>
      </div>
    )
  }

  const renderTermsView = () => {
    return (
      <div
        className={clsx(classes.termsContainer, {
          [classes.visible]: open,
          [classes.hidden]: !open
        })}>
        <Typography style={{ color: WHITE_COLOR, fontSize: 8 }}>
          See our{' '}
          <Link to={`/forgot-password`} className={classes.linkText}>
            {'Terms & Condition'}
          </Link>
          {` & `}
          <Link to={`/forgot-password`} className={classes.linkText}>
            {'Privacy Policy'}
          </Link>
        </Typography>
        <Typography style={{ color: WHITE_COLOR, fontSize: 8 }}>
          {'Content Vault 2020@. All rights reserved'}
        </Typography>
      </div>
    )
  }

  const renderListItem = (tab: Tab, onClick: () => void) => {
    const isActive = tab.id === activeTab.id
    return (
      <ListItem
        button
        key={tab.text}
        onClick={onClick}
        className={clsx(classes.listItem, isActive ? classes.activeTab : '')}>
        <ListItemIcon style={{ opacity: isActive ? 1 : 0.7 }}>
          {tab.icon}
        </ListItemIcon>
        <ListItemText
          disableTypography
          primary={
            <Typography style={{ color: WHITE_COLOR, fontSize: 15 }}>
              {tab.text}
            </Typography>
          }
          className={classes.sideBarText}
        />
      </ListItem>
    )
  }

  return (
    <Drawer
      variant='permanent'
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open
      })}
      classes={{
        paper: clsx(classes.paper, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })
      }}
      anchor='left'>
      <Button
        className={classes.appIconContainer}
        onClick={() => setOpen(!open)}>
        <PolymerSharpIcon className={classes.appIcon} />
      </Button>
      <Button
        variant='contained'
        color='secondary'
        className={classes.addProjectButton}
        onClick={actionButtonConfig.onClick}
        {...(actionButtonConfig.icon
          ? { startIcon: actionButtonConfig.icon }
          : {})}>
        <Typography variant={'button'}>{actionButtonConfig.title}</Typography>
      </Button>
      <Divider className={classes.divider} />
      <div>
        {topTabs.map((tab, index) =>
          renderListItem(tab, () => onTabPress(tab))
        )}
      </div>
      {renderStorageView()}
      <Divider className={classes.divider} />
      <div>
        {bottomTabs.map((tab, index) =>
          renderListItem(tab, () => onTabPress(tab))
        )}
      </div>
      <Divider className={classes.divider} />
      <div>
        {renderListItem(
          {
            id: 'logout',
            text: 'Log Out',
            icon: <LogoutIcon className={classes.listIconStyle} />
          },
          handleLogout
        )}
      </div>
      <Divider className={classes.divider} />
      {renderTermsView()}
    </Drawer>
  )
}

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: SIDE_DRAWER_WIDTH,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerOpen: {
    width: SIDE_DRAWER_WIDTH,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(8)
  },
  paper: {
    backgroundColor: theme.palette.background.default,
    borderRightColor: BORDER_COLOR
  },
  root: {
    display: 'flex'
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3)
  },
  divider: {
    backgroundColor: BORDER_COLOR
  },
  appIconContainer: {
    alignItems: CENTER,
    justifyContent: CENTER,
    minHeight: theme.spacing(7),
    backgroundColor: theme.palette.background.secondary,
    borderRadius: 0
  },
  appIcon: {
    color: theme.palette.primary.light,
    fontSize: 43
  },
  sideBarText: {
    color: WHITE_COLOR,
    fontSize: 8
  },
  addProjectButton: {
    width: SIDE_DRAWER_WIDTH - 25,
    padding: '10px 0px 10px 0px',
    background: 'linear-gradient(45deg, #5ea5fc 30%, #3462fc 90%)',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
  menuIconStyle: {
    marginRight: 15,
    marginLeft: -30,
    color: WHITE_COLOR,
    fontSize: 30
  },
  listIconStyle: {
    marginRight: 10,
    color: theme.palette.primary.light,
    fontSize: theme.spacing(3)
  },
  storageContainer: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(4)
  },
  storageDetails: {
    marginLeft: 18
  },
  linearProgress: {
    marginLeft: 18,
    marginRight: 18
  },
  listItem: {
    paddingLeft: theme.spacing(2.4),
    paddingRight: theme.spacing(2.4),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    '&:hover': { background: theme.palette.background.surface },
    transition: theme.transitions.create(['background'], { duration: 300 })
  },
  activeTab: {
    background: theme.palette.background.surface,
    '&:hover': { background: theme.palette.background.surfaceHighlight },
    transition: theme.transitions.create(['background'], { duration: 300 })
  },
  listItemLogout: {
    marginTop: 50
  },
  termsContainer: {
    marginBottom: theme.spacing(2.5),
    marginLeft: theme.spacing(2.5),
    marginTop: theme.spacing(2.5)
  },
  hidden: {
    opacity: 0,
    transition: theme.transitions.create('opacity', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  visible: {
    opacity: 1,
    transition: theme.transitions.create('opacity', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  linkText: {
    color: theme.palette.primary.light,
    fontSize: 8
  }
}))

export default SideBarComponent
