import React, { Fragment, useEffect, useState } from 'react'
import { Typography } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import { SubscriptionDurations, SubscriptionTypes } from 'utils/enums'
import { findProductWithType } from 'utils/subscription'
import {
  Product,
  StripePlans,
  SubscriptionDuration,
  SubscriptionType
} from 'utils/Interface'
import Modal from '../Common/Modal'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import CloseButton from 'components/Common/Button/CloseButton'
import { GradiantButton } from 'components/Common/Button/GradiantButton'
import { getProductsWithPlans } from '../../apis/stripe'
import { PaymentMethod } from '@stripe/stripe-js'
import PaymentMethodModal from 'components/Common/PaymentMethodModal'
import { ConfirmationDialog } from 'components/Common/Dialog/ConfirmationDialog'
import { useStyles } from './style'
import { SubscriptionItem } from './SubscriptionItem'
import { SubscriptionDurationSwitch } from './SubscriptionDurationSwitch'
import { CardModal } from 'components/Stripe/CardModal'

type SubscriptionParams = { planId: string; type: SubscriptionType }

type Props = {
  open: boolean
  onRequestClose: () => void
  activeSubscriptionType: SubscriptionType | undefined
  customerId: string
  paymentMethods: Array<PaymentMethod>
  planSubscription: (
    planId: string,
    paymentMethodId: string,
    type: SubscriptionType
  ) => void
  subscription: any
  cancelSubscription: (subscriptionId: string) => void
  updateSubscription: (
    subscriptionId: string,
    planId: string,
    type: SubscriptionType
  ) => void
  loading: boolean
  planList: Array<StripePlans> | null
  setStorageProduct: (storageProduct: any) => void
}

export const SubscriptionModal = ({
  open,
  onRequestClose,
  activeSubscriptionType,
  paymentMethods,
  planSubscription,
  subscription,
  cancelSubscription,
  updateSubscription,
  setStorageProduct,
  loading,
  customerId
}: Props) => {
  const classes = useStyles()
  const theme = useTheme()

  const [duration, setDuration] = useState(
    subscription?.plan?.interval || SubscriptionDurations.MONTHLY
  )
  const [products, setProducts] = useState<Array<Product>>([])
  const [productPlans, setProductPlans] = useState<{
    [productId: string]: Array<StripePlans>
  }>({})
  const [paymentModalOpen, setPaymentModalOpen] = useState<boolean>(false)
  const [
    subscriptionParams,
    setSubscriptionParams
  ] = useState<SubscriptionParams | null>(null)
  const [openDialog, setOpenDialog] = useState<any>({
    value: false,
    for: ''
  })

  const [
    selectedSubscription,
    setSelectedSubscription
  ] = useState<null | SubscriptionType>(
    activeSubscriptionType || SubscriptionTypes.PRO
  )

  useEffect(() => {
    stripePlanList()
  }, [])
  const stripePlanList = async () => {
    try {
      const { products, plans } = await getProductsWithPlans()
      setProducts(products)
      const storageProduct = products.filter(
        (item: any) => item.name === 'Storage Subscription'
      )[0]
      setStorageProduct(storageProduct)
      setProductPlans(plans)
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleChoosePlan = (planId: string, type: SubscriptionType) => {
    if (subscription) {
      setOpenDialog({ value: true, for: 'Update' })
      setSubscriptionParams({ planId, type })
    } else {
      setPaymentModalOpen(true)
      setSubscriptionParams({ planId, type })
    }
  }
  const handleCancelSubscription = () => {
    setOpenDialog({ value: false, for: '' })
    cancelSubscription(subscription.id)
  }
  const handelUpdateSubscription = () => {
    setOpenDialog({ value: false, for: '' })
    if (subscriptionParams) {
      const { planId, type } = subscriptionParams
      updateSubscription(subscription.id, planId, type)
    }
  }

  const handleSubscription = async (paymentMethod: PaymentMethod) => {
    if (subscriptionParams) {
      const { planId, type } = subscriptionParams
      planSubscription(planId, paymentMethod.id, type)
    }
    setPaymentModalOpen(false)
  }

  const handleChatWithSales = () => {}

  const renderSubscriptionPlan = (type: SubscriptionType) => {
    const product: Product | undefined = findProductWithType(products, type)

    const plans =
      product && productPlans[product.id] ? productPlans[product.id] : []
    const plan = plans.find((plan) => plan.interval === duration)

    const isSubscribed =
      subscription && plan && subscription.plan.id === plan.id

    const cancelDate =
      isSubscribed &&
      subscription.cancel_at_period_end &&
      subscription.cancel_at * 1000

    return (
      <SubscriptionItem
        onClick={() => setSelectedSubscription(type)}
        type={type}
        plan={plan}
        isSelected={selectedSubscription === type}
        isSubscribed={isSubscribed}
        cancelDate={cancelDate}
        duration={duration}
        onChoosePlan={(plan: StripePlans) => {
          handleChoosePlan(plan.id, type)
        }}
        onCancelSubscription={() =>
          setOpenDialog({ value: true, for: 'Cancel' })
        }
      />
    )
  }

  const renderBusinessSubscription = () => {
    return (
      <div className={classes.businessSubscription}>
        <div>
          <Typography
            variant={'h4'}
            className={classes.businessSubscriptionText}>
            Business
          </Typography>
          <Typography
            variant={'body1'}
            className={classes.businessSubscriptionText}>
            Custom plans that suit your needs
          </Typography>
        </div>

        <GradiantButton
          onClick={handleChatWithSales}
          className={classes.businessSubscriptionButton}>
          <Typography>Chat With Sales</Typography>
        </GradiantButton>
      </div>
    )
  }

  const handleDuration = (duration: SubscriptionDuration) => {
    setDuration(duration)
  }

  const renderDurationSwitch = () => {
    return (
      <ToggleButtonGroup
        value={duration}
        exclusive
        onChange={(event: any, duration: SubscriptionDuration) => {
          if (duration !== null) {
            handleDuration(duration)
          }
        }}
        style={{ marginBottom: theme.spacing(3) }}>
        <ToggleButton value={SubscriptionDurations.MONTHLY}>
          <Typography variant='inherit'>Monthly</Typography>
        </ToggleButton>
        <ToggleButton value={SubscriptionDurations.YEARLY}>
          <Typography variant='inherit'>Annualy</Typography>
        </ToggleButton>
      </ToggleButtonGroup>
    )
  }

  return (
    <Fragment>
      <Modal
        open={open}
        onRequestClose={onRequestClose}
        clickToClose={true}
        showLoadingOverlay={loading}>
        <div className={'modalContent'}>
          <CloseButton
            onClick={onRequestClose}
            style={{ position: 'absolute', top: 10, right: 10 }}
          />
          <div className={classes.header}>
            <Typography variant={'h4'}>Upgrade Your Workflow</Typography>
            <Typography
              variant={'caption'}
              style={{
                marginTop: theme.spacing(1),
                marginBottom: theme.spacing(4)
              }}>
              {activeSubscriptionType
                ? 'Upgrade your subscription to benefit from extra features'
                : 'Subscribe to keep using premium Creator Cloud features'}
            </Typography>

            <SubscriptionDurationSwitch
              value={duration}
              onChange={(duration: SubscriptionDuration) =>
                setDuration(duration)
              }
            />
          </div>

          <div className={classes.subscriptionContainer}>
            {[
              SubscriptionTypes.CREATOR,
              SubscriptionTypes.PRO,
              SubscriptionTypes.TEAM
            ].map((type: SubscriptionType) => (
              <Fragment key={type}>{renderSubscriptionPlan(type)}</Fragment>
            ))}
          </div>

          <div style={{ display: 'flex' }}>{renderBusinessSubscription()}</div>
        </div>
      </Modal>
      {paymentMethods && paymentMethods.length ? (
        <PaymentMethodModal
          open={paymentModalOpen}
          onRequestClose={() => setPaymentModalOpen(false)}
          paymentMethods={paymentMethods}
          handleSubscription={handleSubscription}
        />
      ) : (
        <CardModal
          open={paymentModalOpen}
          onRequestClose={() => setPaymentModalOpen(false)}
          customerId={customerId}
          onPaymentMethodCreated={handleSubscription}
        />
      )}

      <ConfirmationDialog
        isOpen={!!openDialog.value}
        onClose={() => setOpenDialog({ value: false, for: '' })}
        title={`${openDialog.for} Subscription`}
        message={`Are you sure you want to ${openDialog.for} this subscription? This cannot be undone.`}
        onYes={() =>
          openDialog.for === 'Update'
            ? handelUpdateSubscription()
            : handleCancelSubscription()
        }
        onNo={() => setOpenDialog({ value: false, for: '' })}
      />
    </Fragment>
  )
}
