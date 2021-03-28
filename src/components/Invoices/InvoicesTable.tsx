import React, { useMemo } from 'react'
import { Invoice, Row } from 'utils/Interface'
import InvoiceIcon from '@material-ui/icons/Receipt'
import { AppTable } from 'components/Common/Core/AppTable'
import { InvoiceStatusIndicator } from './InvoiceStatusIndicator'
import { makeStyles } from '@material-ui/core/styles'

const headerCells = [
  { title: 'Project Name', key: 'name' },
  { title: 'Amount', key: 'amount' },
  { title: 'Date', key: 'date' },
  { title: 'Status', key: 'status' }
]

type Props = {
  invoices: Array<Invoice>
  className?: string
  history: any
  accountId: string
}

export const InvoicesTable = ({
  invoices,
  className,
  history,
  accountId
}: Props) => {
  const classes = useStyles()

  const handleRowClick = (data: string) => {
    history.push(`/clientInvoices/${data}/${accountId}`)
  }

  const rows = useMemo(() => {
    let rows: Array<Row> = []
    invoices &&
      invoices.length &&
      invoices.forEach((inv: Invoice) => {
        rows.push({
          row: [
            { title: inv.projectName, key: `${inv.id}projectName` },
            { title: `${inv.price}`, key: `${inv.id}price` },
            { title: `${inv.dateCreated}`, key: `${inv.id}date` },
            {
              renderer: () => (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                  <InvoiceStatusIndicator
                    status={inv.status}
                    style={{ marginRight: 15 }}
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
      headerCells={headerCells}
      className={className}
      emptyProps={{ Icon: InvoiceIcon, title: 'No invoices' }}
      handleRowClick={handleRowClick}
    />
  )
}

const useStyles = makeStyles((theme) => ({
  status: { marginRight: theme.spacing(1) }
}))
