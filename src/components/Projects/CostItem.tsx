import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

type Props = {
  value: number
  title: string
}

export const CostItem = ({ value, title }: Props) => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <Typography variant='body1' className={classes.label}>
        ${value}
      </Typography>
      <Typography variant='body1'>{title}</Typography>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1.2),
    padding: '2px 0',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  label: {
    fontWeight: 'bold',
    marginRight: 20,
    color: '#fff',
    backgroundColor: theme.palette.primary.dark,
    padding: `2px 10px`,
    borderRadius: 40
  }
}))
