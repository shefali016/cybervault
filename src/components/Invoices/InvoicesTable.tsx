import React, { useMemo } from 'react'
import { Invoice, Row } from 'utils/Interface'
import InvoiceIcon from '@material-ui/icons/Receipt'
import { AppTable } from 'components/Common/Core/AppTable'
import { InvoiceStatusIndicator } from './InvoiceStatusIndicator'
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'

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
  history: any
  accountId: string
  isBilling?: boolean
}

export const InvoicesTable = ({
  invoices,
  tableContainerClassName,
  history,
  accountId,
  isBilling
}: Props) => {
  const classes = useStyles()

  const handleRowClick = (data: string) => {
    history.push(`/clientInvoices/${accountId}/${data}`)
  }

  const rows = useMemo(() => {
    let rows: Array<Row> = []

    invoices &&
      invoices.length &&
      invoices.forEach((inv: Invoice | any) => {
        !isBilling
          ? rows.push({
              row: [
                { title: inv.projectName, key: `${inv.id}projectName` },
                { title: `${inv.price}`, key: `${inv.id}price` },
                { title: `${inv.dateCreated}`, key: `${inv.id}date` },
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
                  title: `${moment(new Date(inv.period_start)).format(
                    'MM/DD/YYYY'
                  )}`,
                  key: `${inv.id}date`
                },
                { title: `item`, key: `${inv.id}item` },
                { title: `${inv.amount_paid}`, key: `${inv.id}amountPaid` },
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
      })

    return rows
  }, [invoices])

  return (
    <AppTable
      rows={rows}
      headerCells={!isBilling ? headerCells : billingHeaderCells}
      tableContainerClassName={tableContainerClassName}
      emptyProps={{ Icon: InvoiceIcon, title: 'No invoices' }}
      handleRowClick={handleRowClick}
    />
  )
}

const useStyles = makeStyles((theme) => ({
  status: { marginRight: theme.spacing(1.5) }
}))
