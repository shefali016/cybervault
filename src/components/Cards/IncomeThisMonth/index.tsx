import React from 'react'
import { LinearProgress, Card, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { CENTER } from '../../../utils/constants/stringConstants'
import { BLACK_COLOR } from 'utils/constants/colorsConstants'
import { getCardHeight } from '../../../utils'

function IncomeThisMonth(props: {
  unpaidAmount?: number
  paidAmount?: number
  style?: {}
}) {
  const classes = useStyles()
  return (
    <div style={props.style}>
      <Card className={classes.card}>
        <CardContent>
          <h5 className={classes.title}> Income This Month</h5>
          <h6 className={classes.bodyText}>
            {' '}
            $ {props.unpaidAmount ? props.unpaidAmount : 0} Unpaid
          </h6>
          <LinearProgress
            variant='determinate'
            className={classes.progressBar}
            value={props.unpaidAmount ? props.unpaidAmount : 50}
          />
          <h6 className={classes.bodyText}>
            {' '}
            $ {props.paidAmount ? props.paidAmount : 0} Paid
          </h6>
          <LinearProgress
            variant='determinate'
            className={classes.progressBar}
            value={props.paidAmount ? props.paidAmount : 50}
          />
        </CardContent>
      </Card>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: getCardHeight(theme),
    height: '10rem',
    borderRadius: 15
  },
  progressBar: {
    height: 18,
    borderRadius: 25,
    alignSelf: CENTER,
    marginTop: 8
  },
  title: {
    fontSize: '14px',
    color: BLACK_COLOR,
    fontWeight: 600,
    margin: 0
  },
  bodyText: {
    fontSize: '12px',
    color: BLACK_COLOR,
    margin: 0,
    marginTop: 8
  }
}))
export default IncomeThisMonth
