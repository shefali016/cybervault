import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import { BOLD } from '../../../utils/constants/stringConstants'

type Props = {
  title: string
  subtitle?: string
}

const ModalTitle = ({ title, subtitle }: Props) => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <Typography variant={'h5'} className={classes.headerTitle}>
        {title}
      </Typography>
      {!!subtitle && <Typography variant={'body2'}>{subtitle}</Typography>}
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  container: { marginBottom: theme.spacing(3) },
  headerTitle: {
    fontWeight: BOLD
  }
}))

export default ModalTitle
