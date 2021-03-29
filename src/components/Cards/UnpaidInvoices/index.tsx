import React from 'react'
import { Card, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { BOLD } from 'utils/constants/stringConstants'
import { WHITE_COLOR } from 'utils/constants/colorsConstants'
import clsx from 'clsx'
import {
  Client,
  ClientCache,
  Invoice,
  Project,
  ProjectCache
} from 'utils/Interface'
import { InvoiceStatusIndicator } from 'components/Invoices/InvoiceStatusIndicator'

type Props = {
  invoice: Invoice
  clientCache: ClientCache
  projectCache: ProjectCache
  onClick: (invoice: Invoice) => void
  style?: {}
}

function UnpaidInvoices({
  invoice,
  clientCache,
  projectCache,
  onClick,
  style
}: Props) {
  const classes = useStyles()
  const client: Client = clientCache[invoice.clientId]
  const project: Project = projectCache[invoice.projectId]
  return (
    <div style={style}>
      <Card
        className={clsx('card', classes.card)}
        onClick={() => onClick(invoice)}>
        <div className={classes.imgWrapper}>
          {!!(client && client.logo) && (
            <img className={'coverImage'} src={client.logo} alt='Logo' />
          )}
        </div>
        <div className={classes.textWrapper}>
          <Typography className={classes.bodyText} variant='subtitle1'>
            {project.campaignName}
          </Typography>
          <div className={'row'}>
            <InvoiceStatusIndicator
              status={invoice.status}
              style={{ marginRight: 10 }}
            />
            <Typography variant={'caption'} className={'metaText'}>
              {invoice.status}
            </Typography>
          </div>
        </div>
      </Card>
    </div>
  )
}
const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(2)}px`,
    minWidth: 250,
    background: theme.palette.background.secondary,
    borderRadius: 10,
    cursor: 'pointer'
  },
  imgWrapper: {
    backgroundColor: theme.palette.common.white,
    borderRadius: 10,
    marginRight: theme.spacing(1),
    width: 60,
    height: 60,
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center'
  },
  bodyText: {
    fontWeight: 'bold',
    color: theme.palette.text.background,
    marginBottom: 2
  },
  textWrapper: {
    marginLeft: theme.spacing(1)
  },
  bottomText: {
    fontWeight: 'bold',
    color: theme.palette.text.meta
  }
}))
export default UnpaidInvoices
