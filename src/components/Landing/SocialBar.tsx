import { Typography } from '@material-ui/core'
import React from 'react'
import FacebookIcon from '@material-ui/icons/Facebook'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import InstagramIcon from '@material-ui/icons/Instagram'
import { IconButton } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import { useStyles } from 'screens/LandingScreens/style'

export const SocialBar = () => {
  const classes = useStyles()
  const theme = useTheme()
  return (
    <div className={classes.socialBar}>
      <div style={{ flex: 1 }}>
        <Typography className='metaText'>2020 CreatorsCloud.io</Typography>
      </div>
      <div className='row'>
        <IconButton className={classes.socialButton}>
          <LinkedInIcon className={classes.socialIcon} />
        </IconButton>
        <IconButton className={classes.socialButton}>
          <InstagramIcon className={classes.socialIcon} />
        </IconButton>
        <IconButton className={classes.socialButton}>
          <FacebookIcon className={classes.socialIcon} />
        </IconButton>
      </div>
    </div>
  )
}
