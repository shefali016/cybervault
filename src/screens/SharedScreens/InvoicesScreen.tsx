import Section from 'components/Common/Section'
import React, { useState, useEffect, useContext, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GradiantButton } from 'components/Common/Button/GradiantButton'
import {
  Account,
  StripeAccount,
  StripeLoginLink,
  User
} from '../../utils/Interface'
import { ReduxState } from 'reducers/rootReducer'
import { connect } from 'react-redux'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import stripeLogo from '../../assets/stripe-logo-sm.png'
import clsx from 'clsx'
import { Typography } from '@material-ui/core'
import {
  createStripeAccount,
  createStripeAccountLink,
  createStripeLogin,
  verifyStripeAccount
} from '../../apis/stripe'
import { getAllInvoiceRequest } from '../../actions/invoiceActions'
import { ToastContext } from 'context/Toast'
import { AppLoader } from 'components/Common/Core/AppLoader'
import { updateAccount } from 'actions/account'
import { AppTable } from 'components/Common/Core/AppTable'
import ErrorIcon from '@material-ui/icons/Error'
import { Invoice } from '../../utils/Interface'
import { InvoicesTable } from 'components/Invoices/InvoicesTable'
import { getCustomerBalance } from 'actions/stripeActions'

type DispatchProps = { updateAccount: (account: Account) => void }
type StateProps = {
  account: Account
  invoices: Array<Invoice>
  user: User
  customerTotalBalance: number
  availableBalance: number
}
type Props = { history: any } & StateProps & DispatchProps
type State = {
  monthBalance: number
  numberOfInvoicesThisMonth: number
  creatingAccount: boolean
  stripeAccount: StripeAccount | null | undefined
  stripeLoginLink: StripeLoginLink | null
}

const InvoicesScreen = ({
  account,
  updateAccount,
  invoices,
  history,
  user,
  customerTotalBalance,
  availableBalance
}: Props) => {
  const theme = useTheme()
  const classes = useStyles()
  const toastContext = useContext(ToastContext)
  const dispatch = useDispatch()

  const [state, setState] = useState<State>({
    monthBalance: 0,
    numberOfInvoicesThisMonth: 0,
    creatingAccount: false,
    stripeAccount: null,
    stripeLoginLink: null
  })

  const {
    monthBalance,
    numberOfInvoicesThisMonth,
    creatingAccount,
    stripeAccount,
    stripeLoginLink
  } = state

  useEffect(() => {
    if (
      typeof account?.stripe?.accountId === 'string' &&
      account?.stripe?.accountId
    ) {
      _verifyStripeAccount()
      dispatch(getCustomerBalance())
    }
    dispatch(getAllInvoiceRequest(account))
  }, [])

  const _verifyStripeAccount = async () => {
    try {
      const {
        isUpdated,
        stripeAccount,
        account: updatedAccount
      } = await verifyStripeAccount(account)

      if (isUpdated) {
        updateAccount(updatedAccount)
      }

      setState((state) => ({ ...state, stripeAccount }))
    } catch (error) {
      console.log('Failed to fetch stripe account')
    }
  }

  const handleConnectStripeAccount = async () => {
    try {
      setState((state) => ({ ...state, creatingAccount: true }))
      let stripeAccountId = account.stripe.accountId

      if (!stripeAccountId) {
        const stripeAccount = await createStripeAccount(account, user)
        stripeAccountId = stripeAccount.id
      }

      onboardStripeAccount(stripeAccountId)
    } catch (error) {
      console.log(error)
      setState((state) => ({ ...state, creatingAccount: false }))
      toastContext.showToast({ title: 'Failed to connect. Try again.' })
    }
  }

  const onboardStripeAccount = async (id: string) => {
    try {
      const stripeAccountLink = await createStripeAccountLink(id)
      setState((state) => ({ ...state, creatingAccount: false }))
      if (stripeAccountLink && stripeAccountLink.url) {
        window.location.href = stripeAccountLink.url
      }
    } catch (error) {
      console.log(error)
      setState((state) => ({ ...state, creatingAccount: false }))
      toastContext.showToast({ title: 'Failed to connect. Try again.' })
    }
  }

  const createLoginLink = async (stripeAccountId: string) => {
    const loginLink = await createStripeLogin(stripeAccountId)
    setState((state) => ({ ...state, stripeLoginLink: loginLink }))
    return loginLink
  }

  const navigateStripeDashboard = async (toAccount?: boolean) => {
    if (
      !(
        !!account.stripe.accountId &&
        typeof account.stripe.accountId === 'string' &&
        account.stripe.detailsSubmitted
      )
    )
      return
    try {
      let loginLink = stripeLoginLink
      if (!loginLink) {
        loginLink = await createLoginLink(account.stripe.accountId)
      }
      console.log(loginLink)
      window.location.href = loginLink.url + (toAccount ? '#/account' : '')
    } catch (error) {
      toastContext.showToast({ title: 'Failed to login. Try again.' })
    }
  }

  const getCurrencySymbol = () => account.region?.currencySymbol || '$'

  const renderHeader = () => (
    <div className={classes.sectionHeader}>
      <div className={classes.sectionTitleContainer}>
        <Typography variant='h5' style={{ fontWeight: 'bold' }}>
          Invoices
        </Typography>
      </div>
      <div className={'row'}>
        {!account?.stripe?.payoutsEnabled &&
          !!account?.stripe?.detailsSubmitted && (
            <div className={'row'}>
              <ErrorIcon
                color={'error'}
                style={{ marginRight: theme.spacing(1) }}
              />
            </div>
          )}
        <div
          className={classes.stripeAccountContainer}
          style={{ opacity: account?.stripe?.detailsSubmitted ? 1 : 0.3 }}
          onClick={() => navigateStripeDashboard(true)}>
          <img
            src={stripeLogo}
            height={30}
            className={classes.stripeAccountLogo}
          />
          <Typography className={classes.stripeAccountText}>Account</Typography>
        </div>
      </div>
    </div>
  )

  const renderConnect = () => {
    if (user.id !== account.owner) {
      return (
        <div className={classes.buttonContainer}>
          <Typography variant='h5'>
            You must be an account owner to connect a stripe account
          </Typography>
        </div>
      )
    }

    if (account.stripe.detailsSubmitted) {
      return null
    }

    return (
      <div className={classes.buttonContainer}>
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: theme.spacing(4)
          }}>
          <GradiantButton onClick={handleConnectStripeAccount}>
            <div className='row'>
              <Typography variant='body1'>Connect with</Typography>
              <img src={stripeLogo} height={40} />
              {creatingAccount && (
                <AppLoader
                  color={theme.palette.primary.light}
                  className={classes.loader}
                  type='spinningBubbles'
                  height={35}
                  width={35}
                />
              )}
            </div>
          </GradiantButton>
        </div>
      </div>
    )
  }

  return (
    <div className={'screenContainer'}>
      <div className={'screenInner'}>
        <div className='responsivePadding'>
          <div className={classes.balanceSection}>
            <div className={classes.balanceSectionInner}>
              <div className={classes.balanceItemsContainer}>
                <div className={classes.balanceItem}>
                  <Typography variant={'body1'}>This month</Typography>
                  <Typography variant={'h4'}>
                    {getCurrencySymbol()}
                    {monthBalance.toFixed(2)}
                  </Typography>
                  <Typography variant={'caption'} className={'metaText'}>
                    {numberOfInvoicesThisMonth} invoices
                  </Typography>
                </div>
                <div className={classes.balanceItem}>
                  <Typography variant={'body1'}>Your balance</Typography>
                  <Typography variant={'h4'}>
                    {getCurrencySymbol()}
                    {(customerTotalBalance / 100).toFixed(2)}
                  </Typography>
                  <Typography variant={'caption'} className={'metaText'}>
                    {getCurrencySymbol()}
                    {(availableBalance / 100).toFixed(2)} available
                  </Typography>
                </div>
              </div>

              <div className={classes.payOutContainer}>
                <GradiantButton
                  className={classes.payOutButton}
                  inActive={!stripeAccount || availableBalance === 0}>
                  <Typography variant='body1'>Pay out now</Typography>
                </GradiantButton>
                <div
                  className={classes.viewPayouts}
                  onClick={() => navigateStripeDashboard()}>
                  <Typography
                    variant={'caption'}
                    style={{
                      color: theme.palette.primary.light,
                      fontWeight: 'bold'
                    }}>
                    View payouts
                  </Typography>
                </div>
              </div>
            </div>
          </div>

          <Section className={classes.section}>
            <div className={classes.sectionInner}>
              {renderHeader()}

              {!!account?.stripe?.detailsSubmitted && (
                <div className={classes.tableContainer}>
                  <InvoicesTable
                    invoices={invoices}
                    history={history}
                    accountId={account.id}
                  />
                </div>
              )}

              {renderConnect()}
            </div>
          </Section>
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    padding: theme.spacing(1),
    paddingTop: theme.spacing(2),
    flex: 1,
    display: 'flex'
  },
  viewPayouts: {
    '&:hover': { background: theme.palette.common.black },
    padding: `${2}px ${theme.spacing(2)}px`,
    transition: theme.transitions.create(['background']),
    borderRadius: theme.shape.borderRadius,
    cursor: 'pointer'
  },
  stripeAccountContainer: {
    borderRadius: theme.shape.borderRadius,
    '&:hover': { background: theme.palette.background.default },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 2,
    paddingLeft: 4,
    paddingRight: 4,
    transition: theme.transitions.create(['background']),
    cursor: 'pointer'
  },
  stripeAccountLogo: {},
  stripeAccountText: { fontSize: 12, marginTop: -1 },
  sectionInner: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    alignSelf: 'stretch'
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1.5)
  },
  sectionTitleContainer: { flex: 1 },
  sectionBody: { display: 'flex', flexDirection: 'column', flex: 1 },
  payOutContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: theme.spacing(7),
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(4),
      marginLeft: 0,
      alignItems: 'center'
    }
  },
  payOutButton: {
    minWidth: 'auto',
    marginBottom: theme.spacing(1.5)
  },
  buttonContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    margin: theme.spacing(1),
    marginTop: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    background: theme.palette.background.surface,
    padding: theme.spacing(2),
    textAlign: 'center'
  },
  loader: { marginLeft: theme.spacing(1) },
  balanceSection: {
    display: 'flex',
    padding: 0
  },
  balanceSectionInner: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center'
    }
  },
  balanceItemsContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignSelf: 'stretch'
  },
  balanceItem: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing(7),
    [theme.breakpoints.down('sm')]: {
      margin: 'auto',
      alignItems: 'center'
    }
  },
  section: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
    paddingTop: 0
  }
}))

const mapState = (state: ReduxState): StateProps => ({
  account: state.auth.account as Account,
  invoices: state.invoice.allInvoicesData,
  user: state.auth.user as User,
  customerTotalBalance: state.stripe.customerTotalBalance as number,
  availableBalance: state.stripe.customerAvailableBalance as number
})

const mapDispatch: DispatchProps = { updateAccount }

export default connect(mapState, mapDispatch)(InvoicesScreen)
