import React from 'react'
import { useStyles } from '../../screens/LandingScreens/style'
import { Typography } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import trusted1 from 'assets/trustedPartner1.png'
import trusted2 from 'assets/trustedPartner2.png'
import trusted3 from 'assets/trustedPartner3.png'
import trusted4 from 'assets/trustedPartner4.png'
import trusted5 from 'assets/trustedPartner5.png'
import trusted6 from 'assets/trustedPartner6.png'

export const TrustedPartners = () => {
  const classes = useStyles()
  const theme = useTheme()
  return (
    <div className={classes.section}>
      <div className={classes.sectionInner}>
        <Typography
          variant='h3'
          className='bold'
          style={{ marginBottom: theme.spacing(8), textAlign: 'center' }}>
          Trusted by the best.
        </Typography>
        <div className={classes.trustedPartnerContainer}>
          {[trusted3, trusted4, trusted5, trusted2, trusted1, trusted6].map(
            (src, index) => (
              <img
                key={src}
                src={src}
                className={
                  index === 2 || index === 3
                    ? classes.trustedPartnerImageWide
                    : classes.trustedPartnerImage
                }
              />
            )
          )}
        </div>
      </div>
    </div>
  )
}
