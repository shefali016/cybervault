import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import { BOLD } from '../../utils/constants/stringConstants'

type Props = {
  title: string
  subtitle: string
}

const NewProjectTitle = ({ title, subtitle }: Props) => {
  const classes = useStyles()
  return (
    <div style={{ marginBottom: 40 }}>
      <Typography variant={'h5'} className={classes.headerTitle}>
        {title}
      </Typography>
      <Typography variant={'body2'}>{subtitle}</Typography>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  headerTitle: {
    fontWeight: BOLD,
  },
}))

export default NewProjectTitle