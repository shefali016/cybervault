import React, { useState, useEffect } from 'react'
import '../App.css'
import AppTextField from '../components/AppTextField'
import { Button, Typography } from '@material-ui/core'
import { signUp } from '../actions/authActions'
import { connect } from 'react-redux'
import ReactLoading from 'react-loading'
import * as Types from '../utils/types'
import { makeStyles } from '@material-ui/core/styles'
import { BOLD, CENTER } from 'utils/constants/stringConstants'
import { PRIMARY_COLOR } from 'utils/constants/colorsConstants'

const initialState = {
  email: '',
  password: '',
  passwordConfirm: '',
  loading: false,
}

export const SignUpScreen = (props: any) => {
  const [state, setState] = useState(initialState)
  const { email, password, passwordConfirm, loading } = state

  useEffect(() => {
    console.log('in use Effect', props.isLoggedIn)
    if (props.isLoggedIn && props.user) {
      signUpCompleted(props)
    }
  }, [props.isLoggedIn, props.user])

  const signUpCompleted = (props: any) => {
    setState((state) => ({ ...state, loading: false }))
    props.history.push('/home')
  }

  const handleInputChange = (key: any) => (e: any) =>
    setState((state) => ({ ...state, [key]: e.target.value }))

  const handleLogin = () => {
    if (password.trim() !== passwordConfirm.trim()) {
      alert('Passwords do not match')
      return
    }
    setState((state) => ({ ...state, loading: true }))
    props.signUp({ email: email.trim(), password: password.trim() })
  }
  const classes = useStyles()
  return (
    <div className='authScreenContainer'>
      <Typography variant={'h2'} className={classes.title}>
        Cyber Vault
      </Typography>
      <div className={'container center-content'}>
        <Typography variant={'h4'} className={classes.text}>
          Sign Up
        </Typography>
        <form className={'col'}>
          <AppTextField
            label={'Email'}
            onChange={handleInputChange('email')}
            className={classes.generalMargin}
          />
          <AppTextField
            label={'Password'}
            onChange={handleInputChange('password')}
            type={'password'}
            className={classes.generalMargin}
          />
          <AppTextField
            label={'Confirm Password'}
            onChange={handleInputChange('passwordConfirm')}
            type={'password'}
            className={classes.bottomTextField}
          />
        </form>
        <ReactLoading type={loading ? 'bubbles' : 'blank'} color={'#fff'} />
        <Button
          variant='contained'
          color='primary'
          onClick={handleLogin}
          className={classes.button}>
          Sign up
        </Button>
      </div>
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  isLoggedIn: state.auth.isLoggedIn,
  user: state.auth.user,
})

const mapDispatchToProps = (dispatch: any) => ({
  signUp: (user: Types.User) => {
    return dispatch(signUp(user))
  },
})
const useStyles = makeStyles((theme) => ({
  title: {
    color: PRIMARY_COLOR,
    marginBottom: 20,
    marginTop: 0,
    fontWeight: BOLD,
  },
  generalMargin: {
    marginBottom: 10,
  },

  bottomTextField: {
    marginBottom: 20,
  },
  button: {
    width: 170,
  },
  text: {
    alignSelf: CENTER,
    fontWeight: 600,
    marginBottom: 20,
  },
}))
export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen)
