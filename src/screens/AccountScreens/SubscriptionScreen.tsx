import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { ReduxState } from 'reducers/rootReducer'
import Section from 'components/Common/Section'
import { Typography } from '@material-ui/core'
import { Account, User, SubscriptionType, StripePlans } from 'utils/Interface'
import { getSubscriptionDetails, getSubscriptionType } from 'utils/subscription'
import RightArrow from '@material-ui/icons/ArrowForwardIos'
import { ResponsiveRow } from 'components/ResponsiveRow'
import { GradiantButton } from 'components/Common/Button/GradiantButton'
import { SubscriptionModal } from 'components/Subscription/SubscriptionModal'
import { StorageModal } from 'components/Storage/StorageModal'
import { CardModal } from 'components/Stripe/CardModal'
import {
  cancelPlanSubscription,
  createAmountSubscription,
  getStripPlanList,
  planSubscription,
  requestPaymentMethods,
  updatePlanSubscription
} from 'actions/stripeActions'
import { PaymentMethod } from '@stripe/stripe-js'
import { PaymentMethodInline } from 'components/Stripe/PaymentMethodInline'
import { SubscriptionTypes } from 'utils/enums'
import moment from 'moment'

type StateProps = {
  account: Account
  user: User
  paymentMethods: Array<PaymentMethod>
  customerId: string
  subscription: any
  subscriptionLoading: boolean
  extraStorage: number
  subscriptionPlans: Array<StripePlans> | null
}
type DispatchProps = {
  getPaymentMethods: (customerId: string) => void
  planSubscription: (
    planId: string,
    paymentMethodId: string,
    type: SubscriptionType
  ) => void
  cancelSubscription: (subscriptionId: string) => void
  updateSubscription: (
    subscriptionId: string,
    planId: string,
    type: SubscriptionType
  ) => void
  createAmountSubscription: (
    price: number,
    paymentMethodId: string,
    extraStorage: number
  ) => void
  getPlanList: () => void
}
type ReduxProps = StateProps & DispatchProps
type Props = { history: any }

const SubscriptionScreen = ({
  account,
  user,
  getPaymentMethods,
  paymentMethods,
  history,
  customerId,
  planSubscription,
  subscription,
  cancelSubscription,
  updateSubscription,
  createAmountSubscription,
  extraStorage,
  getPlanList,
  subscriptionPlans,
  subscriptionLoading
}: Props & ReduxProps) => {
  const classes = useStyles()

  useEffect(() => {
    getPaymentMethods(user.customerId)
    getPlanList()
  }, [])

  const [subscriptionModalOpen, setSubscriptionModalOpen] = useState<boolean>(
    false
  )
  const [storageModalOpen, setStorageModalOpen] = useState<boolean>(false)

  const openSubscriptionModal = () => setSubscriptionModalOpen(true)
  const closeSubscriptionModal = () => setSubscriptionModalOpen(false)

  const openStorageModal = () => setStorageModalOpen(true)
  const closeStorageModal = () => setStorageModalOpen(false)

  const [cardModalOpen, setCardModalOpen] = useState(false)

  const toggleCardModal = (open: boolean) => () => setCardModalOpen(open)

  const navigateToPaymentMethodsScreen = () => history.push('paymentmethods')

  return (
    <div className={clsx('container', classes.container)}>
      <SubscriptionModal
        loading={subscriptionLoading}
        open={subscriptionModalOpen}
        onRequestClose={closeSubscriptionModal}
        activeSubscriptionType={
          subscription ? subscription.metadata.type : SubscriptionTypes.CREATOR
        }
        customerId={customerId}
        paymentMethods={paymentMethods}
        planSubscription={planSubscription}
        subscription={subscription}
        planList={subscriptionPlans}
        cancelSubscription={cancelSubscription}
        updateSubscription={updateSubscription}
      />

      <StorageModal
        open={storageModalOpen}
        onRequestClose={closeStorageModal}
        account={account}
        subscription={subscription}
        paymentMethods={paymentMethods}
        customerId={customerId}
        createAmountSubscription={createAmountSubscription}
        userExtraStorage={extraStorage}
      />

      <CardModal
        open={cardModalOpen}
        onRequestClose={toggleCardModal(false)}
        customerId={user.customerId}
      />

      <Section title={'Your Plan'} className={classes.section}>
        <div className={classes.sectionInner}>
          <div className={classes.sectionTextArea}>
            <ResponsiveRow>
              {[
                <div style={{ flex: 1 }}>
                  <Typography variant='subtitle1'>
                    {!!subscription
                      ? `${
                          getSubscriptionDetails(
                            getSubscriptionType(subscription)
                          ).name
                        } Plan`
                      : 'Unsubscribed'}
                  </Typography>
                  <Typography variant='caption'>
                    {!!subscription
                      ? subscription.cancel_at_period_end
                        ? `Your subscription ends ${moment(
                            subscription.cancel_at * 1000
                          ).format('YYYY-MM-DD')}`
                        : `Your subscription renews on ${moment(
                            subscription.current_period_end * 1000
                          ).format('YYYY-MM-DD')}` // @todo connect to real renewal date
                      : 'Subscribe to benefit from the full features of Creator Cloud'}
                  </Typography>
                </div>,
                <GradiantButton onClick={openSubscriptionModal}>
                  <div className={'row'}>
                    <Typography style={{ marginRight: 5 }}>
                      Manage Plan
                    </Typography>
                  </div>
                </GradiantButton>
              ]}
            </ResponsiveRow>
          </div>
        </div>
      </Section>

      <Section title={'Storage'} className={classes.section}>
        <div className={classes.sectionInner}>
          <div className={classes.sectionTextArea}>
            <ResponsiveRow>
              {[
                <div style={{ flex: 1 }}>
                  <Typography variant='subtitle1'>Your Storage</Typography>
                  <Typography variant='caption'>
                    Viewers can also download a previewed watermarked version
                  </Typography>
                </div>,
                <GradiantButton onClick={openStorageModal}>
                  <div className={'row'}>
                    <Typography style={{ marginRight: 5 }}>
                      Manage Storage
                    </Typography>
                  </div>
                </GradiantButton>
              ]}
            </ResponsiveRow>
          </div>
        </div>
      </Section>

      <Section title={'Payment Details'} className={classes.section}>
        <div className={classes.sectionInner}>
          <div className={classes.sectionTextArea}>
            <ResponsiveRow>
              {[
                <div style={{ flex: 1 }}>
                  {paymentMethods && !!paymentMethods.length ? (
                    <div className={'row'}>
                      <PaymentMethodInline paymentMethod={paymentMethods[0]} />
                    </div>
                  ) : (
                    <Typography variant='subtitle1'>
                      You haven't added a payment method
                    </Typography>
                  )}
                </div>,
                <div className={'row'}>
                  <GradiantButton onClick={toggleCardModal(true)}>
                    <div className={'row'}>
                      <Typography style={{ marginRight: 5 }}>
                        Add Method
                      </Typography>
                    </div>
                  </GradiantButton>
                  {paymentMethods && !!paymentMethods.length && (
                    <GradiantButton
                      onClick={navigateToPaymentMethodsScreen}
                      style={{ marginLeft: 15 }}>
                      <div className={'row'}>
                        <Typography style={{ marginRight: 5 }}>
                          Manage Cards
                        </Typography>
                        <RightArrow style={{ fontSize: 15 }} />
                      </div>
                    </GradiantButton>
                  )}
                </div>
              ]}
            </ResponsiveRow>
          </div>
        </div>
      </Section>

      <Section title={'Billing History'} className={classes.section}>
        <div className={classes.sectionInner}>
          <div className={classes.sectionTextArea}>
            <ResponsiveRow>
              {[
                <div style={{ flex: 1 }}>
                  {false ? (
                    <div></div> // @todo fetch most recent billing history item
                  ) : (
                    <Typography variant='subtitle1'>
                      You are not subscribed
                    </Typography>
                  )}
                </div>,
                <GradiantButton>
                  <div className={'row'}>
                    <Typography style={{ marginRight: 5 }}>
                      View History
                    </Typography>
                    <RightArrow style={{ fontSize: 15 }} />
                  </div>
                </GradiantButton>
              ]}
            </ResponsiveRow>
          </div>
        </div>
      </Section>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    color: theme.palette.text.background,
    alignItems: 'center',
    paddingBottom: theme.spacing(6),
    justifyContent: 'center',
    width: '100%'
  },
  sectionInner: {
    background: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    padding: '15px 25px',
    color: theme.palette.text.paper,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  sectionTextArea: {
    flex: 1
  },
  section: {
    marginBottom: theme.spacing(4)
  },
  saveButton: {
    marginTop: theme.spacing(5),
    paddingTop: 10,
    paddingBottom: 10,
    minWidth: 150
  }
}))

const mapState = (state: ReduxState): StateProps => ({
  account: state.auth.account as Account,
  user: state.auth.user as User,
  paymentMethods: state.stripe.paymentMethods,
  customerId: state.stripe.customer.id as string,
  subscription: state.stripe.activeSubscription,
  subscriptionLoading: state.stripe.subscriptionLoading,
  extraStorage: state.auth.user?.extraStorage as number,
  subscriptionPlans: state.stripe.subscriptionPlans as Array<StripePlans> | null
})

const mapDispatch = (dispatch: any): DispatchProps => ({
  getPaymentMethods: (customerId: string) =>
    dispatch(requestPaymentMethods(customerId)),
  planSubscription: (
    planId: string,
    paymentMethodId: string,
    type: SubscriptionType
  ) => dispatch(planSubscription(planId, paymentMethodId, type)),
  cancelSubscription: (subscriptionId: string) =>
    dispatch(cancelPlanSubscription(subscriptionId)),
  updateSubscription: (
    subscriptionId: string,
    planId: string,
    type: SubscriptionType
  ) => dispatch(updatePlanSubscription(subscriptionId, planId, type)),
  createAmountSubscription: (
    price: number,
    paymentMethodId: string,
    extraStorage: number
  ) => dispatch(createAmountSubscription(price, paymentMethodId, extraStorage)),
  getPlanList: () => dispatch(getStripPlanList())
})

export default connect(mapState, mapDispatch)(SubscriptionScreen)
