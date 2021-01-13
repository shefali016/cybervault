import React from 'react'
import {
  Button,
  Card,
  Grid,
  MenuItem,
  IconButton,
  Typography
} from '@material-ui/core'
import logo from '../../../assets/nike.png'
import { makeStyles } from '@material-ui/core/styles'
import AddBoxIcon from '@material-ui/icons/AddBox'
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp'
import Popover from '@material-ui/core/Popover'
import {
  AUTO,
  CENTER,
  COLUMN,
  FLEX,
  ROW
} from 'utils/constants/stringConstants'
import { BLACK_COLOR } from 'utils/constants/colorsConstants'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import ReceiptIcon from '@material-ui/icons/Receipt'
import { Project } from '../../../utils/types'
import { Dot } from '../../Common/Dot'
import { getCardHeight, getWidgetCardHeight } from '../../../utils'

type Props = {
  project: Project
  openProject?: any
  isPopover?: boolean
  style?: {}
  history?: any
}

const ProjectCard = ({
  project,
  openProject,
  isPopover,
  style,
  history
}: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const [open, setOpen] = React.useState(false)

  const editProject = () => {
    // history.replace(`/project/${project.id}`)
    history.push('/project')
  }

  const handleClose = () => {
    setAnchorEl(null)
    setOpen(false)
  }
  const ITEM_HEIGHT = 48
  const classes = useStyles()
  return (
    <div style={style}>
      <Card className={classes.card} elevation={5}>
        <div className={classes.imageWrapper}>
          <img className={classes.img} src={project.logo || logo} alt='Logo' />
        </div>
        <div className={classes.footer}>
          <Typography variant={'body1'} className={classes.title} noWrap={true}>
            {project.campaignName}
          </Typography>
          <div className={classes.footerInfo}>
            <Typography variant={'caption'} className={classes.bodyText}>
              Value {project.campaignBudget}
            </Typography>
            <Dot style={{ marginLeft: 8, marginRight: 8 }} />
            <Typography variant={'caption'} className={classes.bodyText}>
              {project.campaignDate}
            </Typography>
          </div>
        </div>
        {isPopover ? (
          <Grid style={{ position: 'absolute', top: 0, right: 0 }}>
            <PopupState variant='popover' popupId='demo-popup-popover'>
              {(popupState) => (
                <div>
                  <IconButton
                    aria-label='more'
                    aria-controls='long-menu'
                    aria-haspopup='true'
                    {...bindTrigger(popupState)}>
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
                    <MenuItem style={{ fontSize: 12 }} onClick={editProject}>
                      <div style={{ display: FLEX }}>
                        <AddBoxIcon
                          style={{ marginRight: 5 }}
                          fontSize='small'
                        />
                        Edit Project Info
                      </div>
                    </MenuItem>
                    <MenuItem style={{ fontSize: 12 }}>
                      <div style={{ display: FLEX }}>
                        <ReceiptIcon
                          style={{ marginRight: 5 }}
                          fontSize='small'
                        />
                        Send Invoice
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
        ) : null}
      </Card>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    position: 'relative'
  },
  footer: {
    display: FLEX,
    flexDirection: COLUMN,
    justifyContent: CENTER,
    textAlign: 'center',
    height: 60,
    overflow: 'hidden'
  },
  footerInfo: {
    marginTop: theme.spacing(0.1),
    display: FLEX,
    flexDirection: ROW,
    justifyContent: CENTER,
    alignItems: CENTER
  },
  card: {
    width: getWidgetCardHeight(theme),
    height: getWidgetCardHeight(theme),
    borderRadius: 15,
    display: FLEX,
    flexDirection: COLUMN,
    position: 'relative'
  },
  imageWrapper: {
    alignItems: CENTER,
    display: FLEX,
    justifyContent: CENTER,
    flex: 1,
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: theme.palette.grey[300],
    overflow: 'hidden'
  },
  title: {
    fontSize: '12px',
    color: BLACK_COLOR,
    fontWeight: 600
  },
  bodyText: {
    fontSize: '8px',
    color: BLACK_COLOR
  },
  img: {
    width: AUTO,
    height: AUTO,
    maxHeight: '100%'
  }
}))
export default ProjectCard
