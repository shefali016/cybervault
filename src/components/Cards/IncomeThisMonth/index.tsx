import React from 'react'
import {
  LinearProgress,
  Card,
  CardContent,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { CENTER } from '../../../utils/constants/stringConstants'
import { BLACK_COLOR } from 'utils/constants/colorsConstants'
import { getCardHeight } from '../../../utils'

function IncomeThisMonth(props: {
  unpaidAmount?: number
  paidAmount?: number
  className?: string
}) {
  const classes = useStyles()
  return (
    <div className={'widgetItemResponsiveOuter'}>
      <Card className={'widgetItemWide'}>
        <CardContent>
          <Typography variant='h6' className={classes.title}>
            Income This Month
          </Typography>
          <Typography variant='subtitle1' className={classes.bodyText}>
            $ {props.unpaidAmount ? props.unpaidAmount : 0} Unpaid
          </Typography>
          <LinearProgress
            variant='determinate'
            className={classes.progressBar}
            value={props.unpaidAmount ? props.unpaidAmount : 50}
            style={{ marginBottom: 8 }}
          />
          <Typography variant='subtitle1' className={classes.bodyText}>
            $ {props.paidAmount ? props.paidAmount : 0} Paid
          </Typography>
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
  progressBar: {
    height: 18,
    borderRadius: 25,
    alignSelf: CENTER
  },
  title: {
    fontWeight: 600,
    margin: 0
  },
  bodyText: {
    margin: 0,
    marginTop: 8
  }
}))
export default IncomeThisMonth
