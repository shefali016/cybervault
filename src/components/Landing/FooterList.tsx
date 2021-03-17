import { Typography } from '@material-ui/core'
import { AppButton } from 'components/Common/Core/AppButton'
import React from 'react'
import { useStyles } from 'screens/LandingScreens/style'

export const FooterList = ({
  title,
  items
}: {
  title: string
  items: Array<{ title: string; onClick: () => void }>
}) => {
  const classes = useStyles()
  return (
    <div className={classes.footerListContainer}>
      <Typography variant='h6' className='bold'>
        {title}
      </Typography>
      <div className={classes.footerListItems}>
        {items.map(({ title, onClick }) => {
          return (
            <AppButton
              key={title}
              onClick={onClick}
              className={classes.footerListButton}>
              <Typography>{title}</Typography>
            </AppButton>
          )
        })}
      </div>
    </div>
  )
}
