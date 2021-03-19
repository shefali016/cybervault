import React from 'react'
import { PaymentMethod } from '@stripe/stripe-js'
import { connect } from 'react-redux'
import { ReduxState } from 'reducers/rootReducer'
import { PaymentMethodList } from 'components/Stripe/PaymentMethodList'
import { User } from 'utils/Interface'

type StateProps = {
  paymentMethods: Array<PaymentMethod>
  user: User
  defaultPaymentMethod: string | undefined
  setAsDefaultLoadingId: string | null
}

type Props = StateProps

const PaymentMethodScreen = ({
  paymentMethods,
  user,
  defaultPaymentMethod,
  setAsDefaultLoadingId
}: Props) => {
  return (
    <div className={'dashboardScreen'}>
      <PaymentMethodList
        paymentMethods={paymentMethods}
        customerId={user.customerId}
        defaultPaymentMethod={defaultPaymentMethod}
        setAsDefaultLoadingId={setAsDefaultLoadingId}
      />
    </div>
  )
}

const mapState = (state: ReduxState): StateProps => ({
  paymentMethods: state.stripe.paymentMethods,
  user: state.auth.user as User,
  defaultPaymentMethod: state.stripe.customer.invoice_settings
    .default_payment_method as string | undefined,
  setAsDefaultLoadingId: state.stripe.setAsDefaultLoadingId
})

export default connect(mapState)(PaymentMethodScreen)
