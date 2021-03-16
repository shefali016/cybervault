import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { ReduxState } from 'reducers/rootReducer'
import { StripeInvoice } from 'utils/Interface'
import { BillingHistory } from 'components/Billing'
import { getCustomerInvoices } from 'actions/stripeActions'

type StateProps = {
  billingHistory: Array<StripeInvoice> | null
  billingHistoryLoading: boolean
}

type DispatchProps = { loadBillingHistory: () => void }

type Props = {
  history: any
} & StateProps &
  DispatchProps

const BillingHistoryScreen = ({
  loadBillingHistory,
  billingHistory,
  billingHistoryLoading
}: Props) => {
  useEffect(() => {
    loadBillingHistory()
  }, [])

  return (
    <div className={'screenContainer'}>
      <div className={'screenInner'}>
        <div className={'responsivePadding'}>
          <BillingHistory
            invoices={billingHistory}
            loading={billingHistoryLoading}
          />
        </div>
      </div>
    </div>
  )
}

const mapState = (state: ReduxState): StateProps => ({
  billingHistory: state.stripe.billingHistory as Array<StripeInvoice> | null,
  billingHistoryLoading: state.stripe.billingHistoryLoading as boolean
})

const mapDispatch = (dispatch: any) => ({
  loadBillingHistory: () => dispatch(getCustomerInvoices())
})

export default connect(mapState, mapDispatch)(BillingHistoryScreen)
