import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { ReduxState } from 'reducers/rootReducer'
import { getCustomerInvoices } from 'actions/stripeActions'
import { InvoicesTable } from 'components/Invoices/InvoicesTable'
import { Invoice } from 'utils/Interface'

type StateProps = {
  billingHistory: Array<Invoice>
}

type Props = {
  getCustomerInvoices: () => void
} & StateProps

const BillingHistoryScreen = ({
  getCustomerInvoices,
  billingHistory
}: Props) => {
  useEffect(() => {
    getCustomerInvoices()
  }, [])
  return (
    <div className={'dashboardScreen'}>
      <InvoicesTable
        invoices={billingHistory}
        tableContainerClassName={''}
        history={'history'}
        accountId={'account.id'}
        isBilling={true}
      />
    </div>
  )
}

const mapState = (state: ReduxState): StateProps => ({
  billingHistory: state.stripe.billingHistory as Array<Invoice>
})

const mapDispatch = (dispatch: any): any => ({
  getCustomerInvoices: () => dispatch(getCustomerInvoices())
})

export default connect(mapState, mapDispatch)(BillingHistoryScreen)
