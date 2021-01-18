import { Typography } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import clsx from 'clsx'
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

  const [storageUsed, setStorageUsed] = useState<number>(0)

  const getTotalStorage = (account: Account) => {
    const { subscription } = account
    const { storage } = getSubscriptionDetails(
      subscription?.type || SubscriptionTypes.creator
    )
    const extraStorage = subscription?.extraStorage
    return storage + (extraStorage || 0)
  }

  const renderStorageTracker = () => {
    const totalStorage = getTotalStorage(account)

    return (
      <div className={classes.storageTrackerContainer}>
        <Typography variant={'h5'}>Manage Storage</Typography>
        <Typography variant={'caption'}>
          Your current storage plan is {totalStorage}
        </Typography>

        <div className={clsx(classes.storagePieOuter, 'verticalGradient')}>
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

  return (
    <Modal {...{ open, onRequestClose }} clickToClose={true}>
      <div className={'modalContent'}>
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
        <div className={classes.content}>{renderStorageTracker()}</div>
      </div>
    </Modal>
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
  content: { display: 'flex' },
  storageTrackerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  storagePercentContainer: {
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center'
  },
  storagePieOuter: {
    width: 200,
    height: 200,
    borderRadius: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(4)
  },
  storagePieInner: {
    width: 190,
    height: 190,
    borderRadius: 100,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
}))
