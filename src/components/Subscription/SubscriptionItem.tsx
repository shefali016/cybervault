import React, { Fragment } from 'react'
import { useStyles } from './style'
import { useTheme } from '@material-ui/core/styles'
import {
  StripePlans,
  SubscriptionDuration,
  SubscriptionType
} from 'utils/Interface'
import clsx from 'clsx'
import { Button, Typography } from '@material-ui/core'
import { SubscriptionDurations } from 'utils/enums'
import { AppLoader } from 'components/Common/Core/AppLoader'
import { AppDivider } from 'components/Common/Core/AppDivider'
import moment from 'moment'
import { GradiantButton } from 'components/Common/Button/GradiantButton'
import { getSubscriptionDetails } from 'utils/subscription'

type SubscriptionItemProps = {
  type: SubscriptionType | any
  duration: SubscriptionDuration
  isSelected?: boolean
  isSubscribed?: boolean
  cancelDate?: number | undefined
  onClick?: () => void
  onChoosePlan: (plan: StripePlans) => void
  onCancelSubscription?: () => void
  plan?: StripePlans | undefined
}

export const SubscriptionItem = ({
  type,
  duration,
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

  const { name, description, features, extraFeatures } = getSubscriptionDetails(
    type
  )

  return (
    <Fragment>
      <div
        className={clsx(
          classes.subscriptionItemContainer,
          isSelected ? classes.selected : ''
        )}
        onClick={onClick}>
        <div className={classes.subscriptionItemInner}>
          <div className={classes.subscriptionItemHeader}>
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
                  /
                  {duration === SubscriptionDurations.MONTHLY
                    ? 'month'
                    : 'year'}
                </Typography>
              </div>
            ) : (
              <AppLoader color={theme.palette.primary.main} />
            )}
          </div>

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
          {!!cancelDate && (
            <Typography className={classes.cancelDateText} variant={'caption'}>
              Cancels on {moment(cancelDate).format('YYYY-MM-DD')}
            </Typography>
          )}

          {!!features && (
            <div>
              <AppDivider spacing={3} />
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
              <AppDivider spacing={3} />
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
        </div>
      </div>
    </Fragment>
  )
}
