import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { SubscriptionDurations, SubscriptionTypes } from 'utils/enums'
import {
  Product,
  StripePlans,
  SubscriptionDuration,
  SubscriptionType
} from 'utils/Interface'
import { SubscriptionDurationSwitch } from './SubscriptionDurationSwitch'
import { useStyles as useSubscriptionStyles } from './style'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { SubscriptionItem } from './SubscriptionItem'
import { Typography } from '@material-ui/core'
import { AppLoader } from 'components/Common/Core/AppLoader'
import { GradiantButton } from 'components/Common/Button/GradiantButton'
import { AppDivider } from 'components/Common/Core/AppDivider'
import { findProductWithType, getSubscriptionDetails } from 'utils/subscription'
import { getProductsWithPlans } from 'apis/stripe'
import clsx from 'clsx'
import withWidth, { isWidthDown } from '@material-ui/core/withWidth'
import Swipe from 'react-easy-swipe'
import blackSwirl from 'assets/swirly_black.jpeg'
import whiteSwirl from 'assets/swirly_white.jpeg'

const subscriptionTypes = [
  SubscriptionTypes.CREATOR,
  SubscriptionTypes.PRO,
  SubscriptionTypes.TEAM
]

const SubscriptionPricingSlider = (props: any) => {
  const subscriptionClasses = useSubscriptionStyles()
  const classes = useStyles()
  const theme = useTheme()

  const [duration, setDuration] = useState(SubscriptionDurations.MONTHLY)
  const [selectedIndex, setSelectedIndex] = useState(1)

  const [products, setProducts] = useState<Array<Product>>([])
  const [productPlans, setProductPlans] = useState<{
    [productId: string]: Array<StripePlans>
  }>({})

  useEffect(() => {
    stripePlanList()
  }, [])
  const stripePlanList = async () => {
    try {
      const { products, plans } = await getProductsWithPlans()
      setProducts(products)
      setProductPlans(plans)

      console.log(products, plans)
    } catch (error) {
      console.log(error.message)
    }
  }

  const itemWidth = isWidthDown('sm', props.width)
    ? ITEM_SM_WIDTH
    : ITEM_LG_WIDTH

  const renderItem = ({
    type,
    index,
    featured
  }: {
    type: SubscriptionType
    featured: boolean
    index: number
  }) => {
    const {
      name,
      description,
      extraFeatures: features,
      storage,
      transactionFee,
      numProjects
    } = getSubscriptionDetails(type)

    const product: Product | undefined = findProductWithType(products, type)

    const plans =
      product && productPlans[product.id] ? productPlans[product.id] : []
    const plan = plans.find((plan) => plan.interval === duration)

    return (
      <div
        key={type}
        className={clsx(
          featured
            ? clsx(
                classes.featuredItem,
                selectedIndex === index ? '' : classes.itemHidden
              )
            : selectedIndex !== index
            ? ''
            : classes.itemHidden,
          classes.item
        )}
        onClick={() => setSelectedIndex(index)}>
        <SubscriptionHeader
          {...{
            name,
            description,
            plan,
            duration,
            onClick: () => props.onStart(type),
            featured,
            index,
            selectedIndex,
            width: itemWidth
          }}
        />
        <SubscriptionDetails
          {...{
            features,
            storage,
            transactionFee,
            numProjects
          }}
        />
      </div>
    )
  }

  const hasSwiped = useRef(false)
  const onSwipe = ({ x }: any, e: any) => {
    if (hasSwiped.current) {
      return
    }
    const threshold = 30
    const swipedLeft = x < -threshold
    const swipedRight = x > threshold

    if (selectedIndex > 0 && swipedRight) {
      setSelectedIndex(selectedIndex - 1)
      hasSwiped.current = true
    }
    if (selectedIndex < subscriptionTypes.length - 1 && swipedLeft) {
      setSelectedIndex(selectedIndex + 1)
      hasSwiped.current = true
    }
  }

  return (
    <div className={classes.container}>
      <SubscriptionDurationSwitch
        value={duration}
        onChange={(duration: SubscriptionDuration) => setDuration(duration)}
        classes={{ root: subscriptionClasses.switchWhiteRoot }}
      />

      <div className={classes.itemsWrapper}>
        <div className={classes.itemsOuter}>
          <div className={classes.itemsInner}>
            {/* @ts-ignore */}
            <Swipe
              onSwipeMove={onSwipe}
              onSwipeEnd={() => {
                hasSwiped.current = false
              }}>
              <div
                className={classes.itemsContainer}
                style={Object.assign(
                  {
                    transition: theme.transitions.create(['transform'], {
                      easing: theme.transitions.easing.easeOut,
                      duration: 400
                    })
                  },
                  !isWidthDown('md', props.width)
                    ? {}
                    : {
                        transform: `translateX(${
                          -(selectedIndex - 1) * itemWidth
                        }px)`
                      }
                )}>
                <div className={classes.normalItemsContainer}>
                  {subscriptionTypes.map(
                    (type: SubscriptionType, index: number) =>
                      renderItem({ type, featured: false, index })
                  )}
                </div>

                <div className={classes.featuredItemsContainer}>
                  {subscriptionTypes.map(
                    (type: SubscriptionType, index: number) =>
                      renderItem({ type, featured: true, index })
                  )}
                </div>
              </div>
            </Swipe>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withWidth()(SubscriptionPricingSlider)

type SubscriptionHeaderProps = {
  name: string
  description: string
  duration: SubscriptionDuration
  onClick: () => void
  featured: boolean
  plan: StripePlans | undefined
  index: number
  selectedIndex: number
  width: number
}

const SubscriptionHeader = ({
  name,
  description,
  duration,
  onClick,
  featured,
  plan,
  index,
  selectedIndex,
  width
}: SubscriptionHeaderProps) => {
  const subscriptionClasses = useSubscriptionStyles()
  const classes = useStyles()
  const theme = useTheme()

  const imageOffet = Math.abs(1 - selectedIndex) * 0.5 + 1

  const lastSelected = useRef(selectedIndex)

  const selectingFarItem = Math.abs(selectedIndex - lastSelected.current) > 1

  return (
    <div
      className={clsx(classes.header, featured ? classes.headerFeatured : '')}>
      <img
        src={featured ? blackSwirl : whiteSwirl}
        style={{
          transform: `translateX(${
            (selectedIndex - index) * width
          }px) translateY(-25px) scaleX(${
            Math.abs(1 - selectedIndex) * 0.7 + 1
          })`,
          transition: theme.transitions.create(['transform'], {
            duration: 1000,
            easing: theme.transitions.easing.easeInOut
          })
        }}
        className={classes.headerBgImage}
      />
      <div className={classes.headerContent}>
        <Typography
          variant='h4'
          className={clsx(classes.headerTitle, featured ? 'whiteText' : '')}>
          {name}
        </Typography>
        <Typography
          variant='caption'
          className={clsx(classes.headerSubtitle, featured ? 'whiteText' : '')}>
          {description}
        </Typography>
        {!!plan ? (
          <div className={subscriptionClasses.priceContainer}>
            <Typography
              variant={'h5'}
              className={clsx(
                subscriptionClasses.priceText,
                featured ? 'whiteText' : ''
              )}>
              ${(plan.amount / 100).toFixed(2)}
            </Typography>
            <Typography
              variant={'caption'}
              className={clsx(
                subscriptionClasses.durationText,
                featured ? 'whiteText' : ''
              )}>
              /{duration === SubscriptionDurations.MONTHLY ? 'month' : 'year'}
            </Typography>
          </div>
        ) : (
          <AppLoader color={theme.palette.primary.main} />
        )}
        <GradiantButton onClick={onClick} className={classes.getStartedButton}>
          Get started free
        </GradiantButton>
      </div>
    </div>
  )
}

type SubscriptionDetailsProps = {
  numProjects: number
  storage: number
  transactionFee: string
  features?: Array<string>
}

const SubscriptionDetails = ({
  numProjects,
  storage,
  transactionFee,
  features
}: SubscriptionDetailsProps) => {
  const subscriptionClasses = useSubscriptionStyles()
  const classes = useStyles()
  const theme = useTheme()
  return (
    <div className={classes.details}>
      <Typography className={classes.feature}>
        {numProjects} projects per month
      </Typography>
      <Typography className={classes.feature}>{storage}GB storage</Typography>
      <Typography className={classes.feature}>
        {transactionFee} transaction fee
      </Typography>
      <AppDivider className={classes.detailsDivider} spacing={3} />
      {!!features && (
        <ul>
          {features.map((feature: string) => (
            <li key={feature}>
              <Typography>{feature}</Typography>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

const BORDER_RADIUS = 35

const ITEM_LG_WIDTH = 350
const ITEM_SM_WIDTH = 280

const useStyles = makeStyles((theme) => ({
  feature: { marginBottom: theme.spacing(1) },

  container: { display: 'flex', flexDirection: 'column', alignItems: 'center' },

  itemsWrapper: {
    width: '100vw',
    position: 'relative',
    overflow: 'hidden',
    height: 800
  },
  itemsOuter: { left: '50%', position: 'absolute' },
  itemsInner: {
    position: 'relative',
    marginLeft: '-50%',
    display: 'flex',
    alignItems: 'flex-start'
  },
  itemsContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    color: theme.palette.text.paper,
    marginTop: theme.spacing(6)
  },
  featuredItemsContainer: {
    display: 'flex',
    position: 'absolute',
    overflow: 'hidden',
    borderRadius: BORDER_RADIUS
  },
  normalItemsContainer: {
    background: theme.palette.background.paper,
    display: 'flex',
    borderRadius: BORDER_RADIUS,
    overflow: 'hidden'
  },
  item: {
    cursor: 'pointer',
    transition: theme.transitions.create(
      ['transform', 'border-color', 'box-shadow', 'opacity'],
      {
        easing: theme.transitions.easing.easeIn,
        duration: 400
      }
    ),
    width: ITEM_LG_WIDTH,
    [theme.breakpoints.down('sm')]: {
      width: ITEM_SM_WIDTH
    }
  },
  featuredItem: {
    overflow: 'hidden',
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS,
    borderColor: theme.palette.primary.main,
    boxShadow: `0 5px 20px ${theme.palette.primary.light}`
  },
  itemHidden: {
    opacity: 0
  },

  headerBgImage: {
    position: 'absolute',
    objectFit: 'cover',
    width: ITEM_LG_WIDTH * 3,
    [theme.breakpoints.down('sm')]: {
      width: ITEM_SM_WIDTH * 3
    },
    overflow: 'hidden'
  },
  headerContent: {
    zIndex: 1,
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden'
  },
  headerFeatured: {
    background: 'black',
    paddingTop: theme.spacing(6)
  },
  headerTitle: { fontWeight: 'bold', marginBottom: theme.spacing(0.8) },
  headerSubtitle: {
    marginBottom: theme.spacing(0.5),
    color: theme.palette.text.meta
  },
  details: {
    background: theme.palette.background.paper,
    padding: `${theme.spacing(4)}px ${theme.spacing(6)}px`,
    display: 'flex',
    flexDirection: 'column'
  },
  getStartedButton: {
    height: 50,
    borderRadius: 25,
    marginTop: theme.spacing(4.5)
  },
  detailsDivider: {
    width: 100,
    alignSelf: 'center',
    backgroundColor: theme.palette.text.meta
  }
}))
