import React from 'react'
import { connect } from 'react-redux'
import { ReduxState } from 'reducers/rootReducer'
import { StripeInvoice } from 'utils/Interface'
import { BillingHistory } from 'components/Billing'

type StateProps = {
  billingHistory: Array<StripeInvoice> | null
  billingHistoryLoading: boolean
}

type Props = {
  history: any
} & StateProps

const BillingHistoryScreen = ({
  billingHistory,
  billingHistoryLoading
}: Props) => {
  console.log('################')

  return (
    <div className={'dashboardScreen'}>
      <BillingHistory
        invoices={billingHistory}
        isBilling={true}
        billingHistoryLoading={billingHistoryLoading}
      />
    </div>
  )
}

const mapState = (state: ReduxState): StateProps => ({
  billingHistory: state.stripe.billingHistory as Array<StripeInvoice> | null,
  billingHistoryLoading: state.stripe.billingHistoryLoading as boolean
})

export default connect(mapState)(BillingHistoryScreen)
