import { Typography } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import clsx from 'clsx'
import { AppDivider } from 'components/Common/Core/AppDivider'
import React, { useState } from 'react'
import { SubscriptionDurations, SubscriptionTypes } from 'utils/enums'
import { getSubscriptionDetails } from 'utils/subscription'
import { SubscriptionDuration, SubscriptionType } from 'utils/Interface'
import Modal from '../Common/Modal'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import CloseButton from 'components/Common/Button/CloseButton'
import { GradiantButton } from 'components/Common/Button/GradiantButton'
import businessSubBg from '../../assets/business-sub-bg.png'

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

  const handleChoosePlan = (type: SubscriptionType) => {}

  const handleChatWithSales = () => {}

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
        onChoosePlan={() => handleChoosePlan(SubscriptionTypes.creator)}
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
        onChoosePlan={() => handleChoosePlan(SubscriptionTypes.pro)}
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
        onChoosePlan={() => handleChoosePlan(SubscriptionTypes.team)}
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

        <div style={{ display: 'flex' }}>{renderBusinessSubscription()}</div>
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
  onChoosePlan: () => void
}

const SubscriptionItem = ({
  name,
  description,
  price,
  duration,
  features,
  extraFeatures,
  isSelected,
  onClick,
  onChoosePlan
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
        <Typography variant={'h5'} className={classes.priceText}>
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
            {extraFeatures.map((feature: string, index: number) => (
              <li key={index}>
                <Typography>{feature}</Typography>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <div className={classes.choosePlanContainer}>
        <GradiantButton onClick={onChoosePlan}>
          <Typography>Choose Plan</Typography>
        </GradiantButton>
      </div>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
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
    paddingBottom: theme.spacing(3)
  },
  subscriptionItemContainer: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0 5px 10px #999999',
    padding: theme.spacing(3),
    minWidth: 250,
    maxWidth: 250,
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
    )
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
  businessSubscription: {
    borderRadius: theme.shape.borderRadius,
    background: `url(${businessSubBg})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: theme.spacing(12),
    minWidth: 250,

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
    [theme.breakpoints.down('sm')]: { flexDirection: 'column', maxWidth: 250 },
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
      alignSelf: 'stretch'
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
  durationText: { color: theme.palette.grey[600], fontSize: 12, marginTop: 8 }
}))
