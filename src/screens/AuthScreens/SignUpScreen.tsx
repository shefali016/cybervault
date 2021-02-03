import React, { useState, useEffect, useContext, useRef } from 'react'
import '../../App.css'
import AppTextField from '../../components/Common/Core/AppTextField'
import { Typography } from '@material-ui/core'
import { googleLogin, signUp } from '../../actions/authActions'
import { connect } from 'react-redux'
import ReactLoading from 'react-loading'
import * as Types from '../../utils/Interface'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { BOLD, CENTER, COLUMN, FLEX } from 'utils/constants/stringConstants'
import { PRIMARY_COLOR } from 'utils/constants/colorsConstants'
import PolymerSharpIcon from '@material-ui/icons/PolymerSharp'
import { GradiantButton } from '../../components/Common/Button/GradiantButton'
import GoogleAuthComponent from '../../components/SocialAuth/GoogleAuthComponent'
import clsx from 'clsx'
import { ToastContext } from '../../context/Toast'

const initialState = {
  email: '',
  password: '',
  name: '',
  passwordConfirm: '',
  loading: false
}

export const SignUpScreen = (props: any) => {
  const classes = useStyles()
  const theme = useTheme()

  const toastContext = useContext(ToastContext)

  const [state, setState] = useState(initialState)
  const { email, password, loading, name } = state

  const signUpErrorRef = useRef(props.signUpError)
  useEffect(() => {
    if (!signUpErrorRef.current && props.signUpError) {
      setState((state) => ({ ...state, loading: false }))
      toastContext.showToast({ title: props.signUpError })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.signUpError])

  useEffect(() => {
    if (props.isLoggedIn && props.user) {
      props.history.push('/home')
    }
  }, [props.history, props.isLoggedIn, props.user])

  const handleInputChange = (key: any) => (e: any) =>
    setState((state) => ({ ...state, [key]: e.target.value }))

  const handleSignUp = () => {
    const _email = email.trim()
    const _password = password.trim()
    const _name = name.trim()
    if (!_email || !_name || !_password) {
      toastContext.showToast({ title: 'Complete all fields before signing up' })
    } else {
      setState((state) => ({ ...state, loading: true }))
      props.signUp({ email: _email, password: _password, name: _name })
    }
  }

  const navigateToLogin = () => props.history.replace('/')
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
            label='Full Name'
            onChange={handleInputChange('name')}
            value={name}
            darkStyle={true}
          />
          <AppTextField
            label='Email'
            onChange={handleInputChange('email')}
            style={{ marginBottom: theme.spacing(2) }}
            value={email}
            darkStyle={true}
          />
          <AppTextField
            label='Password'
            onChange={handleInputChange('password')}
            type={'password'}
            value={password}
            darkStyle={true}
          />
        </div>
        <GradiantButton
          variant='contained'
          onClick={handleSignUp}
          color='primary'
          className={clsx(classes.button, classes.loginButton)}>
          <Typography>Sign Up</Typography>
        </GradiantButton>

        <GoogleAuthComponent
          onClick={props.googleAuth}
          title={'Sign in with Google'}
          className={classes.button}
        />

        <div onClick={navigateToLogin} className={classes.signUpContainer}>
          <Typography style={{ marginRight: 5 }}>
            Already have an account?
          </Typography>
          <Typography className={classes.signUpText}>Login</Typography>
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  signUpText: { color: theme.palette.primary.light },
  signUpContainer: {
    display: FLEX,
    marginTop: theme.spacing(8),
    cursor: 'pointer'
  },
  root: {
    display: FLEX,
    height: '100vh',
    backgroundColor: theme.palette.background.default,
    color: '#fff'
  },
  logoView: {
    [theme.breakpoints.down('sm')]: {
      width: 0,
      overflow: 'hidden',
      display: 'none'
    },
    background: `linear-gradient(${theme.palette.primary.light}, ${theme.palette.primary.dark})`,
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
    justifyContent: CENTER,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
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

const mapStateToProps = (state: any) => ({
  isLoggedIn: state.auth.isLoggedIn,
  user: state.auth.user,
  signUpError: state.auth.error
})

const mapDispatchToProps = (dispatch: any) => ({
  signUp: (loginInfo: Types.UserLoginInfo) => {
    return dispatch(signUp(loginInfo))
  },
  googleAuth: () => {
    return dispatch(googleLogin())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen)
