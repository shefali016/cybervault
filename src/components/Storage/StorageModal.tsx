import React, { useState } from 'react'
import { Box, Typography } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { PaymentMethod } from '@stripe/stripe-js'
import clsx from 'clsx'
import CloseButton from 'components/Common/Button/CloseButton'
import { GradiantButton } from 'components/Common/Button/GradiantButton'
import { AppCircularProgress } from 'components/Common/Core/AppCircularProgress'
import { AppSlider } from 'components/Common/Core/AppSlider'
import Modal from 'components/Common/Modal'
import PaymentMethodModal from 'components/Common/PaymentMethodModal'
import { bytesToGB, getAvailableStorage } from 'utils/helpers'
import { getSubscriptionDetails } from 'utils/subscription'
import { Account, Product, Subscription } from '../../utils/Interface'

type Props = {
  open: boolean
  onRequestClose: () => void
  account: Account
  accountSubscription: Subscription | undefined
  storageSubscription: Subscription | undefined
  paymentMethods: Array<PaymentMethod>
  customerId: string
  createAmountSubscription: (
    price: number,
    paymentMethodId: string,
    extraStorage: number,
    productId: string
  ) => void
  storageProduct: Product
  storagePurchaseLoading: boolean
  usedStorage: number
}

export const StorageModal = ({
  open,
  onRequestClose,
  accountSubscription,
  storageSubscription,
  paymentMethods,
  createAmountSubscription,
  storageProduct,
  storagePurchaseLoading,
  usedStorage
}: Props) => {
  const classes = useStyles()
  const theme = useTheme()

  const [paymentModal, setPaymentModal] = useState<boolean>(false)

  const [extraStorage, setExtraStorage] = useState<number>(
    typeof storageSubscription?.metadata?.extraStorage === 'string'
      ? parseInt(storageSubscription?.metadata?.extraStorage)
      : 0
  )

  const getTotalStorage = () => {
    const { storage } = getSubscriptionDetails(
      accountSubscription?.metadata?.type
    )
    return storage + extraStorage
  }

  const handleBuyStorage = () => {
    setPaymentModal(!paymentModal)
    // Charge user immediately for the different in previous extra storage and increased extra storage
    // Increase their monthly subscription accordingly
  }
  const handlePayment = async (paymentMethod: PaymentMethod) => {
    const amount: any = Math.floor(extraStorage * 0.2).toFixed(2)
    const price = amount * 100
    setPaymentModal(!paymentModal)
    createAmountSubscription(
      price,
      paymentMethod.id,
      extraStorage,
      storageProduct.id
    )
  }

  const renderStorageTracker = () => {
    const totalStorage: number = getTotalStorage()
    const {
      usedStoragePercent,
      availablePercentage
    }: any = getAvailableStorage(usedStorage, totalStorage)
    return (
      <div className={classes.storageTrackerContainer}>
        <div className={classes.storagePieOuter}>
          <AppCircularProgress
            variant='determinate'
            value={usedStoragePercent}
            color='primary'
            className={classes.storagePie}
            size={200}
            thickness={2}
          />
          <div className={classes.storagePieInner}>
            <div className={classes.storagePercentContainer}>
              <Typography variant='h3' style={{ marginRight: 4 }}>
                {availablePercentage.toFixed(2)}
              </Typography>
              <Typography variant='h6'> %</Typography>
            </div>
            <Typography variant='body1'>available</Typography>
          </div>
        </div>

        <div
          className={'row'}
          style={{
            marginTop: theme.spacing(3),
            color: theme.palette.text.meta
          }}>
          <div style={{ textAlign: 'center' }}>
            <Typography variant={'h5'}>
              {bytesToGB(usedStorage).toFixed(1)}GB
            </Typography>
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
        <PaymentMethodModal
          open={paymentModal}
          onRequestClose={() => setPaymentModal(!paymentModal)}
          paymentMethods={paymentMethods}
          handleSubscription={handlePayment}
        />
      </div>
    )
  }

  const renderStorageSlider = () => {
    return (
      <div className={classes.storageSliderContainer}>
        <Typography variant={'h5'}>Extra Storage</Typography>
        <Typography variant={'caption'}>
          Add storage to upload more content
        </Typography>
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
        <Box display={'flex'}>
          <GradiantButton
            onClick={handleBuyStorage}
            className={classes.applyButton}>
            Apply
          </GradiantButton>
        </Box>
      </div>
    )
  }

  return (
    <Modal
      {...{ open, onRequestClose }}
      clickToClose={true}
      showLoadingOverlay={storagePurchaseLoading}>
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
  content: {
    display: 'flex',
    flex: 1,
    [theme.breakpoints.down('sm')]: { flexDirection: 'column' }
  },
  extraStorage: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    marginTop: theme.spacing(2)
  },
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
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(3)
    }
  },
  storageSliderContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: `0 ${theme.spacing(5)}px`,
    width: 300,
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(8),
      width: 'auto'
    }
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
    justifyContent: 'center'
  },
  storagePie: {
    position: 'absolute'
  }
}))
