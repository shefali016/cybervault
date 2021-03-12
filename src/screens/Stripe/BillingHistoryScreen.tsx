import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { ReduxState } from 'reducers/rootReducer'
import { getCustomerInvoices } from 'actions/stripeActions'
import { InvoicesTable } from 'components/Invoices/InvoicesTable'
import { Invoice } from 'utils/Interface'

type StateProps = {
  billingHistory: Array<Invoice>
  billingHistoryLoading: boolean
}

type Props = {
  history: any
} & StateProps

const BillingHistoryScreen = ({
  billingHistory,
  billingHistoryLoading,
  history
}: Props) => {
  return (
    <div className={'dashboardScreen'}>
      <InvoicesTable
        invoices={billingHistory}
        tableContainerClassName={''}
        history={history}
        accountId={'account.id'}
        isBilling={true}
        billingHistoryLoading={billingHistoryLoading}
      />
    </div>
  )
}

const mapState = (state: ReduxState): StateProps => ({
  billingHistory: state.stripe.billingHistory as Array<Invoice>,
  billingHistoryLoading: state.stripe.billingHistoryLoading as boolean
})

export default connect(mapState)(BillingHistoryScreen)
