import React from 'react'
import './GoogleAuth.css'
import { Button, Typography } from '@material-ui/core'
import googleIcon from '../../assets/google-icon.jpg'
import { makeStyles } from '@material-ui/core/styles'
import { AUTO } from '../../utils/constants/stringConstants'
import clsx from 'clsx'

type Props = { title: string; onClick: () => void; className: any }

export const GoogleAuthComponent = ({ onClick, title, className }: Props) => {
  const classes = useStyles()
  return (
    <Button
      className={clsx(classes.button, className)}
      variant='contained'
      onClick={onClick}>
      <img src={googleIcon} alt='google icon' className={classes.icon} />
      <Typography>{title}</Typography>
    </Button>
  )
}

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: '#fff',
    minWidth: 200,
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5)
  },
  icon: { height: 24, width: AUTO, marginRight: 10, borderRadius: 12 }
}))

export default GoogleAuthComponent
