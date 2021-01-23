import { Typography } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import clsx from 'clsx'
import CloseButton from 'components/Common/Button/CloseButton'
import { GradiantButton } from 'components/Common/Button/GradiantButton'
import { AppCircularProgress } from 'components/Common/Core/AppCircularProgress'
import { AppSlider } from 'components/Common/Core/AppSlider'
import Modal from 'components/Common/Modal'
import React, { useState } from 'react'
import { SubscriptionTypes } from 'utils/enums'
import { getSubscriptionDetails } from 'utils/subscription'
import { Account } from '../../utils/types'

type Props = {
  open: boolean
  onRequestClose: () => void
  account: Account
}

export const StorageModal = ({ open, onRequestClose, account }: Props) => {
  const classes = useStyles()
  const theme = useTheme()

  const [storageUsed] = useState<number>(2)
  const [extraStorage, setExtraStorage] = useState<number>(
    account.subscription?.extraStorage || 0
  )

  const getTotalStorage = (account: Account) => {
    const { storage } = getSubscriptionDetails(
      account.subscription?.type || SubscriptionTypes.creator
    )
    return storage + extraStorage
  }

  const handleBuyStorage = () => {
    // Charge user immediately for the different in previous extra storage and increased extra storage
    // Increase their monthly subscription accordingly
  }

  const renderStorageTracker = () => {
    const totalStorage = getTotalStorage(account)

    return (
      <div className={classes.storageTrackerContainer}>
        <Typography variant={'h5'}>Manage Storage</Typography>
        <Typography variant={'caption'}>
          Your current storage plan is {totalStorage}
        </Typography>

        <div className={classes.storagePieOuter}>
          <AppCircularProgress
            variant='determinate'
            value={(storageUsed / totalStorage) * 100}
            color='primary'
            className={classes.storagePie}
            size={200}
            thickness={2}
          />
          <div className={classes.storagePieInner}>
            <div className={classes.storagePercentContainer}>
              <Typography variant='h3' style={{ marginRight: 4 }}>
                90
              </Typography>
              <Typography variant='h6'> %</Typography>
            </div>
            <Typography variant='body1'>full</Typography>
          </div>
        </div>

        <div
          className={'row'}
          style={{
            marginTop: theme.spacing(3),
            color: theme.palette.text.meta
          }}>
          <div style={{ textAlign: 'center' }}>
            <Typography variant={'h5'}>{storageUsed}GB</Typography>
            <Typography variant={'caption'}>Used</Typography>
          </div>

          <Typography
            variant={'h5'}
            style={{
              marginLeft: theme.spacing(2),
              marginRight: theme.spacing(2)
            }}>
            |
          </Typography>

          <div style={{ textAlign: 'center' }}>
            <Typography variant={'h5'}>{totalStorage}GB</Typography>
            <Typography variant={'caption'}>Total</Typography>
          </div>
        </div>
      </div>
    )
  }

  const renderStorageSlider = () => {
    return (
      <div className={classes.storageSliderContainer}>
        <Typography variant={'h2'} className={classes.extraStorage}>
          {extraStorage}
        </Typography>
        <Typography variant={'h5'} className={classes.extraStorageSize}>
          GB
        </Typography>
        <AppSlider
          value={extraStorage}
          onChange={(e: any, val: number) => setExtraStorage(val)}
          max={1000}
        />
        <Typography variant='caption' className={classes.extraStorageCaption}>
          You will be charged today for additional storage add-on $
          {extraStorage}. This will add an $
          {Math.floor(extraStorage * 0.2).toFixed(2)} to your monthly bill.
        </Typography>
        <GradiantButton
          onClick={handleBuyStorage}
          className={classes.applyButton}>
          Apply
        </GradiantButton>
      </div>
    )
  }

  return (
    <Modal {...{ open, onRequestClose }} clickToClose={true}>
      <div className={clsx('modalContent', classes.modalContent)}>
        <CloseButton
          onClick={onRequestClose}
          style={{ position: 'absolute', top: 10, right: 10 }}
        />
        <div className={classes.header}>
          <Typography variant={'h4'}>Upgrade The Cloud</Typography>
          <Typography
            variant={'caption'}
            style={{
              marginTop: theme.spacing(1),
              marginBottom: theme.spacing(4)
            }}>
            Increase or decrease your monthly cloud storage
          </Typography>
        </div>
        <div className={classes.content}>
          <div className={classes.content}>{renderStorageTracker()}</div>
          <div className={classes.content}>{renderStorageSlider()}</div>
        </div>
      </div>
    </Modal>
  )
}

const useStyles = makeStyles((theme) => ({
  applyButton: { marginTop: theme.spacing(5) },
  modalContent: {},
  content: { display: 'flex', flex: 1 },
  extraStorage: { color: theme.palette.primary.main, fontWeight: 'bold' },
  extraStorageSize: { color: theme.palette.text.meta },
  extraStorageCaption: {
    color: theme.palette.text.meta,
    marginTop: theme.spacing(3)
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    paddingBottom: theme.spacing(3)
  },
  storageSliderContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: `0 ${theme.spacing(5)}px`,
    width: 300
  },
  storageTrackerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    padding: `0 ${theme.spacing(5)}px`
  },
  storagePercentContainer: {
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    padding: `0 ${theme.spacing(3)}px`
  },
  storagePieOuter: {
    width: 200,
    height: 200,
    borderRadius: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(4),
    position: 'relative',
    backgroundColor: theme.palette.grey[300]
  },
  storagePieInner: {
    width: 190,
    height: 190,
    borderRadius: 100,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2
  },
  storagePie: {
    position: 'absolute',
    zIndex: 1
  }
}))
