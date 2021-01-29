import Section from 'components/Common/Section'
import React, { useState, useEffect, useContext,useMemo } from 'react'
import {useDispatch,useSelector} from 'react-redux';
import { GradiantButton } from 'components/Common/Button/GradiantButton'
import { Account, StripeAccount, StripeLoginLink } from '../../utils/types'
import { ReduxState } from 'reducers/rootReducer'
import { connect } from 'react-redux'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import stripeLogo from '../../assets/stripe-logo-sm.png'
import clsx from 'clsx'
import { Typography } from '@material-ui/core'
import {
  createStripeAccount,
  createStripeAccountLink,
  getStripeAccount,
  createStripeLogin
} from '../../apis/stripe';
import {getInvoiceRequest} from '../../actions/invoiceActions'
import { ToastContext } from 'context/Toast'
import { AppLoader } from 'components/Common/Core/AppLoader'
import { updateAccount } from 'actions/account'
import { AppTable } from 'components/Common/Core/AppTable'
import InvoiceIcon from '@material-ui/icons/Receipt'
import ErrorIcon from '@material-ui/icons/Error'
import {Invoice} from '../../utils/types'

type DispatchProps = { updateAccount: (account: Account) => void }
type StateProps = { account: Account }
type Props = { history: any } & StateProps & DispatchProps
type State = {
  monthBalance: number
  totalBalance: number
  availableBalance: number
  numberOfInvoicesThisMonth: number
  creatingAccount: boolean
  stripeAccount: StripeAccount | null
  stripeLoginLink: StripeLoginLink | null
}

const InvoicesScreen = ({ account, updateAccount }: Props) => {
  const theme = useTheme()
  const classes = useStyles()
  const toastContext = useContext(ToastContext)
  const dispatch=useDispatch()
  const [state, setState] = useState<State>({
    monthBalance: 0,
    totalBalance: 0,
    availableBalance: 0,
    numberOfInvoicesThisMonth: 0,
    creatingAccount: false,
    stripeAccount: null,
    stripeLoginLink: null
  })

  const allInvoicesData=useSelector((state:ReduxState)=>state.invoice.allInvoicesData)

  const {
    monthBalance,
    totalBalance,
    availableBalance,
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
      verifyStripeAccount(account.stripe.accountId)
    }
    dispatch(getInvoiceRequest(account))

  }, [])

  const verifyStripeAccount = async (stripeAccountId: string) => {
    try {
      const stripeAccount = await getStripeAccount(stripeAccountId)
      console.log('STRIPE_ACCOUNT', stripeAccount)
      setState((state) => ({ ...state, stripeAccount }))
      const { details_submitted, payouts_enabled } = stripeAccount
      const { detailsSubmitted, payoutsEnabled } = account.stripe
      if (
        details_submitted !== detailsSubmitted ||
        payouts_enabled !== payoutsEnabled
      ) {
        updateAccount({
          ...account,
          stripe: {
            ...account.stripe,
            detailsSubmitted: details_submitted,
            payoutsEnabled: payouts_enabled
          }
        })
      }
    } catch (error) {
      console.log('Failed to fetch stripe account')
    }
  }

  const handleConnectStripeAccount = async () => {
    try {
      setState((state) => ({ ...state, creatingAccount: true }))
      let stripeAccountId = account.stripe.accountId

      if (!stripeAccountId) {
        const stripeAccount = await createStripeAccount(account)
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
        {!account?.stripe?.payoutsEnabled && !!account?.stripe?.detailsSubmitted && (
          <div className={'row'}>
            {/* <Typography style={{ marginRight: theme.spacing(1) }}>
              Finish set up
            </Typography> */}
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
const headerCells=[
  {title:"Project Name",key:"name"},
  {title:'Amount',key:'amount'},
  {title:'Date',key:'date'},
  {title:'Status',key:'status'}
]

type Cell = {
  cellProps?: any
  renderer?: () => React.ReactElement
  title?: string
  key: string
}

type Row = Array<Cell>
const getRowsData=()=>{
    let rows:Array<Row>
      rows=[]
      allInvoicesData?.length && allInvoicesData?.forEach((inv:Invoice)=>{
          rows.push([{title:inv.projectName,key:`${inv.id}projectName`}
          ,{title:`${inv.price}`,key:`${inv.id}price`},
          {title:`${inv.dateCreated}`,key:`${inv.id}date`},
          {title:inv.status,key:`${inv.id}status`}])
      })  
    return rows
}
const getRowsVal=useMemo(()=>
    getRowsData()
,[allInvoicesData.length])


  const renderInvoiceTable = () => {
    return (
      <div className={classes.tableContainer}>
        <AppTable
          rows={getRowsVal}
          headerCells={headerCells}
          tableContainerClassName={classes.table}
          emptyProps={{ Icon: InvoiceIcon, title: 'No invoices' }}
        />
      </div>
    )
  }

  return (
    <div className={clsx('screenContainer', 'centerContent')}>
      <Section className={classes.balanceSection}>
        <div className={classes.balanceSectionInner}>
          <div></div>
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
                {totalBalance.toFixed(2)}
              </Typography>
              <Typography variant={'caption'} className={'metaText'}>
                {getCurrencySymbol()}
                {availableBalance.toFixed(2)} available
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
                style={{ color: theme.palette.primary.light }}>
                View payouts
              </Typography>
            </div>
          </div>
        </div>
      </Section>

      <Section className={classes.section}>
        <div className={classes.sectionInner}>
          {renderHeader()}

          {!!account?.stripe?.detailsSubmitted && renderInvoiceTable()}

          {!account?.stripe?.detailsSubmitted && (
            <div className={classes.buttonContainer}>
              <div
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}>
                <GradiantButton onClick={handleConnectStripeAccount}>
                  <div className='row'>
                    <Typography variant='body1'>Connect with</Typography>
                    <img src={stripeLogo} height={40} />
                  </div>
                </GradiantButton>
                {creatingAccount && (
                  <AppLoader
                    color={theme.palette.primary.light}
                    className={classes.loader}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </Section>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    padding: theme.spacing(1),
    paddingTop: theme.spacing(2),
    flex: 1,
    display: 'flex',
    minHeight: 500
  },
  table: {
    flex: 1,
    borderRadius: theme.shape.borderRadius
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
    background: theme.palette.background.surface
  },
  loader: { position: 'absolute', bottom: -80 },
  balanceSection: {
    display: 'flex',
    backgroundColor: theme.palette.background.default,
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
  account: state.auth.account as Account
})

const mapDispatch: DispatchProps = { updateAccount }

export default connect(mapState, mapDispatch)(InvoicesScreen)
