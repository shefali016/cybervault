import React, { useContext, useState } from 'react'
import { PaymentMethod } from '@stripe/stripe-js'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import { getCardIcon } from './utils'
import { AppButton } from 'components/Common/Core/AppButton'
import { CardModal } from './CardModal'
import clsx from 'clsx'
import { ConfirmationDialog } from 'components/Common/Dialog/ConfirmationDialog'
import { useDispatch, useSelector } from 'react-redux'
import {
  detachPaymentMethod,
  setDefultPaymentMethod
} from 'actions/stripeActions'
import { useOnChange } from 'utils/hooks'
import { ToastContext, ToastTypes } from 'context/Toast'
import { ReduxState } from 'reducers/rootReducer'

type Props = {
  paymentMethods: Array<PaymentMethod>
  customerId: string
  defaultPaymentMethod: string
}

export const PaymentMethodList = ({
  paymentMethods,
  customerId,
  defaultPaymentMethod
}: Props) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const {
    detachError,
    detachSuccess,
    attachError,
    attachSuccess,
    setAsDefaultError,
    setAsDefaultSuccess
  } = useSelector((state: ReduxState) => {
    const {
      detachError,
      detachSuccess,
      attachError,
      attachSuccess,
      setAsDefaultError,
      setAsDefaultSuccess
    } = state.stripe
    return {
      detachError,
      detachSuccess,
      attachError,
      attachSuccess,
      setAsDefaultError,
      setAsDefaultSuccess
    }
  })

  // Toast handling
  const toastContext = useContext(ToastContext)

  useOnChange(detachError, (error: string | null) => {
    if (error) {
      toastContext.showToast({
        title: 'Failed to remove card. Please try again.'
      })
    }
  })

  useOnChange(setAsDefaultSuccess, (success: boolean) => {
    if (success) {
      toastContext.showToast({
        title: 'Card set as Default',
        type: ToastTypes.success
      })
    }
  })

  useOnChange(setAsDefaultError, (error: string | null) => {
    if (error) {
      toastContext.showToast({
        title: 'Failed to set card as default. Please try again.'
      })
    }
  })

  useOnChange(detachSuccess, (success: boolean) => {
    if (success) {
      toastContext.showToast({
        title: 'Card removed',
        type: ToastTypes.success
      })
    }
  })

  useOnChange(attachError, (error: string | null) => {
    if (error) {
      toastContext.showToast({
        title: 'Failed to add card. Please try again.'
      })
    }
  })

  useOnChange(attachSuccess, (success: boolean) => {
    if (success) {
      toastContext.showToast({
        title: 'Card added',
        type: ToastTypes.success
      })
      setCardModalOpen(false)
    }
  })

  // Card Modal

  const [cardModalOpen, setCardModalOpen] = useState(false)
  const toggleCardModal = (open: boolean) => () => setCardModalOpen(open)

  //Attach Default Payment Method

  const [
    confirmingAttachDefaultPayment,
    setConfirmingAttachDefaultPayment
  ] = useState<PaymentMethod | null>(null)

  // Detaching PaymentMethod

  const [
    confirmingDetach,
    setConfirmingDetach
  ] = useState<PaymentMethod | null>(null)

  const toggleConfirmDetach = (paymentMethod: PaymentMethod | null) => () =>
    setConfirmingDetach(paymentMethod)

  const toggleconfirmingAttachDefaultPayment = (
    paymentMethod: PaymentMethod | null
  ) => () => setConfirmingAttachDefaultPayment(paymentMethod)

  const handleDetach = () => {
    if (confirmingDetach) {
      dispatch(detachPaymentMethod(confirmingDetach))
      setConfirmingDetach(null)
    }
  }

  const handleAttachPaymentMethod = () => {
    if (confirmingAttachDefaultPayment) {
      dispatch(setDefultPaymentMethod(confirmingAttachDefaultPayment.id))
      setConfirmingAttachDefaultPayment(null)
    }
  }

  const renderCard = (paymentMethod: PaymentMethod) => {
    if (!paymentMethod.card) return null

    const CardIcon = getCardIcon(paymentMethod.card.brand)

    return (
      <div
        className={clsx(classes.cardContainer, classes.listItem)}
        key={paymentMethod.id}>
        <div className={classes.cardInfoContainer}>
          <CardIcon className={classes.cardIcon} />
          <div className={classes.cardTextContainer}>
            <Typography variant='body1' className={classes.cardLast4}>
              •••• {paymentMethod.card.last4}
            </Typography>
            <Typography variant='caption' className={classes.cardMeta}>
              Expires {paymentMethod.card.exp_month}/
              {paymentMethod.card.exp_year.toString().substring(2)}
            </Typography>
          </div>
        </div>
        <div className={classes.footer}>
          <div className={classes.primaryCardTitleContainer}></div>
          <AppButton onClick={toggleConfirmDetach(paymentMethod)}>
            <Typography className={classes.buttonText}>Remove</Typography>
          </AppButton>
          <AppButton
            disabled={defaultPaymentMethod === paymentMethod.id ? true : false}
            onClick={toggleconfirmingAttachDefaultPayment(paymentMethod)}>
            <Typography className={classes.buttonText}>
              {defaultPaymentMethod === paymentMethod.id
                ? 'Primary Method'
                : 'Set as primary'}
            </Typography>
          </AppButton>
        </div>
      </div>
    )
  }

  const renderAddCard = () => (
    <div
      className={clsx('dashBox', classes.addCard, classes.listItem)}
      onClick={toggleCardModal(true)}>
      <Typography>Add payment method</Typography>
    </div>
  )

  const renderSpacer = () => {
    return (
      !!paymentMethods.length &&
      paymentMethods.length % 2 === 0 && <div className={classes.listItem} />
    )
  }

  return (
    <div className={classes.container}>
      <div className={classes.innerContainer}>
        {paymentMethods
          .slice()
          .reverse()
          .map((paymentMethod: PaymentMethod) => renderCard(paymentMethod))}
        {renderAddCard()}
        {renderSpacer()}
      </div>
      <CardModal
        open={cardModalOpen}
        onRequestClose={toggleCardModal(false)}
        customerId={customerId}
      />
      <ConfirmationDialog
        title={
          confirmingDetach
            ? 'Remove payment method'
            : 'Set as default payment method'
        }
        message={`Are you sure you want to ${
          confirmingDetach ? 'remove' : 'set as default'
        } this payment method. ${
          confirmingDetach ? 'This cannot be undone.' : ''
        }`}
        isOpen={!!confirmingDetach || !!confirmingAttachDefaultPayment}
        onYes={!!confirmingDetach ? handleDetach : handleAttachPaymentMethod}
        onNo={
          !!confirmingDetach
            ? toggleConfirmDetach(null)
            : toggleconfirmingAttachDefaultPayment(null)
        }
        onClose={
          !!confirmingDetach
            ? toggleConfirmDetach(null)
            : toggleconfirmingAttachDefaultPayment(null)
        }
      />
    </div>
  )
}

const CARD_HEIGHT = 200
const WIDTH = 400

const useStyles = makeStyles((theme) => ({
  container: { display: 'flex', justifyContent: 'center' },
  innerContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    maxWidth: 1200
  },
  listItem: {
    flex: 1,
    [theme.breakpoints.up(530)]: {
      minWidth: WIDTH,
      marginLeft: 20,
      marginRight: 20
    }
  },
  addCard: {
    marginBottom: theme.spacing(4),
    display: 'flex',
    minHeight: CARD_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardContainer: {
    marginBottom: theme.spacing(4),
    minHeight: CARD_HEIGHT,
    borderRadius: theme.shape.borderRadius,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.background.surfaceHighlight,
    display: 'flex',
    flexDirection: 'column'
  },
  cardInfoContainer: {
    padding: `${theme.spacing(3)}px ${theme.spacing(4)}px`,
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    [theme.breakpoints.down(530)]: {
      flexDirection: 'column-reverse'
    }
  },
  cardTextContainer: {
    marginLeft: theme.spacing(4),
    [theme.breakpoints.down(530)]: {
      marginLeft: 0,
      marginBottom: theme.spacing(2)
    }
  },
  cardLast4: { fontWeight: 'bold', fontSize: 20 },
  cardIcon: {
    fontSize: 80,
    color: theme.palette.grey[300],
    [theme.breakpoints.down(530)]: { fontSize: '40vw' }
  },
  cardMeta: { color: theme.palette.text.meta, fontSize: 14 },
  footer: {
    padding: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderTopColor: theme.palette.background.surfaceHighlight
  },
  primaryCardTitleContainer: { flex: 1 },
  buttonText: {
    color: theme.palette.primary.light
  }
}))
