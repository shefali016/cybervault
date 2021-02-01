import { Typography } from '@material-ui/core'
import Section from '../../components/Common/Section'
import { ResponsiveRow } from '../../components/ResponsiveRow'
import React from 'react'
import RightArrow from '@material-ui/icons/ArrowForwardIos'
import { GradiantButton } from 'components/Common/Button/GradiantButton'
import { Account } from '../../utils/Interface'
import { ReduxState } from 'reducers/rootReducer'
import { connect } from 'react-redux'
import { useTheme } from '@material-ui/core/styles'

type StateProps = { account: Account }
type Props = {} & StateProps

const SecurityScreen = ({ account }: Props) => {
  const theme = useTheme()
  const { security } = account

  const handleChangePassword = () => {}

  const handleToggleTwoFactor = () => {}

  return (
    <div className={'screenContainer'}>
      <Section
        title='Password Reset'
        style={{ marginBottom: theme.spacing(4) }}>
        <div className={'sectionInner'}>
          <ResponsiveRow>
            {[
              <div style={{ flex: 1 }}>
                <Typography variant='subtitle1'>
                  Change your login password
                </Typography>
                <Typography variant='caption'>
                  Reset or change your existing password
                </Typography>
              </div>,
              <GradiantButton onClick={handleChangePassword}>
                <div className={'row'}>
                  <Typography style={{ marginRight: 5 }}>
                    Change Password
                  </Typography>
                  <RightArrow style={{ fontSize: 15 }} />
                </div>
              </GradiantButton>
            ]}
          </ResponsiveRow>
        </div>
      </Section>

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
                  <Typography variant='subtitle1'>
                    Authenticator Verification
                  </Typography>
                  <Typography variant='caption'>
                    Enter a code provided by your authentication app along with
                    your password.
                  </Typography>
                </div>,
                <GradiantButton
                  onClick={handleToggleTwoFactor}
                  inActive={!security?.twoFactor}>
                  <div className={'row'}>
                    <Typography style={{ marginRight: 5 }}>
                      {!!security?.twoFactor ? 'Enabled' : 'Enable'}
                    </Typography>
                    <RightArrow style={{ fontSize: 15 }} />
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
                  <Typography variant='subtitle1'>
                    Text Message Verification
                  </Typography>
                  <Typography variant='caption'>
                    Receive a six digit code by text message to enter along with
                    your password.
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
                    <RightArrow style={{ fontSize: 15 }} />
                  </div>
                </GradiantButton>
              ]}
            </ResponsiveRow>
          </div>

          <div className={'sectionInner'}>
            <ResponsiveRow>
              {[
                <div style={{ flex: 1 }}>
                  <Typography variant='subtitle1'>Security Question</Typography>
                  <Typography variant='caption'>
                    Confirm your identity with a question only you know answer
                    to.
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
                    <RightArrow style={{ fontSize: 15 }} />
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
                <Typography variant='subtitle1'>
                  Second Email Address
                </Typography>
                <Typography variant='caption'>
                  Use a recovery email to reset forgotten passwords.
                </Typography>
              </div>,
              <GradiantButton onClick={handleChangePassword}>
                <div className={'row'}>
                  <Typography style={{ marginRight: 5 }}>Set Up</Typography>
                  <RightArrow style={{ fontSize: 15 }} />
                </div>
              </GradiantButton>
            ]}
          </ResponsiveRow>
        </div>
      </Section>
    </div>
  )
}

const mapState = (state: ReduxState): StateProps => ({
  account: state.auth.account as Account
})

export default connect(mapState)(SecurityScreen)
