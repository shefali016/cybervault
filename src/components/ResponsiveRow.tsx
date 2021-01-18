import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

type Props = {
  children: Array<React.ReactElement>
}

export const ResponsiveRow = ({ children }: Props) => {
  const classes = useStyles()

  const [ele1, ele2] = children

  return (
    <div className={classes.row}>
      {ele1}
      <div className={classes.ele2}>{ele2}</div>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  row: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  ele2: {
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(3)
    }
  }
}))
