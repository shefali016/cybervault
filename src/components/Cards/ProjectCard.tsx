import React, { useState, useMemo } from 'react'
import { Card, Grid, Typography } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import AddBoxIcon from '@material-ui/icons/AddBox'
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp'
import { CENTER, COLUMN, FLEX, ROW } from 'utils/constants/stringConstants'
import ReceiptIcon from '@material-ui/icons/Receipt'
import { Project, Client, Account } from 'utils/Interface'
import { Dot } from 'components/Common/Dot'
import { getWidgetCardHeight } from 'utils'
import InvoiceModal from 'components/Invoices/InvoiceModal'
import { AppLoader } from 'components/Common/Core/AppLoader'
import { ConfirmationDialog } from 'components/Common/Dialog/ConfirmationDialog'
import { PopoverButton } from 'components/Common/PopoverButton'

const ITEM_HEIGHT = 48

type Props = {
  project: Project
  isPopover?: boolean
  style?: {}
  history?: any
  clients?: Array<Client>
  account: Account
  userInfo?: any
  onDelete?: (projectId: string) => void
  deletingId?: string
}

export const ProjectCard = ({
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

  const popoverMenuItems = [
    {
      title: 'View Project',
      Icon: AddBoxIcon,
      onClick: () => editProject(project.id)
    },
    {
      title: 'Send Invoice',
      Icon: ReceiptIcon,
      onClick: () => sendInvoice(project.id),
      disabled:
        project.canInvoice === false ||
        (account.stripe && !account.stripe.payoutsEnabled)
    },
    {
      title: 'Delete Project',
      Icon: DeleteSharpIcon,
      onClick: startConfirmingDelete,
      desctructive: true
    }
  ]

  const handleClick = () => editProject(project.id)

  return (
    <div style={style} className={classes.root}>
      <InvoiceModal
        open={open}
        onRequestClose={onRequestClose}
        project={project}
        account={account}
        client={client}
        userInfo={userInfo}
      />
      <Card className={classes.card} elevation={5}>
        <div className={classes.imageWrapper} onClick={handleClick}>
          {!!clientLogo && (
            <img src={clientLogo} alt='client-logo' className={classes.image} />
          )}
        </div>

        <div className={classes.footer}>
          <Typography
            variant={'h6'}
            className={classes.title}
            noWrap={true}
            onClick={handleClick}>
            {project.campaignName}
          </Typography>
          <div className={classes.footerInfo}>
            <Typography variant={'caption'} className={classes.bodyText}>
              Value {project.campaignBudget}
            </Typography>
            <Dot
              style={{
                marginLeft: 8,
                marginRight: 8,
                backgroundColor: theme.palette.text.meta
              }}
            />
            <Typography variant={'caption'} className={classes.bodyText}>
              {project.campaignDate}
            </Typography>
          </div>
        </div>

        {isPopover ? (
          <Grid
            style={{ position: 'absolute', top: 5, right: 5, display: 'flex' }}>
            {deletingId === project.id && (
              <AppLoader
                color={theme.palette.grey[800]}
                className={classes.loader}
                height={48}
                width={48}
              />
            )}

            <PopoverButton menuItems={popoverMenuItems} />
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
  root: {},
  footer: {
    display: FLEX,
    flexDirection: COLUMN,
    justifyContent: CENTER,
    textAlign: 'center',
    height: 75,
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
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      boxShadow: `0 0 10px 10px ${theme.palette.background.shadow}`
    }
  },
  imageWrapper: {
    alignItems: CENTER,
    display: FLEX,
    justifyContent: CENTER,
    flex: 1,
    overflow: 'hidden',
    cursor: 'pointer',
    boxShadow: `0 0 10px 4px ${theme.palette.grey[400]}`
  },
  image: {
    height: '100%',
    minWidth: '100%',
    maxWidth: '100%',
    objectFit: 'cover'
  },
  title: {
    color: theme.palette.text.paper,
    fontWeight: 600,
    margin: `0 ${theme.spacing(2)}px`,
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.primary.main
    }
  },
  bodyText: {
    color: theme.palette.text.meta
  }
}))
