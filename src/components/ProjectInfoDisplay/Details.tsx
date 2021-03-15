import React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { ROW, FLEX } from 'utils/constants/stringConstants'
import { GREY_COLOR } from 'utils/constants/colorsConstants'

type Props = {
  label: string
  value?: string
  startDate?: string
  endDate?: string
}

export const Details = ({ label, value, startDate, endDate }: Props) => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <Typography variant={'body1'} className={classes.label}>
        {label}
      </Typography>
      <Typography variant={'body1'}>
        {' '}
        {startDate ? `Start Date:  {startDate}` : value}
      </Typography>
      {endDate ? (
        <Typography style={{ marginLeft: 20 }} variant={'body1'}>
          {'End Date:  '} {endDate}
        </Typography>
      ) : null}
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: FLEX,
    marginTop: 10,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  label: { fontWeight: 'bold', minWidth: 220 }
}))
