import React from 'react'
import { TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  root: {
    background: '#e6e6e6',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  }
}

const AppTextField = (props: any) => {
  const { classes, ...rest } = props
  return <TextField className={classes.label} variant='filled' {...rest} />
}

export default withStyles(styles)(AppTextField)
