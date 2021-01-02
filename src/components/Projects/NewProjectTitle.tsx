import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import { BOLD } from '../../utils/constants/stringConstants'
import { useTabletLayout } from '../../utils/hooks'

type Props = {
  title: string
  subtitle: string
}

const NewProjectTitle = ({ title, subtitle }: Props) => {
  const classes = useStyles()
  const isTablet = useTabletLayout()
  return (
    <div style={{ marginBottom: 40, maxWidth: isTablet ? 260 : '100%' }}>
      <Typography variant={'h5'} className={classes.headerTitle}>
        {title}
      </Typography>
      <Typography variant={'body2'}>{subtitle}</Typography>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  headerTitle: {
    fontWeight: BOLD
  }
}))

export default NewProjectTitle
