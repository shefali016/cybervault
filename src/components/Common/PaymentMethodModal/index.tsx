import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Radio,
  Typography
} from '@material-ui/core'
import { PaymentMethod } from '@stripe/stripe-js'
import clsx from 'clsx'
import CloseButton from 'components/Common/Button/CloseButton'
import { GradiantButton } from 'components/Common/Button/GradiantButton'
import { PaymentMethodInline } from 'components/Stripe/PaymentMethodInline'
import { useState } from 'react'
import Modal from '../Modal'
import ModalTitle from '../Modal/ModalTitle'

type Props = {
  open: boolean
  onRequestClose: () => void
  paymentMethods: Array<PaymentMethod>
  handleSubscription: (paymentMethod: PaymentMethod) => void
}
const PaymentMethodModal = ({
  open,
  onRequestClose,
  paymentMethods,
  handleSubscription
}: Props) => {
  const classes = useStyles()
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    PaymentMethod | any
  >({})
  const handlePaymentSelect = (
    payment: PaymentMethod,
    selectedIndex: number
  ) => {
    const selectedPaymentMethod = {
      ...payment,
      index: selectedIndex
    }
    setSelectedPaymentMethod(selectedPaymentMethod)
  }

  return (
    <Modal open={open} onRequestClose={onRequestClose} clickToClose={true}>
      <div className={'modalContentNoScroll'}>
        <CloseButton
          onClick={onRequestClose}
          style={{ position: 'absolute', top: 10, right: 10 }}
        />
        <ModalTitle title={'Select Payment Method'} />
        <List dense className={'scrollY'}>
          {paymentMethods && paymentMethods.length
            ? paymentMethods.map((data: PaymentMethod, index: number) => {
                const labelId = `payment-method-${index}`
                return (
                  <ListItem
                    key={index}
                    button
                    onClick={() => handlePaymentSelect(data, index)}>
                    <ListItemText
                      id={labelId}
                      primary={<PaymentMethodInline paymentMethod={data} />}
                    />
                    <ListItemSecondaryAction>
                      <Radio
                        checked={selectedPaymentMethod.index === index}
                        onChange={() => handlePaymentSelect(data, index)}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                )
              })
            : null}
        </List>
        <GradiantButton
          disabled={selectedPaymentMethod ? false : true}
          onClick={() => handleSubscription(selectedPaymentMethod)}
          className={classes.saveButton}>
          <Typography variant='button'>Submit</Typography>
        </GradiantButton>
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
  saveButton: { marginTop: theme.spacing(3) }
}))

export default PaymentMethodModal
