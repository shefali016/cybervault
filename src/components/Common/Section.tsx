import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import clsx from 'clsx'

type Props = {
  title?: string
  children: React.ReactElement
  className?: string
  style?: {}
}

const Section = ({ title, children, className, style }: Props) => {
  const classes = useStyles()
  return (
    <div className={clsx(classes.section, className)} style={style}>
      {!!title && (
        <Typography variant='h6' className={classes.sectionTitle}>
          {title}
        </Typography>
      )}
      <Typography className={classes.sectionTitle}></Typography>
      {children}
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  sectionTitle: {
    marginBottom: theme.spacing(2),
    color: theme.palette.grey[300]
  },
  section: {
    backgroundColor: theme.palette.background.secondary,
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,

    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  }
}))

export default Section
