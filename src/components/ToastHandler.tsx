import { ToastContext, ToastTypes } from 'context/Toast'
import React from 'react'
import { connect } from 'react-redux'
import { ReduxState } from 'reducers/rootReducer'
import { State as StripeState } from 'reducers/stripeReducer'
import { State as AuthState } from 'reducers/authReducer'
import { createSelector } from 'reselect'

type ToastState = { error?: string | false; success?: string | false }

type Props = {
  toastState: Array<ToastState>
}

class ToastHandler extends React.Component<Props> {
  static contextType = ToastContext

  componentDidUpdate(prevProps: Props) {
    const currentToastState = this.props.toastState
    const prevToastState = prevProps.toastState

    currentToastState.forEach((state: ToastState, index: number) => {
      const { error, success } = state
      const { error: prevError, success: prevSuccess } = prevToastState[index]

      if (!prevError && error) {
        this.context.showToast({ title: error, type: ToastTypes.error })
      }

      if (!prevSuccess && success) {
        this.context.showToast({ title: success, type: ToastTypes.success })
      }
    })
  }

  render() {
    return null
  }
}

const mapState = (state: ReduxState): Props => ({
  toastState: toastSelector(state)
})

export default connect(mapState)(ToastHandler)

const stripeState = (state: ReduxState) => state.stripe
const authState = (state: ReduxState) => state.auth
const portfolioState = (state: ReduxState) => state.portfolio
const clientsState = (state: ReduxState) => state.clients

const toastSelector = createSelector<ReduxState, any, Array<ToastState>>(
  [stripeState, authState, portfolioState, clientsState],
  (stripe, auth, portfolio, clients) => {
    const stripeToasts = [
      {
        error:
          !!stripe.cancelSubscriptionError &&
          'Failed to cancel subscription. Please try again or contact support.',
        success: !!stripe.cancelSubscriptionSuccess && 'Subscription canceled'
      },
      {
        error:
          !!stripe.planSubscriptionError &&
          'Failed to start your subscription. Please try again or contact support.',
        success:
          !!stripe.planSubscriptionSuccess && 'Your subscription has started!'
      },
      {
        error:
          !!stripe.updateSubscriptionError &&
          'Failed to update subscription. Please try again or contact support.',
        success:
          !!stripe.updateSubscriptionSuccess &&
          'Your subscription has be updated'
      },
      {
        error:
          !!stripe.storagePurchaseError &&
          'Failed to purchase extra storage. Please try again or contact support.',
        success:
          !!stripe.storagePurchaseSuccess &&
          'Extra storage has be added to your account!'
      }
    ]

    const authToasts = [
      { error: auth.signUpError },
      {
        error:
          !!auth.changePasswordError &&
          'Failed to change password. Please try again or contact support.',
        success:
          !!auth.changePasswordSuccess && 'Your password has been updated.'
      }
    ]

    const portfolioToasts = [
      {
        error:
          !!portfolio.updatePortfolioError &&
          'Failed to create porfolio. Please try again or contact support.'
      },
      {
        error:
          !!portfolio.sharePortfolioError &&
          'Failed to share portfolio. Please try again or contact support.',
        success:
          !!portfolio.sharePortfolioSuccess &&
          "Your portfolio has been shared. You will be notified when it's viewed"
      }
    ]

    const clientsToasts = [
      {
        error:
          !!clients.newClientError &&
          'Failed to add client. Please try again or contact support.',
        success: !!clients.newClientSuccess && 'Client has been added.'
      }
    ]

    return [
      ...stripeToasts,
      ...authToasts,
      ...portfolioToasts,
      ...clientsToasts
    ]
  }
)
