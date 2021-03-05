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
import CloseButton from 'components/Common/Button/CloseButton'
import { GradiantButton } from 'components/Common/Button/GradiantButton'
import { PaymentMethodInline } from 'components/Stripe/PaymentMethodInline'
import { useState } from 'react'
import Modal from '../Modal'

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
      <div className={'modalContent'}>
        <CloseButton
          onClick={onRequestClose}
          style={{ position: 'absolute', top: 10, right: 10 }}
        />
        <div className={classes.header}>
          <Typography variant={'h4'}>Select Payment Method</Typography>
        </div>
        <List dense>
          {paymentMethods && paymentMethods.length
            ? paymentMethods.map((data: PaymentMethod, index: number) => {
                const labelId = `payment-method-${index}`
                return (
                  <ListItem key={index} button>
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
  saveButton: { marginTop: theme.spacing(1) }
}))

export default PaymentMethodModal
