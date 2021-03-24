import React, { useMemo } from 'react'
import { Invoice, Row, StripeInvoice } from 'utils/Interface'
import InvoiceIcon from '@material-ui/icons/Receipt'
import { AppTable } from 'components/Common/Core/AppTable'
import { InvoiceStatusIndicator } from '../Invoices/InvoiceStatusIndicator'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import moment from 'moment'
import { AppLoader } from 'components/Common/Core/AppLoader'
import { isWidthDown, withWidth } from '@material-ui/core'

const headerCells = [
  { title: 'Date', key: 'date' },
  { title: 'Number', key: 'number' },
  { title: 'Amount', key: 'amount' },
  { title: 'Paid', key: 'paid' }
]

const mobileHeaderCells = [
  { title: 'Date', key: 'date' },
  { title: 'Amount', key: 'amount' },
  { title: 'Status', key: 'paid' }
]

type Props = {
  invoices: Array<Invoice> | any
  className?: string
  isBilling?: boolean
  loading?: boolean
  width: any
}

const BillingHistory = ({ invoices, className, loading, width }: Props) => {
  const classes = useStyles()
  const theme = useTheme()

  const handleRowClick = () => {}

  const isMobile = isWidthDown('sm', width)

  const rows: Array<Row> = useMemo(() => {
    if (!(invoices && invoices.length)) {
      return []
    }
    return invoices.map((inv: StripeInvoice | any) => {
      const dateCell = {
        title: `${moment(inv.created * 1000).format('YYYY-MM-DD')}`,
        key: `${inv.id}date`
      }
      const numberCell = {
        title: inv.number,
        key: `${inv.id}number`
      }
      const amountCell = {
        title: `$${(inv.amount_paid / 100).toFixed(2)}`,
        key: `${inv.id}amountPaid`
      }
      const statusCell = {
        renderer: () => (
          <div
            style={{
              display: 'flex',
              alignItems: 'center'
            }}>
            <InvoiceStatusIndicator
              status={inv.status}
              className={classes.status}
              style={isMobile ? { marginLeft: 15 } : {}}
            />
            {isMobile ? '' : inv.status}
          </div>
        ),
        key: `${inv.id}status`
      }

      const row = {
        row: isMobile
          ? [dateCell, amountCell, statusCell]
          : [dateCell, numberCell, amountCell, statusCell],
        key: `${inv.id}`
      }

      return row
    })
  }, [invoices, width])

  return (
    <AppTable
      rows={rows}
      headerCells={isMobile ? mobileHeaderCells : headerCells}
      className={className}
      emptyProps={{ Icon: InvoiceIcon, title: 'You have not been charged' }}
      handleRowClick={handleRowClick}
      loading={loading}
    />
  )
}

const useStyles = makeStyles((theme) => ({
  status: { marginRight: theme.spacing(1.5) }
}))

export default withWidth()(BillingHistory)
