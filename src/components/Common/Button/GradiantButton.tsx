import React from 'react'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import ReactLoading from 'react-loading'

export const GradiantButton = (props: any) => {
  const classes = useStyles()
  return (
    <Button
      color={'primary'}
      variant={'contained'}
      {...props}
      className={clsx(classes.button, props.className)}>
      {props.children}
      {props.loading && (
        <ReactLoading
          type={'spinningBubbles'}
          color={'#fff'}
          height={20}
          width={20}
          className={classes.spinner}
        />
      )}
    </Button>
  )
}

const useStyles = makeStyles((theme) => ({
  button: {
    background: `linear-gradient(90deg, ${theme.palette.primary.light},  ${theme.palette.primary.dark})`,
    minWidth: 150,
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5)
  },
  spinner: { marginLeft: 10 }
}))
