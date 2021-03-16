import { Typography } from '@material-ui/core'
import Section from '../../components/Common/Section'
import { ResponsiveRow } from '../../components/ResponsiveRow'
import RightArrow from '@material-ui/icons/ArrowForwardIos'
import { GradiantButton } from 'components/Common/Button/GradiantButton'
import { Account } from '../../utils/Interface'
import { ReduxState } from 'reducers/rootReducer'
import { connect, useSelector } from 'react-redux'
import { useTheme } from '@material-ui/core/styles'
import Modal from '../../components/Common/Modal'
import React, { useState, useContext, useMemo } from 'react'
import CloseButton from '../../components/Common/Button/CloseButton'
import { POSITION_ABSOLUTE } from 'utils/constants/stringConstants'
import ResetPassword from './ResetPassword'
import { useOnChange } from 'utils/hooks'
import { ToastContext, ToastTypes } from '../../context/Toast'
import firebase from 'firebase'

type StateProps = { account: Account }
type Props = {} & StateProps

const SecurityScreen = ({ account }: Props) => {
  const theme = useTheme()
  const { security } = account

  const [passwordModalOpen, setPasswordModalOpen] = useState(false)
  const closePasswordModal = () => setPasswordModalOpen(false)

  const authData = useSelector((state: ReduxState) => state.auth)

  const handleToggleTwoFactor = () => {}

  useOnChange(authData.changePasswordSuccess, (success) => {
    if (success) {
      setPasswordModalOpen(false)
    }
  })

  const accounthasPassword = useMemo(() => {
    const currentUser = firebase.auth().currentUser
    const providerData =
      currentUser && currentUser.providerData && currentUser.providerData[0]

    return providerData && providerData.providerId === 'password'
  }, [])

  return (
    <div className={'screenContainer'}>
      <div className={'screenInner'}>
        <div className='responsivePadding'>
          {accounthasPassword && (
            <Section
              title='Password Reset'
              style={{ marginBottom: theme.spacing(4) }}>
              <div className={'sectionInner'}>
                <ResponsiveRow>
                  {[
                    <div style={{ flex: 1 }}>
                      <Typography variant='body1'>
                        Change your login password
                      </Typography>
                      <Typography variant='caption'>
                        Reset or change your existing password
                      </Typography>
                    </div>,
                    <GradiantButton onClick={() => setPasswordModalOpen(true)}>
                      <div className={'row'}>
                        <Typography style={{ marginRight: 5 }}>
                          Change Password
                        </Typography>
                      </div>
                    </GradiantButton>
                  ]}
                </ResponsiveRow>
                <Modal
                  open={passwordModalOpen}
                  onRequestClose={closePasswordModal}>
                  <div className='modalContent'>
                    <CloseButton
                      onClick={closePasswordModal}
                      style={{
                        position: POSITION_ABSOLUTE,
                        top: 10,
                        right: 10
                      }}
                    />
                    <ResetPassword loading={authData.changePasswordLoading} />
                  </div>
                </Modal>
              </div>
            </Section>
          )}

          <Section
            title={'Two Factor Verification'}
            style={{ marginBottom: theme.spacing(4) }}>
            <div>
              <div
                className={'sectionInner'}
                style={{ marginBottom: theme.spacing(4) }}>
                <ResponsiveRow>
                  {[
                    <div style={{ flex: 1 }}>
                      <Typography variant='body1'>
                        Authenticator Verification
                      </Typography>
                      <Typography variant='caption'>
                        Enter a code provided by your authentication app along
                        with your password.
                      </Typography>
                    </div>,
                    <GradiantButton
                      onClick={handleToggleTwoFactor}
                      inActive={!security?.twoFactorEnabled}>
                      <div className={'row'}>
                        <Typography style={{ marginRight: 5 }}>
                          {!!security?.twoFactorEnabled ? 'Enabled' : 'Enable'}
                        </Typography>
                      </div>
                    </GradiantButton>
                  ]}
                </ResponsiveRow>
              </div>

              <div
                className={'sectionInner'}
                style={{ marginBottom: theme.spacing(4) }}>
                <ResponsiveRow>
                  {[
                    <div style={{ flex: 1 }}>
                      <Typography variant='body1'>
                        Text Message Verification
                      </Typography>
                      <Typography variant='caption'>
                        Receive a six digit code by text message to enter along
                        with your password.
                      </Typography>
                    </div>,
                    <GradiantButton
                      onClick={handleToggleTwoFactor}
                      inActive={!security?.textMessageVerification}>
                      <div className={'row'}>
                        <Typography style={{ marginRight: 5 }}>
                          {!!security?.textMessageVerification
                            ? 'Enabled'
                            : 'Enable'}
                        </Typography>
                      </div>
                    </GradiantButton>
                  ]}
                </ResponsiveRow>
              </div>

              <div className={'sectionInner'}>
                <ResponsiveRow>
                  {[
                    <div style={{ flex: 1 }}>
                      <Typography variant='body1'>Security Question</Typography>
                      <Typography variant='caption'>
                        Confirm your identity with a question only you know
                        answer to.
                      </Typography>
                    </div>,
                    <GradiantButton
                      onClick={handleToggleTwoFactor}
                      inActive={!security?.securityQuestion?.question}>
                      <div className={'row'}>
                        <Typography style={{ marginRight: 5 }}>
                          {!!security?.securityQuestion?.question
                            ? 'Enabled'
                            : 'Enable'}
                        </Typography>
                      </div>
                    </GradiantButton>
                  ]}
                </ResponsiveRow>
              </div>
            </div>
          </Section>

          <Section
            title='Set Up Recovery Email'
            style={{ marginBottom: theme.spacing(4) }}>
            <div className={'sectionInner'}>
              <ResponsiveRow>
                {[
                  <div style={{ flex: 1 }}>
                    <Typography variant='body1'>
                      Second Email Address
                    </Typography>
                    <Typography variant='caption'>
                      Use a recovery email to reset forgotten passwords.
                    </Typography>
                  </div>,
                  <GradiantButton>
                    <div className={'row'}>
                      <Typography style={{ marginRight: 5 }}>Set Up</Typography>
                    </div>
                  </GradiantButton>
                ]}
              </ResponsiveRow>
            </div>
          </Section>
        </div>
      </div>
    </div>
  )
}

const mapState = (state: ReduxState): StateProps => ({
  account: state.auth.account as Account
})

export default connect(mapState)(SecurityScreen)
