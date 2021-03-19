import React from 'react'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

export const ClientLogo = ({ logo }: { logo: string | undefined }) => {
  const classes = useStyles()
  return (
    <Button
      variant='contained'
      className={clsx(classes.clientLogo, 'paperShadow')}>
      {!!logo && (
        <img src={logo} className={classes.clientLogoImg} alt={'client-logo'} />
      )}
    </Button>
  )
}

const useStyles = makeStyles((theme) => ({
  clientLogo: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: 'transparent'
  },
  clientLogoImg: {
    height: 80,
    width: 80,
    borderRadius: 40,
    position: 'absolute',
    objectFit: 'cover'
  }
}))
