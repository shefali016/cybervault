import React from 'react'
import {
  Button,
  Typography,
  Drawer,
  List,
  ListItem,
  LinearProgress,
  Divider,
  ListItemIcon,
  ListItemText,
  IconButton
} from '@material-ui/core'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import PolymerSharpIcon from '@material-ui/icons/PolymerSharp'
import AddIcon from '@material-ui/icons/Add'
import {
  SIDE_DRAWER_WIDTH,
  APP_BAR_HEIGHT,
  CENTER
} from '../../../utils/constants/stringConstants'
import {
  WHITE_COLOR,
  BORDER_COLOR,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  SECONDARY_DARK_COLOR
} from '../../../utils/constants/colorsConstants'
import ROUTES from '../../../utils/constants/routes'
import { Link } from 'react-router-dom'

type Props = {
  actionButtonTitle: string
  onActionButtonPress: () => void
  history: any
  onLogout?: () => void
  open: boolean
  setOpen: (open: boolean) => void
}

const SideBarComponent = (props: Props) => {
  const {
    history,
    actionButtonTitle,
    onActionButtonPress,
    onLogout,
    open = false,
    setOpen
  } = props
  const classes = useStyles()

  const handleOptionClick = (index: Number) => {
    const url = index === 0 ? ROUTES.DASHBOARD : ROUTES.PROJECTS
    history.push(url)
  }

  const handleLogout = () => {
    onLogout && onLogout()
  }

  const getListItemIcon = (text: string) => {
    switch (text) {
      case 'DashBoard':
        return <InboxIcon className={classes.listIconStyle} />
      default:
        return <MailIcon className={classes.listIconStyle} />
    }
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

  const renderListItem = (text: string, onClick: () => void) => (
    <ListItem button key={text} onClick={onClick} className={classes.listItem}>
      <ListItemIcon>{getListItemIcon(text)}</ListItemIcon>
      <ListItemText
        disableTypography
        primary={
          <Typography style={{ color: WHITE_COLOR, fontSize: 15 }}>
            {text}
          </Typography>
        }
        className={classes.sideBarText}
      />
    </ListItem>
  )

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
        startIcon={<AddIcon className={classes.menuIconStyle} />}
        onClick={onActionButtonPress}>
        <Typography variant={'button'}>{actionButtonTitle}</Typography>
      </Button>
      <Divider className={classes.divider} />
      <List>
        {[
          'DashBoard',
          'Projects',
          'Portfolio',
          'Setting',
          'Storage'
        ].map((text, index) =>
          renderListItem(text, () => handleOptionClick(index))
        )}
      </List>
      {renderStorageView()}
      <Divider className={classes.divider} />
      <List>
        {['Invoices', 'Payment', 'Security'].map((text, index) =>
          renderListItem(text, () => handleOptionClick(2))
        )}
      </List>
      <Divider className={classes.divider} />
      <List>{renderListItem('Log Out', handleLogout)}</List>
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
  paper: { backgroundColor: SECONDARY_COLOR, borderRightColor: BORDER_COLOR },
  root: {
    display: 'flex'
  },
  appBar: {
    width: `calc(100% - ${SIDE_DRAWER_WIDTH}px)`,
    marginLeft: SIDE_DRAWER_WIDTH
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
    minHeight: theme.spacing(8),
    backgroundColor: SECONDARY_DARK_COLOR,
    borderRadius: 0
  },
  appIcon: {
    color: PRIMARY_COLOR,
    fontSize: 45
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
    color: PRIMARY_COLOR,
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
    paddingBottom: theme.spacing(1)
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
    color: PRIMARY_COLOR,
    fontSize: 8
  }
}))

export default SideBarComponent
