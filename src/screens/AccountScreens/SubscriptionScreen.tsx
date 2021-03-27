import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { ReduxState } from 'reducers/rootReducer'
import Section from 'components/Common/Section'
import { Typography } from '@material-ui/core'
import {
  Account,
  User,
  SubscriptionType,
  StripePlans,
  Product,
  Invoice,
  Asset
} from 'utils/Interface'
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
  getCustomerInvoices,
  getStripPlanList,
  planSubscription,
  requestPaymentMethods,
  updatePlanSubscription
} from 'actions/stripeActions'
import { PaymentMethod } from '@stripe/stripe-js'
import { PaymentMethodInline } from 'components/Stripe/PaymentMethodInline'
import { SubscriptionTypes } from 'utils/enums'
import moment from 'moment'
import { deleteAssetRequest, getAssetListRequest } from 'actions/projectActions'

type StateProps = {
  account: Account
  user: User
  paymentMethods: Array<PaymentMethod>
  customerId: string
  accountSubscription: any
  storageSubscription: any
  subscriptionLoading: boolean
  subscriptionPlans: Array<StripePlans> | null
  storagePurchaseLoading: boolean
  billingHistory: Array<Invoice> | any
  usedStorage: number
  assetList: Array<Asset>
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
    extraStorage: number,
    productId: string
  ) => void
  getPlanList: () => void
  getCustomerInvoices: () => void
  getAllAssetData: () => void
  deleteAssetData: (assetId: string) => void
}
type ReduxProps = StateProps & DispatchProps
type Props = { history: any; location: any }

const SubscriptionScreen = ({
  account,
  user,
  getPaymentMethods,
  paymentMethods,
  history,
  location,
  customerId,
  planSubscription,
  accountSubscription,
  storageSubscription,
  cancelSubscription,
  updateSubscription,
  createAmountSubscription,
  getPlanList,
  subscriptionPlans,
  subscriptionLoading,
  storagePurchaseLoading,
  getCustomerInvoices,
  billingHistory,
  usedStorage,
  getAllAssetData,
  assetList,
  deleteAssetData
}: Props & ReduxProps) => {
  const classes = useStyles()

  useEffect(() => {
    getPaymentMethods(user.customerId)
    getPlanList()
    getCustomerInvoices()
  }, [])

  const [subscriptionModalOpen, setSubscriptionModalOpen] = useState<boolean>(
    !!location.state?.params?.isSubscribing
  )
  const [storageModalOpen, setStorageModalOpen] = useState<boolean>(false)
  const [storageProduct, setStorageProduct] = useState<Product | any>({})

  const openSubscriptionModal = () => setSubscriptionModalOpen(true)
  const closeSubscriptionModal = () => setSubscriptionModalOpen(false)

  const openStorageModal = () => setStorageModalOpen(true)
  const closeStorageModal = () => setStorageModalOpen(false)

  const [cardModalOpen, setCardModalOpen] = useState(false)

  const toggleCardModal = (open: boolean) => () => setCardModalOpen(open)

  const navigateToPaymentMethodsScreen = () => history.push('paymentmethods')
  const navigateToBillingHistoryScreen = () => history.push('billing')

  return (
    <div className={'screenContainer'}>
      <div className={'screenInner'}>
        <div className='responsivePadding'>
          <SubscriptionModal
            loading={subscriptionLoading}
            open={subscriptionModalOpen}
            onRequestClose={closeSubscriptionModal}
            activeSubscriptionType={
              accountSubscription
                ? accountSubscription.metadata.type
                : SubscriptionTypes.CREATOR
            }
            customerId={customerId}
            paymentMethods={paymentMethods}
            planSubscription={planSubscription}
            setStorageProduct={setStorageProduct}
            subscription={accountSubscription}
            planList={subscriptionPlans}
            cancelSubscription={cancelSubscription}
            updateSubscription={updateSubscription}
          />

          <StorageModal
            open={storageModalOpen}
            onRequestClose={closeStorageModal}
            account={account}
            storageSubscription={storageSubscription}
            accountSubscription={accountSubscription}
            paymentMethods={paymentMethods}
            customerId={customerId}
            createAmountSubscription={createAmountSubscription}
            storageProduct={storageProduct}
            storagePurchaseLoading={storagePurchaseLoading}
            usedStorage={usedStorage}
          />

          <CardModal
            open={cardModalOpen}
            onRequestClose={toggleCardModal(false)}
            customerId={user.customerId}
          />

          <Section title={'Your Plan'} className={'section'}>
            <div className={'sectionInner'}>
              <div className={'sectionTextArea'}>
                <ResponsiveRow>
                  {[
                    <div style={{ flex: 1 }}>
                      <Typography variant='body1'>
                        {!!accountSubscription
                          ? `${
                              getSubscriptionDetails(
                                getSubscriptionType(accountSubscription)
                              ).name
                            } Plan`
                          : 'Unsubscribed'}
                      </Typography>
                      <Typography variant='caption'>
                        {!!accountSubscription
                          ? accountSubscription.cancel_at_period_end
                            ? `Your subscription ends ${moment(
                                accountSubscription.cancel_at * 1000
                              ).format('YYYY-MM-DD')}`
                            : `Your subscription renews on ${moment(
                                accountSubscription.current_period_end * 1000
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

          <Section title={'Storage'} className={'section'}>
            <div className={'sectionInner'}>
              <div className={'sectionTextArea'}>
                <ResponsiveRow>
                  {[
                    <div style={{ flex: 1 }}>
                      <Typography variant='body1'>Your Storage</Typography>
                      <Typography variant='caption'>
                        Add storage to account to upload more content
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

          <Section title={'Payment Details'} className={'section'}>
            <div className={'sectionInner'}>
              <div className={'sectionTextArea'}>
                <ResponsiveRow>
                  {[
                    <div style={{ flex: 1 }}>
                      {paymentMethods && !!paymentMethods.length ? (
                        <div className={'row'}>
                          <PaymentMethodInline
                            paymentMethod={paymentMethods[0]}
                          />
                        </div>
                      ) : (
                        <Typography variant='body1'>
                          You haven't added a payment method
                        </Typography>
                      )}
                    </div>,
                    <div className={'responsiveRow'}>
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
                          className={classes.manageCardsButton}>
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

          <Section title={'Billing History'} className={'section'}>
            <div className={'sectionInner'}>
              <div className={'sectionTextArea'}>
                <ResponsiveRow>
                  {[
                    <div style={{ flex: 1 }}>
                      {!!accountSubscription ? (
                        <div>
                          <Typography variant='body1'>Most Recent</Typography>
                          {billingHistory && billingHistory.length ? (
                            <Typography variant='caption'>
                              <div style={{ flex: 1 }}>
                                <Typography
                                  style={{ marginRight: 20 }}
                                  variant='caption'>
                                  Date:{' '}
                                  {new Date(
                                    billingHistory[0].created * 1000
                                  ).toDateString()}
                                </Typography>
                                <Typography
                                  style={{ marginRight: 20 }}
                                  variant='caption'>
                                  Item Type:{' '}
                                  {
                                    billingHistory[0].lines.data[0].metadata
                                      .type
                                  }
                                </Typography>
                                <Typography
                                  style={{ marginRight: 20 }}
                                  variant='caption'>
                                  Amount: ${billingHistory[0].amount_paid / 100}
                                </Typography>
                              </div>
                            </Typography>
                          ) : (
                            <Typography variant='caption'>
                              No recent charges
                            </Typography>
                          )}
                        </div> // @todo fetch most recent billing history item
                      ) : (
                        <Typography variant='subtitle1'>
                          You are not subscribed
                        </Typography>
                      )}
                    </div>,
                    <GradiantButton
                      onClick={navigateToBillingHistoryScreen}
                      disabled={!accountSubscription}>
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
      </div>
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
  },
  manageCardsButton: {
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      marginTop: theme.spacing(2)
    }
  }
}))

const mapState = (state: ReduxState): StateProps => ({
  account: state.auth.account as Account,
  user: state.auth.user as User,
  paymentMethods: state.stripe.paymentMethods,
  customerId: state.stripe.customer?.id as string,
  accountSubscription: state.stripe.accountSubscription,
  storageSubscription: state.stripe.storageSubscription,
  subscriptionLoading: state.stripe.subscriptionLoading,
  subscriptionPlans: state.stripe
    .subscriptionPlans as Array<StripePlans> | null,
  storagePurchaseLoading: state.stripe.storagePurchaseLoading,
  billingHistory: state.stripe.billingHistory as Array<Invoice>,
  usedStorage: state.auth.usedStorage as number,
  assetList: state.project.allAssetList as Array<Asset>
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
    extraStorage: number,
    productId: string
  ) =>
    dispatch(
      createAmountSubscription(price, paymentMethodId, extraStorage, productId)
    ),
  getPlanList: () => dispatch(getStripPlanList()),
  getCustomerInvoices: () => dispatch(getCustomerInvoices()),
  getAllAssetData: () => dispatch(getAssetListRequest()),
  deleteAssetData: (assetId: string) => dispatch(deleteAssetRequest(assetId))
})

export default connect(mapState, mapDispatch)(SubscriptionScreen)
