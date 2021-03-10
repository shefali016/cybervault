import { Typography } from '@material-ui/core'
import { GradiantButton } from 'components/Common/Button/GradiantButton'
import AppTextField from 'components/Common/Core/AppTextField'
import React from 'react'
import { useStyles } from 'screens/LandingScreens/style'
import { InputChangeEvent } from 'utils/Interface'

type Props = {
  isLoggedIn: boolean
  onChange: (e: InputChangeEvent) => void
  value: string
  goToDashboard: () => void
  goToSignUp: () => void
  onEnter: () => void
}

export const SignUpInput = ({
  isLoggedIn,
  value,
  onChange,
  goToDashboard,
  goToSignUp,
  onEnter
}: Props) => {
  const classes = useStyles()

  const onKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      onEnter()
    }
  }

  if (isLoggedIn) {
    return (
      <div className={classes.signUpInputContainer}>
        <GradiantButton
          className={classes.signUpButton}
          onClick={goToDashboard}>
          <Typography>Go to dashboard</Typography>
        </GradiantButton>
      </div>
    )
  }
  return (
    <div className={classes.signUpInputContainer}>
      <AppTextField
        darkStyle={true}
        onChange={onChange}
        value={value}
        label='Enter your email'
        className={classes.signUpInput}
        style={{ maxWidth: 400, minWidth: 300 }}
        labelClassName={classes.signUpInputLabel}
        labelFocusedClassName={classes.signUpInputLabelFocused}
        onKeyUp={onKeyUp}
      />
      <div className={classes.signUpButtonContainer}>
        <GradiantButton className={classes.signUpButton} onClick={goToSignUp}>
          <Typography>Sign up free</Typography>
        </GradiantButton>
        <Typography variant='caption' className={classes.signUpButtonCaption}>
          7-day free trial. Cancel anytime.
        </Typography>
      </div>
    </div>
  )
}
