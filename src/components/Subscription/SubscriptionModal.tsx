import { Typography } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import clsx from 'clsx'
import { AppDivider } from 'components/Common/Core/AppDivider'
import React, { useState } from 'react'
import { SubscriptionDurations, SubscriptionTypes } from 'utils/enums'
import { getSubscriptionDetails } from 'utils/subscription'
import { SubscriptionDuration, SubscriptionType } from 'utils/types'
import Modal from '../Common/Modal'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import CloseButton from 'components/Common/Button/CloseButton'

type Props = {
  open: boolean
  onRequestClose: () => void
  activeSubscriptionType: SubscriptionType | undefined
}

export const SubscriptionModal = ({
  open,
  onRequestClose,
  activeSubscriptionType
}: Props) => {
  const classes = useStyles()
  const theme = useTheme()

  const [duration, setDuration] = useState(SubscriptionDurations.monthly)
  const [
    selectedSubscription,
    setSelectedSubscription
  ] = useState<null | SubscriptionType>(
    activeSubscriptionType || SubscriptionTypes.pro
  )

  const renderCreatorSubscription = () => {
    const {
      name,
      description,
      features,
      extraFeatures,
      prices
    } = getSubscriptionDetails(SubscriptionTypes.creator)
    const price = prices[duration]
    return (
      <SubscriptionItem
        onClick={() => setSelectedSubscription(SubscriptionTypes.creator)}
        name={name}
        description={description}
        price={price}
        features={features}
        extraFeatures={extraFeatures}
        isSelected={selectedSubscription === SubscriptionTypes.creator}
        duration={duration}
      />
    )
  }

  const renderProSubscription = () => {
    const {
      name,
      description,
      features,
      extraFeatures,
      prices
    } = getSubscriptionDetails(SubscriptionTypes.pro)
    const price = prices[duration]
    return (
      <SubscriptionItem
        onClick={() => setSelectedSubscription(SubscriptionTypes.pro)}
        name={name}
        description={description}
        price={price}
        features={features}
        extraFeatures={extraFeatures}
        isSelected={selectedSubscription === SubscriptionTypes.pro}
        duration={duration}
      />
    )
  }

  const renderTeamSubscription = () => {
    const {
      name,
      description,
      features,
      extraFeatures,
      prices
    } = getSubscriptionDetails(SubscriptionTypes.team)
    const price = prices[duration]
    return (
      <SubscriptionItem
        onClick={() => setSelectedSubscription(SubscriptionTypes.team)}
        name={name}
        description={description}
        price={price}
        features={features}
        extraFeatures={extraFeatures}
        isSelected={selectedSubscription === SubscriptionTypes.team}
        duration={duration}
      />
    )
  }

  const handleDuration = (duration: SubscriptionDuration) => {
    console.log(duration)
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
        <ToggleButton value={SubscriptionDurations.monthly}>
          <Typography variant='inherit'>Monthly</Typography>
        </ToggleButton>
        <ToggleButton value={SubscriptionDurations.yearly}>
          <Typography variant='inherit'>Annualy</Typography>
        </ToggleButton>
      </ToggleButtonGroup>
    )
  }

  return (
    <Modal open={open} onRequestClose={onRequestClose} clickToClose={true}>
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

        <div style={{ display: 'flex' }}>
          {renderCreatorSubscription()}
          {renderProSubscription()}
          {renderTeamSubscription()}
        </div>
      </div>
    </Modal>
  )
}

type SubscriptionItemProps = {
  name: string
  description: string
  price: string
  duration: SubscriptionDuration
  features?: Array<string>
  extraFeatures?: Array<string>
  isSelected: boolean
  onClick: () => void
}

const SubscriptionItem = ({
  name,
  description,
  price,
  duration,
  features,
  extraFeatures,
  isSelected,
  onClick
}: SubscriptionItemProps) => {
  const classes = useStyles()
  return (
    <div
      className={clsx(
        classes.subscriptionItemContainer,
        isSelected ? classes.selected : ''
      )}
      onClick={onClick}>
      <Typography variant={'h4'}>{name}</Typography>
      <Typography variant={'caption'} className={classes.descriptionText}>
        {description}
      </Typography>
      <div className={classes.priceContainer}>
        <Typography variant={'h6'} className={classes.priceText}>
          ${price}
        </Typography>
        <Typography variant={'h6'} className={classes.durationText}>
          /{duration === SubscriptionDurations.monthly ? 'month' : 'year'}
        </Typography>
      </div>

      {features ? (
        <div>
          <AppDivider className={classes.divider} />
          <Typography className={classes.featureTitle}>Features</Typography>
          <ul>
            {features.map((feature: string) => (
              <li>
                <Typography>{feature}</Typography>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {extraFeatures ? (
        <div>
          <AppDivider className={classes.divider} />
          <Typography className={classes.featureTitle}>and...</Typography>
          <ul>
            {extraFeatures.map((feature: string) => (
              <li>
                <Typography>{feature}</Typography>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    paddingBottom: theme.spacing(3)
  },
  subscriptionItemContainer: {
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0 5px 10px #cccccc',
    padding: theme.spacing(3),
    minWidth: 250,
    maxWidth: 250,
    marginLeft: theme.spacing(1.5),
    marginRight: theme.spacing(1.5),
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
    )
  },
  selected: {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 5px 10px ${theme.palette.primary.light}`,
    transition: theme.transitions.create(
      ['transform', 'border-color', 'box-shadow'],
      {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.standard
      }
    ),
    transform: `translateY(-10px)`
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
  durationText: { color: theme.palette.grey[600], fontSize: 10 }
}))
