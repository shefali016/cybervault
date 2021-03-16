import React, { useMemo } from 'react'
import { Invoice, Row, StripeInvoice } from 'utils/Interface'
import InvoiceIcon from '@material-ui/icons/Receipt'
import { AppTable } from 'components/Common/Core/AppTable'
import { InvoiceStatusIndicator } from '../Invoices/InvoiceStatusIndicator'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import moment from 'moment'
import { AppLoader } from 'components/Common/Core/AppLoader'

const headerCells = [
  { title: 'Project Name', key: 'name' },
  { title: 'Amount', key: 'amount' },
  { title: 'Date', key: 'date' },
  { title: 'Status', key: 'status' }
]

const billingHeaderCells = [
  { title: 'Date', key: 'date' },
  { title: 'Item', key: 'item' },
  { title: 'Amount', key: 'amount' },
  { title: 'Paid', key: 'paid' }
]

type Props = {
  invoices: Array<Invoice> | any
  tableContainerClassName?: string
  isBilling?: boolean
  loading?: boolean
}

export const BillingHistory = ({
  invoices,
  tableContainerClassName,
  loading
}: Props) => {
  const classes = useStyles()
  const theme = useTheme()

  const handleRowClick = () => {}

  const rows = useMemo(() => {
    let rows: Array<Row> = []
    invoices &&
      invoices.length &&
      invoices.forEach((inv: StripeInvoice | any) => {
        const data = inv?.lines?.data
        const type = data && data.length ? data[0].metadata.type : null
        const billType: any = type
        !loading
          ? rows.push({
              row: [
                {
                  title: `${moment(inv.created * 1000).format('YYYY-MM-DD')}`,
                  key: `${inv.id}date`
                },
                {
                  title: billType ? billType : 'Subscription',
                  key: `${inv.id}item`
                },
                {
                  title: `$${(inv.amount_paid / 100).toFixed(2)}`,
                  key: `${inv.id}amountPaid`
                },
                {
                  renderer: () => (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <InvoiceStatusIndicator
                        status={inv.status}
                        className={classes.status}
                      />
                      {inv.status}
                    </div>
                  ),
                  key: `${inv.id}status`
                }
              ],
              key: `${inv.id}`
            })
          : rows.push({
              row: [
                {
                  renderer: () => (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <AppLoader color={theme.palette.primary.main} />
                      {inv.status}
                    </div>
                  ),
                  key: `${inv.id}loading`
                }
              ],
              key: `${inv.id}`
            })
      })

    return rows
  }, [invoices])

  return (
    <AppTable
      rows={rows}
      headerCells={billingHeaderCells}
      tableContainerClassName={tableContainerClassName}
      emptyProps={{ Icon: InvoiceIcon, title: 'No invoices' }}
      handleRowClick={handleRowClick}
    />
  )
}

const useStyles = makeStyles((theme) => ({
  status: { marginRight: theme.spacing(1.5) }
}))
