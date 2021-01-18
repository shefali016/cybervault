import React from 'react'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import ReactLoading from 'react-loading'

type Props = {
  children?: React.ReactElement
  loading?: boolean
  className?: string
} & any

export const GradiantButton = (props: Props) => {
  const classes = useStyles()
  return (
    <Button
      color={'primary'}
      variant={'contained'}
      className={clsx(classes.button, props.className)}
      {...props}>
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
    minWidth: 200,
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5)
  },
  spinner: { marginLeft: 10 }
}))
