import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import clsx from 'clsx'
import { ColorThemes } from 'utils/enums'

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
    color: theme.palette.text.secondary,
    fontWeight: 500
  },
  section: {
    backgroundColor:
      theme.palette.colorTheme === ColorThemes.DARK
        ? theme.palette.background.secondary
        : theme.palette.background.default,
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    boxShadow: `0 0 10px 10px ${theme.palette.background.shadow}28`,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    },
    marginBottom: theme.spacing(4)
  }
}))

export default Section
