import React, { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Grid, MenuItem, IconButton, Typography } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import AddBoxIcon from '@material-ui/icons/AddBox'
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp'
import Popover from '@material-ui/core/Popover'
import { CENTER, COLUMN, FLEX, ROW } from 'utils/constants/stringConstants'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import ReceiptIcon from '@material-ui/icons/Receipt'
import { Project, Client, Account } from '../../../utils/Interface'
import { Dot } from '../../Common/Dot'
import { getWidgetCardHeight } from '../../../utils'
import InvoiceModal from '../../../components/Invoices/InvoiceModal'
import { ReduxState } from 'reducers/rootReducer'
import { AppLoader } from 'components/Common/Core/AppLoader'
import { ConfirmationDialog } from 'components/Common/Dialog/ConfirmationDialog'

const ITEM_HEIGHT = 48

type Props = {
  project: Project
  isPopover?: boolean
  style?: {}
  history?: any
  clients?: Array<Client>
  account: Account
  userInfo?:any
  onDelete?: (projectId: string) => void
  deletingId?: string
}

const ProjectCard = ({
  project,
  isPopover,
  style,
  history,
  account,
  userInfo,
  clients,
  onDelete,
  deletingId
}: Props) => {
  const [confirmingDelete, setConfirmingDelete] = useState(false)

  const startConfirmingDelete = () => setConfirmingDelete(true)
  const stopConfirmingDelete = () => setConfirmingDelete(false)
  const handleDelete = () =>
    typeof onDelete === 'function' && onDelete(project.id)

  const theme = useTheme()

  const [open, setOpen] = React.useState(false)

  const editProject = (projectId: string) => {
    history.push(`/project/${projectId}`)
  }
  const sendInvoice = (projectId: string) => {
    setOpen(true)
  }

  const onRequestClose = () => {
    setOpen(false)
  }

  const client = useMemo(
    () =>
      clients
        ? clients.find((client) => client.id === project.clientId)
        : undefined,
    [clients]
  )

  const clientLogo = client?.logo

  const classes = useStyles()
  return (
    <div style={style}>
      <InvoiceModal
        open={open}
        onRequestClose={onRequestClose}
        project={project}
        account={account}
        client={client}
        userInfo={userInfo}
      />
      <Card className={classes.card} elevation={5}>
        <div
          className={classes.imageWrapper}
          style={{
            background: `url(${clientLogo}) no-repeat center`,
            backgroundSize: 'cover'
          }}></div>

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
          <Grid
            style={{ position: 'absolute', top: 0, right: 0, display: 'flex' }}>
            {deletingId === project.id && (
              <AppLoader
                color={theme.palette.grey[800]}
                className={classes.loader}
                height={48}
                width={48}
              />
            )}

            <PopupState variant='popover'>
              {(popupState) => (
                <div>
                  <IconButton {...bindTrigger(popupState)}>
                    <MoreVertIcon style={{ color: theme.palette.grey[800] }} />
                  </IconButton>
                  <Popover
                    id={'long-menu'}
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
                    <MenuItem
                      style={{ fontSize: 12 }}
                      onClick={() => editProject(project.id)}>
                      <div style={{ display: FLEX }}>
                        <AddBoxIcon
                          style={{ marginRight: 5 }}
                          fontSize='small'
                        />
                        View Project
                      </div>
                    </MenuItem>

                    <MenuItem
                      style={{ fontSize: 12 }}
                      onClick={() => sendInvoice(project.id)}
                      disabled={
                        project.canInvoice === false ||
                        !account.stripe.payoutsEnabled
                      }
                      >
                      <div style={{ display: FLEX }}>
                        <ReceiptIcon
                          style={{ marginRight: 5 }}
                          fontSize='small'
                        />
                        Send Invoice
                      </div>
                    </MenuItem>
                    <MenuItem
                      style={{ fontSize: 12 }}
                      onClick={startConfirmingDelete}>
                      <div>
                        <div
                          style={{
                            display: FLEX,
                            color: theme.palette.error.main
                          }}>
                          <DeleteSharpIcon
                            style={{ marginRight: 5 }}
                            fontSize='small'
                          />
                          Delete Project
                        </div>
                      </div>
                    </MenuItem>
                  </Popover>
                </div>
              )}
            </PopupState>
          </Grid>
        ) : null}
      </Card>
      <ConfirmationDialog
        title='Delete Project'
        message='Are you sure you want to delete this project. This can not be undone.'
        isOpen={confirmingDelete}
        onClose={stopConfirmingDelete}
        onYes={handleDelete}
        onNo={stopConfirmingDelete}
      />
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  loader: {},
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
    fontSize: 13,
    color: theme.palette.text.paper,
    fontWeight: 600
  },
  bodyText: {
    fontSize: 10,
    color: theme.palette.text.paper
  }
}))
export default ProjectCard
