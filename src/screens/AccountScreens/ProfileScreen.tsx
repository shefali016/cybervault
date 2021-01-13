import React, { useState } from 'react'
import '../../App.css'
import { connect } from 'react-redux'
import { ReduxState } from 'reducers/rootReducer'
import { InputChangeEvent, User } from 'utils/types'
import AvatarPicker from 'components/Assets/AvatarPicker'
import clsx from 'clsx'
import { useTheme, makeStyles } from '@material-ui/core/styles'
import AppTextField from 'components/Common/Core/AppTextField'
import { GradiantButton } from 'components/Common/Button/GradiantButton'
import { Typography } from '@material-ui/core'
import { updateUser } from 'actions/user'
import { setMedia } from 'apis/assets'

type Props = { user: User; updateUser: (update: {}) => void }

const ProfileScreen = ({ user, updateUser }: Props) => {
  const classes = useStyles()
  const theme = useTheme()
  const textInputStyle = { marginRight: theme.spacing(4) }

  const [profileChanges, setProfileChanges] = useState<Partial<User>>({})

  const updateProfile = (key: string) => (val: any) =>
    setProfileChanges((state: {}) => ({ ...state, [key]: val }))

  const handleSave = async () => {
    try {
      let update = { ...profileChanges }
      if (profileChanges.avatar) {
        const avatarUrl = await setMedia(
          `user_avatars/${user.id}`,
          profileChanges.avatar
        )
        if (typeof avatarUrl === 'string') {
          update = { ...update, avatar: avatarUrl }
        } else {
          throw 'invalid_avatar_url'
        }
      }
      updateUser(update)
    } catch (error) {
      alert('Failed to update profile. Please try again.')
    }
  }

  return (
    <div className={clsx('container', classes.container)}>
      <AvatarPicker
        url={user.avatar}
        onChange={(file: File) => updateProfile('avatar')(file)}
        size={120}
        className={classes.avatarPicker}
      />

      <div
        className={classes.section}
        style={{ marginBottom: theme.spacing(4) }}>
        <Typography>Profile Info</Typography>
        <div className={classes.inputRow}>
          <AppTextField
            label='First Name'
            onChange={(event: InputChangeEvent) =>
              updateProfile('firstName')(event.target.value)
            }
            value={user.firstName}
            style={textInputStyle}
          />
          <AppTextField
            label='Last Name'
            onChange={(event: InputChangeEvent) =>
              updateProfile('lastName')(event.target.value)
            }
            value={user.lastName}
          />
        </div>
        <div className={classes.inputRow}>
          <AppTextField
            label='Company'
            onChange={(event: InputChangeEvent) =>
              updateProfile('company')(event.target.value)
            }
            value={user.company}
            style={textInputStyle}
          />
          <AppTextField
            label='Email Addresss'
            onChange={(event: InputChangeEvent) =>
              updateProfile('email')(event.target.value)
            }
            value={user.email}
          />
        </div>
      </div>

      <div className={classes.section}>
        <Typography>Social Links</Typography>
        <div className={classes.inputRow}>
          <AppTextField
            label='Instagram'
            onChange={(event: InputChangeEvent) =>
              updateProfile('instagram')(event.target.value)
            }
            value={user.instagram}
            style={textInputStyle}
          />
          <AppTextField
            label='Twitter'
            onChange={(event: InputChangeEvent) =>
              updateProfile('twitter')(event.target.value)
            }
            value={user.twitter}
          />
        </div>
        <div className={classes.inputRow}>
          <AppTextField
            label='Facebook'
            onChange={(event: InputChangeEvent) =>
              updateProfile('facebook')(event.target.value)
            }
            value={user.facebook}
            style={textInputStyle}
          />
          <AppTextField
            label='LinkedIn'
            onChange={(event: InputChangeEvent) =>
              updateProfile('linkedIn')(event.target.value)
            }
            value={user.linkedIn}
          />
        </div>
      </div>

      <GradiantButton className={classes.saveButton} onClick={handleSave}>
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

const mapState = (state: ReduxState) => ({ user: state.auth.user })

const mapDispatch = (dispatch: any) => ({
  updateUser: (update: {}) => dispatch(updateUser(update))
})

export default connect(mapState, mapDispatch)(ProfileScreen)
