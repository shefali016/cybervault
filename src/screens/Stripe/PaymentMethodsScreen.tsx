import React from 'react'
import { PaymentMethod } from '@stripe/stripe-js'
import { connect } from 'react-redux'
import { ReduxState } from 'reducers/rootReducer'
import { PaymentMethodList } from 'components/Stripe/PaymentMethodList'
import { User } from 'utils/Interface'

type StateProps = {
  paymentMethods: Array<PaymentMethod>
  user: User
}

type Props = StateProps

const PaymentMethodScreen = ({ paymentMethods, user }: Props) => {
  return (
    <div className={'dashboardScreen'}>
      <PaymentMethodList
        paymentMethods={paymentMethods}
        customerId={user.customerId}
      />
    </div>
  )
}

const mapState = (state: ReduxState): StateProps => ({
  paymentMethods: state.stripe.paymentMethods,
  user: state.auth.user as User
})

export default connect(mapState)(PaymentMethodScreen)
