import React from 'react'
import {
  IconButton,
  Typography,
  MenuItem,
  Grid,
  Avatar
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import defaultProfileIcon from '../../../assets/default_user.png'
import { SIDE_DRAWER_WIDTH } from 'utils/constants/stringConstants'
import { GradiantButton } from '../../Common/Button/GradiantButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import ReceiptIcon from '@material-ui/icons/Receipt'
import AddBoxIcon from '@material-ui/icons/AddBox'
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp'
import Popover from '@material-ui/core/Popover'
import ProjectStatusIndicator from '../ProjectStatusIndicator'
import { connect } from 'react-redux'
import { CENTER, FLEX } from 'utils/constants/stringConstants'
import { WHITE_COLOR } from 'utils/constants/colorsConstants'
import NotificationIcon from '@material-ui/icons/Notifications'
import { User } from 'utils/Interface'
import PolymerSharpIcon from '@material-ui/icons/PolymerSharp'
import Dummy from '../../../assets/Dummy.jpg'
type Props = {
  isNotificationIcon?: boolean
  profilePictureIcon?: any
  headerTitle?: string
  onProfileClick?: () => void
  isEditInfoScreen?: boolean
  projectName?: string
  user: User
  onEditProject?: boolean
  isPortfolioSingleScreen?: boolean
}
const ITEM_HEIGHT = 48

function Toolbar(props: Props) {
  const classes = useStyles()
  const [anchorEl] = React.useState<null | HTMLElement>(null)

  const renderInnerPopover = () => {
    return (
      <Grid>
        <PopupState variant='popover' popupId='demo-popup-popover'>
          {(popupState) => (
            <div>
              <IconButton
                aria-label='more'
                aria-controls='long-menu'
                aria-haspopup='true'
                {...bindTrigger(popupState)}
                style={{ padding: 0 }}>
                <div
                  style={{
                    display: FLEX,
                    fontSize: 12,
                    height: 20,
                    padding: 0,
                    color: 'black'
                  }}>
                  <AddBoxIcon style={{ marginRight: 5 }} fontSize='small' />
                  Project Status
                </div>
              </IconButton>
              <Popover
                id={'long-menu'}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left'
                }}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 2.5,
                    borderRadius: 15,
                    border: 1,
                    fontSize: 12,
                    borderColor: 'black',
                    paddingTop: 8,
                    paddingBottom: 8,
                    color: '#000'
                  }
                }}
                style={{ marginLeft: 30, marginTop: -20 }}
                {...bindPopover(popupState)}>
                <MenuItem style={{ fontSize: 12 }}>
                  <div style={{ display: FLEX, justifyContent: CENTER }}>
                    <div style={{ marginRight: 10, display: FLEX }}>
                      <ProjectStatusIndicator status={'In progress'} />
                    </div>
                    In progress
                  </div>
                </MenuItem>
                <MenuItem style={{ fontSize: 12 }}>
                  <div style={{ display: FLEX, justifyContent: CENTER }}>
                    <div style={{ marginRight: 10, display: FLEX }}>
                      <ProjectStatusIndicator status={'Completed'} />
                    </div>
                    Completed
                  </div>
                </MenuItem>
                <MenuItem style={{ fontSize: 12 }}>
                  <div style={{ display: FLEX, justifyContent: CENTER }}>
                    <div style={{ marginRight: 10, display: FLEX }}>
                      <ProjectStatusIndicator status={'Archived'} />
                    </div>
                    Archived
                  </div>
                </MenuItem>
              </Popover>
            </div>
          )}
        </PopupState>
      </Grid>
    )
  }

  const renderEditInfoData = () => {
    return props.onEditProject ? (
      <div
        style={{ display: FLEX, alignItems: CENTER, justifyContent: CENTER }}>
        <h2
          style={{
            color: 'white',
            fontWeight: 'normal',
            marginRight: 20,
            marginLeft: 20
          }}>
          {'-'}
          {props.projectName ? props.projectName : 'Nike Campaign'}
        </h2>
        <Grid style={{ marginRight: 100 }}>
          <PopupState variant='popover' popupId='demo-popup-popover'>
            {(popupState) => (
              <div>
                <IconButton
                  aria-label='more'
                  aria-controls='long-menu'
                  aria-haspopup='true'
                  {...bindTrigger(popupState)}
                  style={{ color: WHITE_COLOR }}>
                  <MoreVertIcon />
                </IconButton>
                <Popover
                  id={'long-menu'}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                  }}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 2.5,
                      borderRadius: 15,
                      border: 1,
                      fontSize: 12,
                      borderColor: 'black',
                      paddingTop: 8,
                      paddingBottom: 8,
                      color: '#000'
                    }
                  }}
                  style={{ marginLeft: -20, marginTop: -20 }}
                  {...bindPopover(popupState)}>
                  <MenuItem style={{ fontSize: 12, color: 'black' }}>
                    {renderInnerPopover()}
                  </MenuItem>
                  <MenuItem style={{ fontSize: 12 }}>
                    <div style={{ display: FLEX }}>
                      <ReceiptIcon
                        style={{ marginRight: 5 }}
                        fontSize='small'
                      />
                      Invoice Milestone
                    </div>
                  </MenuItem>
                  <MenuItem style={{ fontSize: 12 }}>
                    <div style={{ display: FLEX, color: 'red' }}>
                      <DeleteSharpIcon
                        style={{ marginRight: 5 }}
                        fontSize='small'
                      />
                      Delete Project
                    </div>
                  </MenuItem>
                </Popover>
              </div>
            )}
          </PopupState>
        </Grid>
        <div style={{ padding: 0 }}>
          <GradiantButton>
            <Typography variant={'body1'}> Invoice</Typography>
          </GradiantButton>
        </div>
      </div>
    ) : null
  }

  return (
    <div
      className={
        !props.isPortfolioSingleScreen
          ? classes.Toolbar
          : classes.portfolioHeader
      }>
      {props.isPortfolioSingleScreen ? (
        <div>
          <PolymerSharpIcon className={classes.appIcon} />
        </div>
      ) : null}
      <div style={{ marginLeft: 25, display: FLEX }} className='portfolioTitle'>
        {props.isPortfolioSingleScreen ? (
          <Avatar alt='Remy Sharp' src={Dummy} />
        ) : null}
        <h3 className={classes.title}>{props.headerTitle}</h3>
        {renderEditInfoData()}
      </div>
      {!props.isPortfolioSingleScreen ? (
        <div>
          {!props.isNotificationIcon ? (
            <IconButton
              style={{ borderRadius: 100, width: 10, marginRight: 25 }}>
              <NotificationIcon className={classes.notificationIcon} />
            </IconButton>
          ) : null}
          <IconButton
            style={{ borderRadius: 100, width: 45, marginRight: 22 }}
            onClick={props.onProfileClick}>
            <img
              src={props.user.avatar ? props.user.avatar : defaultProfileIcon}
              style={{ borderRadius: 20, height: 33, width: 33 }}
              alt={'img'}
            />
          </IconButton>
        </div>
      ) : null}
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  title: {
    color: 'white',
    fontWeight: 'normal',
    [theme.breakpoints.down('sm')]: {
      fontSize: 14
    }
  },
  notificationIcon: { color: theme.palette.common.white, fontSize: 26 },
  Toolbar: {
    height: theme.spacing(7),
    background: theme.palette.background.secondary,
    display: 'flex',
    minWidth: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: theme.palette.background.default
  },
  appIcon: {
    color: theme.palette.primary.light,
    fontSize: 43
  },
  portfolioHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 15px',
    height: theme.spacing(7),
    background: theme.palette.background.secondary,
    boxSizing: 'border-box',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: theme.palette.background.default,
    '& .portfolioTitle': {
      marginLeft: '50px !important',
      alignItems: 'center',
      '& h3': {
        margin: '0 0 0 25px'
      }
    }
  }
}))

const mapStateToProps = (state: any) => ({
  onEditProject: state.project.onEditProjectScreen
})

export default connect(mapStateToProps, null)(Toolbar)
