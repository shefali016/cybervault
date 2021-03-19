import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { ReduxState } from 'reducers/rootReducer'
import { StripeInvoice } from 'utils/Interface'
import BillingHistory from 'components/Billing'
import { getCustomerInvoices } from 'actions/stripeActions'
import { Typography } from '@material-ui/core'
import clsx from 'clsx'

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
          <div className={'tableContainer'}>
            <Typography variant={'h5'} className={'tableHeader'}>
              Billing History
            </Typography>
            <BillingHistory
              invoices={billingHistory}
              loading={billingHistoryLoading}
              tableContainerClassName={'table'}
            />
          </div>
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
