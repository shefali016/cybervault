import React, { useContext, useState } from 'react'
import { connect } from 'react-redux'
import { ReduxState } from 'reducers/rootReducer'
import { InputChangeEvent, User } from 'utils/Interface'
import AvatarPicker from '../../components/Assets/AvatarPicker'
import clsx from 'clsx'
import { useTheme, makeStyles } from '@material-ui/core/styles'
import AppTextField from 'components/Common/Core/AppTextField'
import { GradiantButton } from '../../components/Common/Button/GradiantButton'
import { Typography } from '@material-ui/core'
import { updateUser } from 'actions/user'
import { setMedia } from 'apis/assets'
import { useOnChange } from 'utils/hooks'
import { ToastContext, ToastTypes } from 'context/Toast'

type Props = {
  user: User
  updateUser: (update: {}) => void
  updating: boolean
  updateSuccess: boolean
  updateError: string | null
}

const ProfileScreen = ({
  user,
  updateUser,
  updating,
  updateSuccess,
  updateError
}: Props) => {
  const classes = useStyles()
  const theme = useTheme()
  const toastContext = useContext(ToastContext)
  const textInputStyle = { marginRight: theme.spacing(4) }

  const [profileChanges, setProfileChanges] = useState<User>({ ...user })
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  useOnChange(updateSuccess, (success: boolean) => {
    if (success) {
      setLoading(false)
      toastContext.showToast({
        title: 'Update Success!',
        type: ToastTypes.success
      })
    }
  })

  useOnChange(updateError, (error: string | null) => {
    if (error) {
      setLoading(false)
      toastContext.showToast({ title: 'Update Failed', type: ToastTypes.error })
    }
  })

  const updateProfile = (key: string) => (val: any) =>
    setProfileChanges((state: User) => ({ ...state, [key]: val }))

  const handleSave = async () => {
    try {
      setLoading(true)
      let update = { ...profileChanges }
      if (avatarFile) {
        const avatarUrl = await setMedia(`user_avatars/${user.id}`, avatarFile)
        if (typeof avatarUrl === 'string') {
          update = { ...update, avatar: avatarUrl }
        } else {
          throw Error('invalid_avatar_url')
        }
      }
      updateUser(update)
    } catch (error) {
      setLoading(false)
      toastContext.showToast({
        title: 'Failed to update profile. Please try again.'
      })
    }
  }

  const handleAvatarChange = (file: File) => {
    setAvatarFile(file)
  }

  return (
    <div className={clsx('container', classes.container)}>
      <AvatarPicker
        url={avatarFile ? URL.createObjectURL(avatarFile) : user.avatar}
        onChange={(file: File) => handleAvatarChange(file)}
        size={120}
        className={classes.avatarPicker}
      />

      <div
        className={classes.section}
        style={{ marginBottom: theme.spacing(4) }}>
        <Typography variant='h6' className={classes.sectionTitle}>
          Profile Info
        </Typography>
        <div className={classes.inputRow}>
          <AppTextField
            label='Full Name'
            onChange={(event: InputChangeEvent) =>
              updateProfile('firstName')(event.target.value)
            }
            value={profileChanges.name}
            style={textInputStyle}
            darkStyle={true}
          />
          <AppTextField
            label='Birthday'
            type='date'
            onChange={(event: InputChangeEvent) =>
              updateProfile('birthday')(event.target.value)
            }
            value={profileChanges.birthday}
            darkStyle={true}
          />
        </div>
        <div className={classes.inputRow}>
          <AppTextField
            label='Company'
            onChange={(event: InputChangeEvent) =>
              updateProfile('company')(event.target.value)
            }
            value={profileChanges.company}
            style={textInputStyle}
            darkStyle={true}
          />
          <AppTextField
            label='Email Addresss'
            onChange={(event: InputChangeEvent) =>
              updateProfile('email')(event.target.value)
            }
            value={profileChanges.email}
            darkStyle={true}
          />
        </div>
      </div>

      <div className={classes.section}>
        <Typography variant='h6' className={classes.sectionTitle}>
          Social Links
        </Typography>
        <div className={classes.inputRow}>
          <AppTextField
            label='Instagram'
            onChange={(event: InputChangeEvent) =>
              updateProfile('instagram')(event.target.value)
            }
            value={profileChanges.instagram}
            style={textInputStyle}
            darkStyle={true}
          />
          <AppTextField
            label='Twitter'
            onChange={(event: InputChangeEvent) =>
              updateProfile('twitter')(event.target.value)
            }
            value={profileChanges.twitter}
            darkStyle={true}
          />
        </div>
        <div className={classes.inputRow}>
          <AppTextField
            label='Facebook'
            onChange={(event: InputChangeEvent) =>
              updateProfile('facebook')(event.target.value)
            }
            value={profileChanges.facebook}
            style={textInputStyle}
            darkStyle={true}
          />
          <AppTextField
            label='LinkedIn'
            onChange={(event: InputChangeEvent) =>
              updateProfile('linkedIn')(event.target.value)
            }
            value={profileChanges.linkedIn}
            darkStyle={true}
          />
        </div>
      </div>

      <GradiantButton
        className={classes.saveButton}
        onClick={handleSave}
        loading={loading}>
        <Typography variant='button'>Save</Typography>
      </GradiantButton>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    color: theme.palette.text.background,
    alignItems: 'center',
    paddingBottom: theme.spacing(6),
    justifyContent: 'center',
    width: '100%'
  },
  sectionTitle: {
    marginBottom: theme.spacing(1),
    color: theme.palette.grey[300]
  },
  section: {
    backgroundColor: theme.palette.background.secondary,
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.up('sm')]: {
      width: '100%',
      maxWidth: 800
    },
    [theme.breakpoints.down('sm')]: {
      width: '90%',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  avatarPicker: { marginBottom: theme.spacing(5) },
  inputRow: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: { flexDirection: 'column' }
  },
  saveButton: {
    marginTop: theme.spacing(5),
    paddingTop: 10,
    paddingBottom: 10,
    minWidth: 150
  }
}))

const mapState = (state: ReduxState) => ({
  user: state.auth.user as User,
  updateError: state.auth.userUpdateError,
  updateSuccess: state.auth.userUpdateSuccess
})

const mapDispatch = (dispatch: any) => ({
  updateUser: (update: {}) => dispatch(updateUser(update))
})

export default connect(mapState, mapDispatch)(ProfileScreen)
