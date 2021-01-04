import React from 'react'
import { LinearProgress, Card, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { CENTER, GRID } from 'utils/constants/stringConstants'
import { BLACK_COLOR } from 'utils/constants/colorsConstants'
import clsx from 'clsx'

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
        <h5 className={classes.Title}> Invoices Pending</h5>
        <h6 className={classes.BodyText}>
          {' '}
          $ {props.unpaidAmount ? props.unpaidAmount : 0} Unpaid
        </h6>
        <LinearProgress
          className={classes.progressBar}
          variant='determinate'
          value={props.unpaidAmount ? props.unpaidAmount : 50}
        />
        <h6 className={classes.BodyText}>
          {' '}
          $ {props.paidAmount ? props.paidAmount : 0} Paid
        </h6>
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
    display: GRID,
    width: '10rem',
    height: '10rem',
    borderRadius: 15
  },
  progressBar: {
    width: 120,
    height: 18,
    borderRadius: 25,
    alignSelf: CENTER,
    marginTop: 8
  },
  Title: {
    fontSize: '14px',
    color: BLACK_COLOR,
    fontWeight: 600,
    margin: 0
  },
  BodyText: {
    fontSize: '12px',
    color: BLACK_COLOR,
    margin: 0,
    marginTop: 8
  }
}))

export default PendingInvoices
