import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import logo from '../../../assets/logo.png'
import { makeStyles } from '@material-ui/core/styles'
import {
  BLOCK,
  BOLD,
  CENTER,
  GRID,
  FLEX,
  AUTO
} from 'utils/constants/stringConstants'
import {
  GREY_COLOR,
  SECONDARY_COLOR,
  WHITE_COLOR
} from 'utils/constants/colorsConstants'
import clsx from 'clsx'

type Props = {
  projectDetails?: any
  openProject?: any
  style?: {}
}

function UnpaidInvoices(props: Props) {
  const classes = useStyles()
  return (
    <div style={props.style}>
      <Card className={clsx('card', classes.card)}>
        <div className={classes.imgWrapper}>
          <img
            className={'coverImage'}
            src={
              props.projectDetails && props.projectDetails.image
                ? props.projectDetails.image
                : logo
            }
            alt='Logo'
          />
        </div>
        <div className={classes.textWrapper}>
          <Typography className={classes.bodyText} variant='subtitle1'>
            {props.projectDetails && props.projectDetails.name
              ? props.projectDetails.name
              : 'Nike Summer Campaign'}
          </Typography>
          <Typography className={classes.bottomText} variant='caption'>
            {props.projectDetails && props.projectDetails.value
              ? props.projectDetails.value
              : 'Doc 2016 campaign with audi Q6'}
          </Typography>
        </div>
      </Card>
    </div>
  )
}
const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
    minWidth: 200,
    background: theme.palette.background.secondary,
    borderRadius: 10,
    cursor: 'pointer'
  },
  imgWrapper: {
    backgroundColor: WHITE_COLOR,
    borderRadius: 10,
    marginRight: theme.spacing(1),
    width: 60,
    height: 60,
    position: 'relative',
    overflow: 'hidden'
  },
  bodyText: {
    fontWeight: BOLD,
    color: theme.palette.text.background
  },
  textWrapper: {
    marginLeft: 5
  },
  bottomText: {
    fontWeight: BOLD,
    color: theme.palette.text.meta
  }
}))
export default UnpaidInvoices
