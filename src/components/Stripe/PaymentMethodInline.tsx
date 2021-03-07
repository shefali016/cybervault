import React, { useMemo } from 'react'
import { PaymentMethod } from '@stripe/stripe-js'
import { getCardIcon } from './utils'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

type Props = {
  paymentMethod: PaymentMethod
}

export const PaymentMethodInline = ({ paymentMethod }: Props) => {
  const classes = useStyles()

  const CardIcon = useMemo(() => getCardIcon(paymentMethod.card?.brand), [
    paymentMethod.card?.brand
  ])

  if (!paymentMethod.card) {
    return null
  }

  return (
    <div className={classes.cardContainer}>
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
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    borderRadius: theme.shape.borderRadius,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.background.surfaceHighlight,
    overflow: 'hidden'
  },
  cardContainer: {
    padding: `${theme.spacing(1)}px ${theme.spacing(1)}px`,
    display: 'flex',
    alignItems: 'center'
  },
  cardTextContainer: { marginLeft: theme.spacing(2) },
  cardLast4: { fontWeight: 'bold', fontSize: 18 },
  cardIcon: { fontSize: 40, color: theme.palette.text.meta },
  cardMeta: { color: theme.palette.text.meta }
}))
