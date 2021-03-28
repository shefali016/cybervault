import { Typography } from '@material-ui/core'
import { GradiantButton } from 'components/Common/Button/GradiantButton'
import AppModal from 'components/Common/Modal'
import React, { useContext, useState } from 'react'
import { Elements, CardElement, injectStripe } from 'react-stripe-elements'
import { PaymentMethod } from '@stripe/stripe-js'
import { attachPaymentMethod } from 'actions/stripeActions'
import { ToastContext, ToastTypes } from 'context/Toast'
import CloseButton from 'components/Common/Button/CloseButton'
import { useDispatch, useSelector } from 'react-redux'
import { ReduxState } from 'reducers/rootReducer'
import { useOnChange } from 'utils/hooks'

type CardInputElementProps = {
  customerId: string
  onPaymentMethodCreated?: (paymentMethod: PaymentMethod) => void
  saveOnCreate?: boolean
  directCheckout?: boolean
  handleCreateCharge?: (token: any) => void
  waitUntilAttached?: boolean
}

export const CardInputElement = injectStripe(
  ({
    directCheckout,
    elements,
    stripe,
    saveOnCreate = true,
    onPaymentMethodCreated,
    handleCreateCharge,
    waitUntilAttached
  }: CardInputElementProps & any) => {
    const toastContext = useContext(ToastContext)

    const dispatch = useDispatch()
    const paymentAttachedSuccess = useSelector(
      (state: ReduxState) => state.stripe.attachSuccess
    )

    const [loading, setLoading] = useState(false)
    const [
      paymentMethodPendingAttach,
      setPaymethodPendingAttach
    ] = useState<PaymentMethod | null>(null)

    useOnChange(paymentAttachedSuccess, (success: boolean) => {
      console.log(success, paymentMethodPendingAttach)
      if (success && paymentMethodPendingAttach) {
        onSuccess(paymentMethodPendingAttach)
      }
    })

    const onSuccess = (paymentMethod: PaymentMethod) => {
      if (typeof onPaymentMethodCreated === 'function') {
        onPaymentMethodCreated(paymentMethod)
      }
      toastContext.showToast({
        title: 'Card added!',
        type: ToastTypes.success
      })
      setLoading(false)
    }

    const handleSubmit = (e: any) => {
      setLoading(true)

      e.preventDefault()

      const cardElement = elements.getElement('card')
      if (directCheckout) {
        stripe
          .createToken({ type: 'card' })
          .then((result: any) => {
            if (result.error) {
              // Show error to your customer.
              console.log(result.error.message)
              toastContext.showToast({ title: result.error.message })
            } else {
              setLoading(false)
              handleCreateCharge(result.token)
            }
          })
          .catch((error: any) => {
            console.log('Failed to pay for invoice', error)
            toastContext.showToast({ title: 'Failed to pay for invoice' })
            setLoading(false)
          })
      } else {
        stripe
          .createPaymentMethod({
            type: 'card',
            card: cardElement
          })
          .then(({ paymentMethod }: { paymentMethod: PaymentMethod }) => {
            if (paymentMethod && paymentMethod.id) {
              if (saveOnCreate) {
                dispatch(attachPaymentMethod(paymentMethod))
              }
              return paymentMethod
            } else {
              setLoading(false)
            }
          })
          .then((paymentMethod: PaymentMethod) => {
            if (paymentMethod) {
              if (waitUntilAttached) {
                setPaymethodPendingAttach(paymentMethod)
              } else {
                onSuccess(paymentMethod)
              }
            }
          })
          .catch((error: any) => {
            console.log('Failed to create payment method', error)
            toastContext.showToast({ title: 'Failed to add card' })
            setLoading(false)
          })
      }
    }

    return (
      <form onSubmit={handleSubmit}>
        <Typography variant='h6' style={{ marginBottom: 20 }}>
          Enter your card details
        </Typography>

        <CardElement
          onReady={(el) => el.focus()}
          style={{ base: { fontSize: '18px', fontWeight: 400 } }}
        />

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <GradiantButton
            type='submit'
            style={{ marginTop: 30, alignSelf: 'center' }}
            loading={loading}>
            {directCheckout ? 'Pay Invoice' : 'Save'}
          </GradiantButton>
        </div>
      </form>
    )
  }
)

export const CardInput = ({
  customerId,
  onPaymentMethodCreated,
  directCheckout,
  handleCreateCharge,
  waitUntilAttached
}: CardInputElementProps) => {
  return (
    <Elements>
      <CardInputElement
        customerId={customerId}
        onPaymentMethodCreated={onPaymentMethodCreated}
        directCheckout={directCheckout}
        handleCreateCharge={handleCreateCharge}
        waitUntilAttached={waitUntilAttached}
      />
    </Elements>
  )
}

type CardModalProps = {
  open: boolean
  onRequestClose: () => void
  directCheckout?: boolean
  customerId?: string
  handleCreateCharge?: (token: any) => void
} & CardInputElementProps

export const CardModal = ({
  open,
  onRequestClose,
  customerId,
  directCheckout,
  handleCreateCharge,
  onPaymentMethodCreated,
  waitUntilAttached
}: CardModalProps) => {
  return (
    <AppModal open={open} onRequestClose={onRequestClose} clickToClose={true}>
      <div className='modalContent'>
        <CloseButton onClick={onRequestClose} className={'modalCloseButton'} />
        <CardInput
          customerId={customerId}
          directCheckout={directCheckout}
          onPaymentMethodCreated={onPaymentMethodCreated}
          handleCreateCharge={handleCreateCharge}
          waitUntilAttached={waitUntilAttached}
        />
      </div>
    </AppModal>
  )
}
