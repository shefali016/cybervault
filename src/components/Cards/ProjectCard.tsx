import React, { useState, useMemo, useContext } from 'react'
import { Card, Grid, Typography } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import AddBoxIcon from '@material-ui/icons/AddBox'
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp'
import { CENTER, COLUMN, FLEX, ROW } from 'utils/constants/stringConstants'
import ReceiptIcon from '@material-ui/icons/Receipt'
import { Project, Client, Account, User } from 'utils/Interface'
import { Dot } from 'components/Common/Dot'
import { getWidgetCardHeight } from 'utils'
import InvoiceModal from 'components/Invoices/InvoiceModal'
import { AppLoader } from 'components/Common/Core/AppLoader'
import { ConfirmationDialog } from 'components/Common/Dialog/ConfirmationDialog'
import { PopoverMoreIconButton } from 'components/Common/Popover/PopoverMoreIconButton'
import clsx from 'clsx'
import { ModalContext } from 'routes/DashboardSwitch'

type Props = {
  project: Project
  style?: {}
  containerStyle?: {}
  onClick: (project: Project) => void
  clients: Array<Client>
  account: Account
  userInfo: User
  onDelete: (projectId: string) => void
  deletingId: string | null
  className?: string
}

export const ProjectCard = ({
  project,
  style,
  containerStyle,
  onClick,
  account,
  userInfo,
  clients,
  onDelete,
  deletingId,
  className
}: Props) => {
  const modalContext = useContext(ModalContext)

  const [confirmingDelete, setConfirmingDelete] = useState(false)
  const startConfirmingDelete = () => setConfirmingDelete(true)
  const stopConfirmingDelete = () => setConfirmingDelete(false)
  const handleDelete = () =>
    typeof onDelete === 'function' && onDelete(project.id)

  const theme = useTheme()

  const [open, setOpen] = React.useState(false)

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

  const getMenuItems = () => [
    {
      title: 'View Project',
      Icon: AddBoxIcon,
      onClick: handleClick
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

  const handleClick = () => onClick(project)

  const handleCreateProject = modalContext.toggleProjectModal(true)

  return (
    <div style={containerStyle} className={classes.root}>
      <InvoiceModal
        open={open}
        onRequestClose={onRequestClose}
        project={project}
        account={account}
        userInfo={userInfo}
        onCreateProject={handleCreateProject}
      />
      <Card className={clsx('widgetItem', className)} style={style}>
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
            <Typography variant={'subtitle1'} className={classes.bodyText}>
              Value {project.campaignBudget}
            </Typography>
            <Dot
              style={{
                marginLeft: 8,
                marginRight: 8,
                backgroundColor: theme.palette.text.meta
              }}
            />
            <Typography variant={'subtitle1'} className={classes.bodyText}>
              {project.campaignDate}
            </Typography>
          </div>
        </div>

        <Grid
          style={{ position: 'absolute', top: 10, right: 10, display: 'flex' }}>
          {deletingId === project.id && (
            <AppLoader
              color={theme.palette.grey[800]}
              className={classes.loader}
              height={48}
              width={48}
            />
          )}

          <PopoverMoreIconButton
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}
            menuItems={getMenuItems()}
          />
        </Grid>
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
    height: 80,
    overflow: 'hidden'
  },
  footerInfo: {
    marginTop: theme.spacing(0.1),
    display: FLEX,
    flexDirection: ROW,
    justifyContent: CENTER,
    alignItems: CENTER
  },
  imageWrapper: {
    alignItems: CENTER,
    display: FLEX,
    justifyContent: CENTER,
    flex: 1,
    overflow: 'hidden',
    cursor: 'pointer',
    boxShadow: `0 0 10px 4px ${theme.palette.grey[400]}`,
    transition: theme.transitions.create(['transform'], {
      duration: 500,
      easing: theme.transitions.easing.easeOut
    }),
    '&:hover': {
      transform: `scale(1.02)`
    }
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
