import React from 'react'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

export const GradiantButton = (props: any) => {
  const classes = useStyles()
  return (
    <Button className={clsx(classes.button, props.className)} {...props}>
      {props.children}
    </Button>
  )
}

const useStyles = makeStyles((theme) => ({
  button: {
    background: `linear-gradient(90deg, ${theme.palette.primary.light},  ${theme.palette.primary.dark})`
  }
}))
