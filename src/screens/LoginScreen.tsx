import React, { useState, useEffect } from 'react'
import '../App.css'
import { connect } from 'react-redux'
import { login, googleLogin } from '../actions/authActions'
import AppTextField from '../components/Common/Core/AppTextField'
import { Button, Typography } from '@material-ui/core'
import ReactLoading from 'react-loading'
import * as Types from '../utils/types'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import 'firebase/auth'
import GoogleAuthComponent from '../components/SocialAuth/GoogleAuthComponent'
import { BOLD, CENTER, COLUMN, FLEX } from 'utils/constants/stringConstants'
import { PRIMARY_COLOR } from 'utils/constants/colorsConstants'
import PolymerSharpIcon from '@material-ui/icons/PolymerSharp'
import { GradiantButton } from '../components/Common/Button/GradiantButton'
import clsx from 'clsx'

const initialState = {
  email: '',
  password: '',
  loading: false
}

export const LoginScreen = (props: any) => {
  const [state, setState] = useState(initialState)
  const { email, password, loading } = state

  useEffect(() => {
    if (props.isLoggedIn && props.user) {
      loggedIn(props)
    }
  }, [props.isLoggedIn, props.user])

  const loggedIn = (props: any) => {
    setState((state) => ({ ...state, loading: false }))
    props.history.push('/home')
  }

  const handleInputChange = (key: any) => (e: any) =>
    setState((state) => ({ ...state, [key]: e.target.value }))

  const handleLogin = () => {
    setState((state) => ({ ...state, loading: true }))
    props.auth({ email: email.trim(), password: password.trim() })
  }

  const navigateToSignUp = () => {
    props.history.push('/signup')
  }
  const classes = useStyles()
  const theme = useTheme()
  console.log(theme.palette.primary.light)
  return (
    <div className={classes.root}>
      <div className={classes.logoView}>
        <PolymerSharpIcon className={classes.logo} fontSize={'inherit'} />
      </div>
      <div className={classes.loginView}>
        <PolymerSharpIcon className={classes.logoBlue} fontSize={'inherit'} />
        <Typography variant={'h5'} style={{ marginTop: theme.spacing(2) }}>
          Welcome
        </Typography>
        <ReactLoading type={loading ? 'bubbles' : 'blank'} color={'#fff'} />
        <div style={{ maxWidth: 400, marginBottom: theme.spacing(4) }}>
          <AppTextField
            label='Email'
            onChange={handleInputChange('email')}
            style={{ marginBottom: theme.spacing(2) }}
            value={email}
          />
          <AppTextField
            label='Password'
            onChange={handleInputChange('password')}
            type={'password'}
            value={password}
          />
        </div>
        <GradiantButton
          variant='contained'
          onClick={handleLogin}
          color='primary'
          className={clsx(classes.button, classes.loginButton)}>
          Login
        </GradiantButton>
        <GoogleAuthComponent
          onClick={props.googleAuth}
          title={'Sign in with Google'}
          className={classes.button}
        />
      </div>
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  isLoggedIn: state.auth.isLoggedIn,
  user: state.auth.user
})

const mapDispatchToProps = (dispatch: any) => ({
  auth: (user: Types.User) => {
    return dispatch(login(user))
  },
  googleAuth: () => {
    return dispatch(googleLogin())
  }
})
const useStyles = makeStyles((theme) => ({
  root: {
    display: FLEX,
    height: '100vh',
    backgroundColor: theme.palette.background.default,
    color: '#fff'
  },
  logoView: {
    background: `linear-gradient(${theme.palette.primary.light}, ${theme.palette.primary.dark})`,
    // backgroundColor: "red",
    display: FLEX,
    justifyContent: CENTER,
    alignItems: CENTER,
    flex: 1
  },
  logo: { color: theme.palette.primary.light, fontSize: 80 },
  logoBlue: { color: theme.palette.primary.main, fontSize: 60 },
  loginView: {
    flex: 2,
    display: FLEX,
    flexDirection: COLUMN,
    alignItems: CENTER,
    justifyContent: CENTER
  },
  title: {
    color: PRIMARY_COLOR,
    margin: theme.spacing(1),
    fontWeight: BOLD
  },
  button: {
    width: '100%',
    maxWidth: 250
  },
  loginButton: {
    marginBottom: theme.spacing(4)
  }
}))
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
