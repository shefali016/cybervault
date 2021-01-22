import { Typography } from '@material-ui/core'
import Section from 'components/Common/Section'
import { ResponsiveRow } from 'components/ResponsiveRow'
import React, { useState, useEffect } from 'react'
import RightArrow from '@material-ui/icons/ArrowForwardIos'
import { GradiantButton } from 'components/Common/Button/GradiantButton'
import { Account } from '../../utils/types'
import { ReduxState } from 'reducers/rootReducer'
import { connect } from 'react-redux'
import { useTheme } from '@material-ui/core/styles'

type StateProps = { account: Account }
type Props = {} & StateProps

const BankingScreen = ({ account }: Props) => {
  const theme = useTheme()
  const { banking, customerId } = account

  const [accountBalance, setAccountBalance] = useState<number>(0)
  const [lastDeposit, setLastDeposit] = useState<{
    date: string
    value: number
  } | null>(null)

  useEffect(() => {
    // Get current balance in stripe account and set in state
    // Get last deposit from stripe and store in state
  }, [])

  const handleChangeDepositSchedule = () => {
    // Open modal allowing user to choose deposit schedule
    // Update account with new schedule
  }

  const handleSetUpAccount = () => {
    // Open banking account modal
    // Update account with banking details
  }

  const handleViewPayments = () => {
    // Navigate to payments screen
  }

  const handleWithdrawFunds = () => {
    // Open FundsWithdraw modal
  }

  return (
    <div className={'screenContainer'}>
      <Section
        title='Account Balance'
        style={{ marginBottom: theme.spacing(4) }}>
        <div className={'sectionInner'}>
          <ResponsiveRow>
            {[
              <div style={{ flex: 1 }}>
                <Typography variant='subtitle1'>
                  ${accountBalance} Available
                </Typography>
                <Typography variant='caption'>
                  Withdraw now or wait to have it deposited next billing cycle.
                </Typography>
              </div>,
              <GradiantButton onClick={handleWithdrawFunds}>
                <div className={'row'}>
                  <Typography style={{ marginRight: 5 }}>Withdraw</Typography>
                  <RightArrow style={{ fontSize: 15 }} />
                </div>
              </GradiantButton>
            ]}
          </ResponsiveRow>
        </div>
      </Section>

      <Section
        title={'Payment Details'}
        style={{ marginBottom: theme.spacing(4) }}>
        <div>
          <div
            className={'sectionInner'}
            style={{ marginBottom: theme.spacing(4) }}>
            <ResponsiveRow>
              {[
                <div style={{ flex: 1 }}>
                  <Typography variant='subtitle1'>Last Payment</Typography>
                  {!!lastDeposit ? (
                    <div className={'row'}>
                      <Typography variant='caption'>
                        Ammount: {lastDeposit.value}
                      </Typography>
                      <Typography variant='caption'>
                        Date: {lastDeposit.date}
                      </Typography>
                    </div>
                  ) : (
                    <Typography variant='caption'>
                      You have not received a payment
                    </Typography>
                  )}
                </div>,
                <GradiantButton onClick={handleViewPayments}>
                  <div className={'row'}>
                    <Typography style={{ marginRight: 5 }}>
                      View Payments
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
                  <Typography variant='subtitle1'>Payment Schedule</Typography>
                  <Typography variant='caption'>
                    {!!banking.depositSchedule
                      ? `${banking.depositSchedule} or when your account exceeds $${banking.depositValue}`
                      : 'You have not set up a payment schedule'}
                  </Typography>
                </div>,
                <GradiantButton onClick={handleChangeDepositSchedule}>
                  <div className={'row'}>
                    <Typography style={{ marginRight: 5 }}>
                      {!!banking.depositSchedule ? 'Change Schedule' : 'Set up'}
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
        title='Banking Methods'
        style={{ marginBottom: theme.spacing(4) }}>
        <div className={'sectionInner'}>
          <ResponsiveRow>
            {[
              <div style={{ flex: 1 }}>
                <Typography variant='subtitle1'>Add Bank Account</Typography>
                <Typography variant='caption'>
                  Link your local bank account, PayPal, or Payoneer account.
                </Typography>
              </div>,
              <GradiantButton onClick={handleSetUpAccount}>
                <div className={'row'}>
                  <Typography style={{ marginRight: 5 }}>
                    {banking.details ? 'Change' : 'Set Up'}
                  </Typography>
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

export default connect(mapState)(BankingScreen)
