import { Typography } from '@material-ui/core'
import { GradiantButton } from 'components/Common/Button/GradiantButton'
import AppModal from 'components/Common/Modal'
import React, { useContext } from 'react'
import { Elements, CardElement, injectStripe } from 'react-stripe-elements'
import { PaymentMethod } from '@stripe/stripe-js'
import { attachPaymentMethod } from 'apis/stripe'
import { ToastContext, ToastTypes } from 'context/Toast'
import CloseButton from 'components/Common/Button/CloseButton'

type CardInputElementProps = {
  customerId: string
  onPaymentMethodCreated?: (paymentMethod: PaymentMethod) => void
  saveOnCreate?: boolean
}

export const CardInputElement = injectStripe(
  ({
    customerId,
    elements,
    stripe,
    saveOnCreate = true,
    onPaymentMethodCreated
  }: CardInputElementProps & any) => {
    const toastContext = useContext(ToastContext)

    const handleSubmit = (e: any) => {
      e.preventDefault()

      const cardElement = elements.getElement('card')

      stripe
        .createPaymentMethod({
          type: 'card',
          card: cardElement,
          billing_details: { name: 'Jenny Rosen' }
        })
        .then(({ paymentMethod }: { paymentMethod: PaymentMethod }) => {
          if (paymentMethod && paymentMethod.id) {
            if (saveOnCreate) {
              return attachPaymentMethod(paymentMethod.id, customerId)
            }
            return paymentMethod
          }
        })
        .then((paymentMethod: PaymentMethod) => {
          if (typeof onPaymentMethodCreated === 'function') {
            onPaymentMethodCreated(paymentMethod)
          }
          toastContext.showToast({
            title: 'Card added!',
            type: ToastTypes.success
          })
        })
        .catch((error: any) => {
          console.log('Failed to create payment method', error)
          toastContext.showToast({ title: 'Failed to add card' })
        })
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
            style={{ marginTop: 30, alignSelf: 'center' }}>
            Save
          </GradiantButton>
        </div>
      </form>
    )
  }
)

export const CardInput = ({ customerId }: CardInputElementProps) => {
  return (
    <Elements>
      <CardInputElement customerId={customerId} />
    </Elements>
  )
}

type CardModalProps = {
  open: boolean
  onRequestClose: () => void
} & CardInputElementProps

export const CardModal = ({
  open,
  onRequestClose,
  customerId
}: CardModalProps) => {
  return (
    <AppModal open={open} onRequestClose={onRequestClose} clickToClose={true}>
      <div className='modalContent'>
        <CloseButton onClick={onRequestClose} className={'modalCloseButton'} />
        <CardInput customerId={customerId} />
      </div>
    </AppModal>
  )
}
