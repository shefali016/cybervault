import { Button, Typography } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import clsx from 'clsx'
import { AppDivider } from 'components/Common/Core/AppDivider'
import React, { Fragment, useEffect, useState } from 'react'
import { SubscriptionDurations, SubscriptionTypes } from 'utils/enums'
import { getSubscriptionDetails, findProductWithType } from 'utils/subscription'
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
import businessSubBg from '../../assets/business-sub-bg.png'
import { getProducts, getPlans } from '../../apis/stripe'
import { PaymentMethod } from '@stripe/stripe-js'
import PaymentMethodModal from 'components/Common/PaymentMethodModal'
import { ConfirmationDialog } from 'components/Common/Dialog/ConfirmationDialog'
import { AppLoader } from 'components/Common/Core/AppLoader'
import moment from 'moment'

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
  loading
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
  const [paymentModal, setPaymentModal] = useState<boolean>(false)
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
      const products: any = await getProducts()
      setProducts(products)

      const planRequests: Array<
        Promise<{
          productId: string
          plans: Array<StripePlans>
        }>
      > = products.map((product: Product) =>
        getPlans(product.id).then((plans: Array<StripePlans>) => ({
          productId: product.id,
          plans
        }))
      )

      const plans = await Promise.all(planRequests)
      const productPlans: {
        [productId: string]: Array<StripePlans>
      } = plans.reduce(
        (acc: {}, res: { productId: string; plans: Array<StripePlans> }) => {
          return { ...acc, [res.productId]: res.plans }
        },
        {}
      )

      setProductPlans(productPlans)
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleChoosePlan = (planId: string, type: SubscriptionType) => {
    if (subscription) {
      setOpenDialog({ value: true, for: 'Update' })
      setSubscriptionParams({ planId, type })
    } else {
      setPaymentModal(true)
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
    setPaymentModal(false)
  }

  const handleChatWithSales = () => {}

  const renderSubscriptionPlan = (type: SubscriptionType) => {
    const {
      name,
      description,
      features,
      extraFeatures
    } = getSubscriptionDetails(type)

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
        name={name}
        description={description}
        features={features}
        plan={plan}
        extraFeatures={extraFeatures}
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
      <Modal open={open} onRequestClose={onRequestClose} clickToClose={true}>
        <div className={'modalContentWrapper'}>
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
              {renderDurationSwitch()}
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

            <div style={{ display: 'flex' }}>
              {renderBusinessSubscription()}
            </div>
          </div>
          {loading && (
            <div className={classes.loadingView}>
              <AppLoader color={theme.palette.primary.main} />
            </div>
          )}
        </div>
      </Modal>
      <PaymentMethodModal
        open={paymentModal}
        onRequestClose={() => setPaymentModal(!paymentModal)}
        paymentMethods={paymentMethods}
        handleSubscription={handleSubscription}
      />
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

type SubscriptionItemProps = {
  name: string
  description: string
  duration: SubscriptionDuration
  features?: Array<string>
  extraFeatures?: Array<string>
  isSelected: boolean
  isSubscribed: boolean
  cancelDate: number | undefined
  onClick: () => void
  onChoosePlan: (plan: StripePlans) => void
  onCancelSubscription: () => void
  plan: StripePlans | undefined
}

const SubscriptionItem = ({
  name,
  description,
  duration,
  features,
  extraFeatures,
  isSelected,
  cancelDate,
  onClick,
  onChoosePlan,
  onCancelSubscription,
  isSubscribed,
  plan
}: SubscriptionItemProps) => {
  const classes = useStyles()
  const theme = useTheme()
  return (
    <Fragment>
      <div
        className={clsx(
          classes.subscriptionItemContainer,
          isSelected ? classes.selected : ''
        )}
        onClick={onClick}>
        <div className={classes.subscriptionItemInner}>
          <Typography variant={'h4'}>{name}</Typography>
          {!!isSubscribed && (
            <div className={classes.ribbon}>
              <span className={classes.span}>Active</span>
            </div>
          )}
          <Typography variant={'caption'} className={classes.descriptionText}>
            {description}
          </Typography>
          {!!plan ? (
            <div className={classes.priceContainer}>
              <Typography variant={'h5'} className={classes.priceText}>
                ${(plan.amount / 100).toFixed(2)}
              </Typography>
              <Typography variant={'h6'} className={classes.durationText}>
                /{duration === SubscriptionDurations.MONTHLY ? 'month' : 'year'}
              </Typography>
            </div>
          ) : (
            <AppLoader color={theme.palette.primary.main} />
          )}

          {!!features && (
            <div>
              <AppDivider className={classes.divider} />
              <Typography className={classes.featureTitle}>Features</Typography>
              <ul>
                {features.map((feature: string) => (
                  <li key={feature}>
                    <Typography>{feature}</Typography>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {!!extraFeatures && (
            <div>
              <AppDivider className={classes.divider} />
              <Typography className={classes.featureTitle}>and...</Typography>
              <ul>
                {extraFeatures.map((feature: string, index: number) => (
                  <li key={index}>
                    <Typography>{feature}</Typography>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {!!cancelDate && (
            <Typography className={classes.cancelDateText}>
              Cancels on {moment(cancelDate).format('YYYY-MM-DD')}
            </Typography>
          )}
          <div className={classes.choosePlanContainer}>
            {isSubscribed && !cancelDate ? (
              <Button
                onClick={onCancelSubscription}
                className={classes.cancelBtn}>
                Cancel Subscription
              </Button>
            ) : (
              <GradiantButton
                onClick={() => {
                  !!plan && onChoosePlan(plan)
                }}
                disabled={!plan}>
                <Typography>Choose Plan</Typography>
              </GradiantButton>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  )
}

const useStyles = makeStyles((theme) => ({
  subscriptionContainer: {
    display: 'flex',
    [theme.breakpoints.down(1000)]: {
      flexDirection: 'column'
    }
  },
  cancelDateText: {
    color: theme.palette.error.main,
    paddingTop: theme.spacing(2),
    textAlign: 'center'
  },
  loadingView: {
    display: 'flex',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: 'auto',
    height: 'auto',
    backgroundColor: 'rgba(255, 255, 255, 0.75)'
  },
  choosePlanContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'flex-end',
    paddingTop: theme.spacing(5)
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(3)
    }
  },
  subscriptionItemInner: {
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    position: 'relative',
    padding: theme.spacing(3),

    [theme.breakpoints.down(1000)]: {
      flexDirection: 'column'
    }
  },
  subscriptionItemContainer: {
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0 5px 10px #999999',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'transparent',
    cursor: 'pointer',
    transition: theme.transitions.create(
      ['transform', 'border-color', 'box-shadow'],
      {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.standard
      }
    ),

    [theme.breakpoints.down(1000)]: {
      marginLeft: theme.spacing(0),
      marginRight: theme.spacing(0),
      marginBottom: theme.spacing(4)
    }
  },
  selected: {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 5px 20px ${theme.palette.primary.light}`,
    transition: theme.transitions.create(
      ['transform', 'border-color', 'box-shadow'],
      {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.standard
      }
    ),
    transform: `translateY(-10px)`
  },
  creatorSelected: {
    transform: `translateY(-10px)`
  },
  businessSubscription: {
    borderRadius: theme.shape.borderRadius,
    background: `url(${businessSubBg})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: theme.spacing(12),

    overflow: 'hidden',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(4),
    flex: 1,
    boxShadow: '0 5px 10px #999999',
    padding: `${theme.spacing(3)}px ${theme.spacing(5)}px`,
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: theme.transitions.create(
      ['transform', 'border-color', 'box-shadow'],
      {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.standard
      }
    ),
    [theme.breakpoints.down(1000)]: {
      marginLeft: theme.spacing(0),
      marginRight: theme.spacing(0),
      marginTop: theme.spacing(2)
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
      textAlign: 'center'
    },
    '&:hover': {
      boxShadow: `0 5px 30px ${theme.palette.primary.light}`
    }
  },
  businessSubscriptionText: {
    textShadow: '0 5px 5px #000'
  },
  businessSubscriptionButton: {
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(3),
      alignSelf: 'center'
    }
  },
  divider: { margin: `${theme.spacing(3)}px 0` },
  featureTitle: {
    color: theme.palette.primary.main,
    fontSize: 16
  },
  descriptionText: {},
  priceContainer: {
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center'
  },
  priceText: { color: theme.palette.grey[600] },
  durationText: { color: theme.palette.grey[600], fontSize: 12, marginTop: 8 },
  cancelBtn: {
    minWidth: 200,
    paddingTop: 13,
    paddingBottom: 13,
    color: 'red'
  },
  ribbon: {
    backgroundColor: theme.palette.primary.main,
    position: 'absolute',
    color: 'white',
    width: 200,
    textAlign: 'center',
    textTransform: 'capitalize',
    padding: 7,
    font: 'Lato',
    '&::before': {
      position: 'absolute',
      zIndex: -1,
      content: '',
      display: 'block',
      border: '5px solid #2980b9'
    },
    '&::after': {
      position: 'absolute',
      zIndex: -1,
      content: '',
      display: 'block',
      border: '5px solid #2980b9'
    },
    transform: 'rotate(40deg)',
    top: 10,
    marginRight: -37,
    right: -38
  },
  span: {}
}))
