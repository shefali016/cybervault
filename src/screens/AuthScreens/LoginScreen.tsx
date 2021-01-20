import React, { useState, useEffect, useRef, useContext } from 'react'
import '../../App.css'
import { connect } from 'react-redux'
import { login, googleLogin } from '../../actions/authActions'
import AppTextField from '../../components/Common/Core/AppTextField'
import { Typography } from '@material-ui/core'
import ReactLoading from 'react-loading'
import * as Types from '../../utils/types'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import 'firebase/auth'
import GoogleAuthComponent from '../../components/SocialAuth/GoogleAuthComponent'
import { BOLD, CENTER, COLUMN, FLEX } from 'utils/constants/stringConstants'
import { PRIMARY_COLOR } from 'utils/constants/colorsConstants'
import PolymerSharpIcon from '@material-ui/icons/PolymerSharp'
import { GradiantButton } from '../../components/Common/Button/GradiantButton'
import clsx from 'clsx'
import { ReduxState } from 'reducers/rootReducer'
import { ToastContext } from '../../context/Toast'

const initialState = {
  email: '',
  password: '',
  loading: false
}

type Props = {
  isLoggedIn: boolean
  user: Types.User | null
  loginError: string | null
  auth: (loginInfo: Types.UserLoginInfo) => void
  googleAuth: () => void
  history: any
}

export const LoginScreen = ({
  isLoggedIn,
  user,
  loginError,
  auth,
  googleAuth,
  history
}: Props) => {
  const classes = useStyles()
  const theme = useTheme()

  const [state, setState] = useState(initialState)
  const { email, password, loading } = state
  const passwordInput = useRef<HTMLInputElement>(null)

  const toastContext = useContext(ToastContext)

  const loginErrorRef = useRef(loginError)

  useEffect(() => {
    if (!loginErrorRef.current && loginError) {
      setState((state) => ({ ...state, loading: false }))
      toastContext.showToast({ title: loginError })
    }
    loginErrorRef.current = loginError
  }, [loginError])

  useEffect(() => {
    if (isLoggedIn && user) {
      history.push('/home')
    }
  }, [isLoggedIn, user])

  const handleInputChange = (key: any) => (e: any) =>
    setState((state) => ({ ...state, [key]: e.target.value }))

  const handleLogin = () => {
    const _email = email.trim()
    const _password = password.trim()
    if (!_email || !_password) {
      toastContext.showToast({ title: 'Complete all fields to login' })
    } else {
      setState((state) => ({ ...state, loading: true }))
      auth({ email: email.trim(), password: password.trim() })
    }
  }

  const navigateToSignUp = () => {
    history.push('/signup')
  }

  const handleEmailKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      passwordInput.current?.focus()
    }
  }

  const handlePasswordKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }

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
            darkStyle={true}
            onKeyUp={handleEmailKeyUp}
          />
          <AppTextField
            ref={passwordInput}
            label='Password'
            onChange={handleInputChange('password')}
            type={'password'}
            value={password}
            darkStyle={true}
            onKeyUp={handlePasswordKeyUp}
          />
        </div>
        <GradiantButton
          variant='contained'
          onClick={handleLogin}
          color='primary'
          className={clsx(classes.button, classes.loginButton)}>
          <Typography>Login</Typography>
        </GradiantButton>

        <GoogleAuthComponent
          onClick={googleAuth}
          title={'Sign in with Google'}
          className={classes.button}
        />

        <div onClick={navigateToSignUp} className={classes.signUpContainer}>
          <Typography style={{ marginRight: 5 }}>
            Don't have an account?
          </Typography>
          <Typography className={classes.signUpText}>Sign Up</Typography>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state: ReduxState) => ({
  isLoggedIn: state.auth.isLoggedIn,
  user: state.auth.user,
  loginError: state.auth.error
})

const mapDispatchToProps = (dispatch: any) => ({
  auth: (loginInfo: Types.UserLoginInfo) => {
    return dispatch(login(loginInfo))
  },
  googleAuth: () => {
    return dispatch(googleLogin())
  }
})

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

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
