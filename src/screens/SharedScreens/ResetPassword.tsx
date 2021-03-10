import react, { useState, ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'
import AppTextField from '../../components/Common/Core/AppTextField'
import { Typography, Grid } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { GradiantButton } from 'components/Common/Button/GradiantButton'
import { resetPasswordRequest } from '../../actions/authActions'
import { validatePassword } from '../../utils/helpers'

type Props = {
  loading: Boolean
}
const ResetPassword = ({ loading }: Props) => {
  const theme = useTheme()

  const [password, setPassword] = useState({
    newPassword: '',
    confirmPassword: '',
    currentPassword: ''
  })
  const [errors, setErrors] = useState({
    newPassword: '',
    confirmPassword: '',
    currentPassword: ''
  })
  const dispatch = useDispatch()
  const handleChangePassword = (event: any) => (key: string) => {
    const value = event.target.value
    setPassword({ ...password, [key]: value })
  }

  const handleResetPassword = () => {
    const errors = validatePassword(password)
    setErrors(errors)
    if (!Object.keys(errors).length) {
      dispatch(
        resetPasswordRequest(password.confirmPassword, password.currentPassword)
      )
    }
  }
  const classes = useStyles()

  return (
    <>
      <Typography variant={'h5'} className={classes.headerTitle}>
        Reset Password
      </Typography>
      <AppTextField
        label={'Current Password'}
        type={'password'}
        name='Password'
        onChange={(e: ChangeEvent) =>
          handleChangePassword(e)('currentPassword')
        }
        value={password.currentPassword}
        error={!!errors.currentPassword}
        errorMessage={errors.currentPassword}
      />
      <AppTextField
        label={'Password'}
        type={'password'}
        name='Password'
        onChange={(e: ChangeEvent) => handleChangePassword(e)('newPassword')}
        value={password.newPassword}
        error={!!errors.newPassword}
        errorMessage={errors.newPassword}
      />
      <AppTextField
        label={'Confirm Password'}
        type={'password'}
        name='confirmPassword'
        onChange={(e: ChangeEvent) =>
          handleChangePassword(e)('confirmPassword')
        }
        value={password.confirmPassword}
        error={!!errors.confirmPassword}
        errorMessage={errors.confirmPassword}
      />
      <Grid container justify='center' style={{ marginTop: 20 }}>
        <GradiantButton onClick={handleResetPassword} loading={loading}>
          Save Password
        </GradiantButton>
      </Grid>
    </>
  )
}
export default ResetPassword

const useStyles = makeStyles((theme) => ({
  headerTitle: {
    fontWeight: 'bold',
    marginBottom: '20px'
  }
}))
