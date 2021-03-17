import React from 'react'
import {
  LinearProgress,
  Card,
  CardContent,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { CENTER, GRID } from 'utils/constants/stringConstants'
import { BLACK_COLOR } from 'utils/constants/colorsConstants'
import clsx from 'clsx'
import { getCardHeight } from '../../../utils'

type Props = {
  unpaidAmount?: number
  paidAmount?: number
  className?: {}
}

function PendingInvoices(props: Props) {
  const classes = useStyles()
  return (
    <Card className={clsx(classes.card, props.className)}>
      <CardContent>
        <Typography variant='h6' className={classes.Title}>
          Invoices Pending
        </Typography>
        <Typography variant='subtitle1' className={classes.BodyText}>
          $ {props.unpaidAmount ? props.unpaidAmount : 0} Unpaid
        </Typography>
        <LinearProgress
          className={classes.progressBar}
          variant='determinate'
          value={props.unpaidAmount ? props.unpaidAmount : 50}
          style={{ marginBottom: 8 }}
        />
        <Typography variant='subtitle1' className={classes.BodyText}>
          $ {props.paidAmount ? props.paidAmount : 0} Paid
        </Typography>
        <LinearProgress
          className={classes.progressBar}
          variant='determinate'
          value={props.paidAmount ? props.paidAmount : 50}
        />
      </CardContent>
    </Card>
  )
}
const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minWidth: getCardHeight(theme),
    height: '12rem',
    borderRadius: 15,
    padding: 5
  },
  progressBar: {
    height: 18,
    borderRadius: 25,
    alignSelf: CENTER
  },
  Title: {
    fontWeight: 'bold',
    margin: 0
  },
  BodyText: {
    margin: 0,
    marginTop: 8
  }
}))

export default PendingInvoices
