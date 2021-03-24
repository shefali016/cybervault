import React, { useEffect, useState, useMemo, useRef, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getInvoiceRequest,
  sendRevisionRequest,
  getAllInvoiceConversationRequest,
  payInvoice
} from '../../actions/invoiceActions'
import { requestGetProjectDetails } from '../../actions/projectActions'
import { getClientRequest } from '../../actions/clientActions'
import { useOnChange } from '../../utils/hooks'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Card, Typography } from '@material-ui/core'
import { AssetCarousel } from '../../components/Common/Carousel/Carousel'
import { FeatureAssetList } from '../../components/Common/Carousel/FeatureAssetList'
import Editor from '../../components/Common/textEditor'
import { GradiantButton } from '../../components/Common/Button/GradiantButton'
import { generateUid } from '../../utils'
import * as Types from '../../utils/Interface'
import { sendEmailRequest } from '../../actions/mails'
import { ReduxState } from 'reducers/rootReducer'
import { SECONDARY_DARK_COLOR } from '../../utils/constants/colorsConstants'
import clsx from 'clsx'
import { Invoice, Project, Client, Account, User } from '../../utils/Interface'
import { ToastContext } from 'context/Toast'
import { getAccount } from 'apis/account'
import { getUser } from 'apis/user'
import { FullScreenLoader } from 'components/Common/Loading/FullScreenLoader'
import Header from 'components/Common/Header/header'
import { CardModal } from '../../components/Stripe/CardModal'

const { revision } = require('sendGridTemplates.json')

type State = {
  ownerAccount: Account | null
  project: Project | null
  invoice: Invoice | null
  client: Client | null
}

type Props = { history: any; match: any; location: any }

const InvoicesClientScreen = (props: Props) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const toastContext = useContext(ToastContext)

  const { invoiceId, ownerAccountId, ownerCustomerEmail } = useMemo(() => {
    const { params } = props.match
    console.log('paramsparams', params)

    if (!(params && params.accId && params.id)) {
      return {
        invoiceId: null,
        accoownerAccountIduntId: null,
        ownerCustomerEmail: null
      }
    }
    const {
      accId: ownerAccountId,
      id: invoiceId,
      customerEmail: ownerCustomerEmail
    } = params
    return { ownerAccountId, invoiceId, ownerCustomerEmail }
  }, [props.match.params])

  // Select cache from state
  const {
    invoiceCache,
    projectCache,
    clientCache,
    account,
    user,
    revisionSuccess,
    revisionLoading,
    invoiceConversationData
  } = useSelector((state: ReduxState) => ({
    invoiceCache: state.invoice.cache,
    projectCache: state.project.projectCache,
    clientCache: state.clients.cache,
    account: state.auth.account,
    user: state.auth.user,
    revisionSuccess: state.invoice.revisionSuccess,
    revisionLoading: state.invoice.revisionLoading,
    invoiceConversationData: state.invoice.invoiceConversationData
  }))

  const [accountOwner, setAccountOwner] = useState<User | null>(null)
  const isAccountOwner = !account || ownerAccountId === account.id

  // Select objects from cache
  const invoice = useMemo(() => {
    const invoiceId = props.match.params?.id
    return invoiceId ? invoiceCache[invoiceId] : null
  }, [invoiceCache])
  const client = useMemo(() => {
    if (!invoice) {
      return null
    }
    const clientId = invoice.clientId
    return clientCache[clientId]
  }, [invoice, clientCache])
  const project = useMemo(() => {
    if (!invoice) {
      return null
    }
    const projectId = invoice.projectId
    return projectCache[projectId]
  }, [invoice, projectCache])

  const [isProjectOwner, setisProjectOwner] = useState(false)
  const [cardModalOpen, setCardModalOpen] = useState(false)
  // Load invoice and conversations
  useEffect(() => {
    if (props.location && props.location.search) {
      const isProjectOwner = props.location.search.split('=')[1]
      setisProjectOwner(isProjectOwner ? true : false)
    }
    loadInitialData()
  }, [])
  const loadInitialData = async () => {
    if (invoiceId && ownerAccountId) {
      dispatch(getInvoiceRequest(ownerAccountId, invoiceId))
      dispatch(getAllInvoiceConversationRequest(ownerAccountId, invoiceId))
      const ownerAccount = await getAccount(ownerAccountId)
      const accountOwner = await getUser(ownerAccount.owner)
      setAccountOwner(accountOwner)
    }
  }
  // Load client and project when invoice is loaded
  useOnChange(
    invoice,
    (invoice: Invoice | null, prevInvoice: Invoice | null) => {
      if (!invoice) {
        return
      }

      if (prevInvoice?.clientId !== invoice.clientId) {
        dispatch(getClientRequest(ownerAccountId, invoice.clientId))
      }
      if (prevInvoice?.projectId !== invoice.projectId) {
        dispatch(requestGetProjectDetails(ownerAccountId, invoice.projectId))
      }
    }
  )

  const [message, setMessage] = useState('')

  const handleTextChange = (val: string) => {
    setMessage(val)
  }

  useOnChange(revisionSuccess, (success: string | null) => {
    if (success && accountOwner && client) {
      const mailPayload = {
        to: isAccountOwner ? accountOwner.email : client.email,
        templateId: revision,
        type: 'revision',
        data: {
          message: 'Message Received'
        }
      }
      dispatch(sendEmailRequest(mailPayload))
    }
  })

  const messagesEndRef = useRef<any>(null)

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const conversation = invoiceConversationData[invoiceId]

  const hasMounted = useRef(false)
  useEffect(() => {
    if (hasMounted.current) {
      scrollToBottom()
    }
    hasMounted.current = true
  }, [conversation?.length])

  if (!(invoice && project && accountOwner && client)) {
    return <FullScreenLoader />
  }

  const handleSendRevisonRequest = () => {
    const senderId = isAccountOwner ? ownerAccountId : client.id
    const sendersEmail = isAccountOwner ? accountOwner.email : client.email
    const receiversEmail = isAccountOwner ? client.email : accountOwner.email
    const name = isAccountOwner ? accountOwner.name : client.name

    const payload = {
      message: message,
      date: new Date().toISOString(),
      senderId,
      sendersEmail,
      receiversEmail,
      name,
      id: generateUid()
    }

    dispatch(sendRevisionRequest(ownerAccountId, invoice.id, payload))
  }

  const renderInvoiceAmmount = () => (
    <Grid container justify='flex-end' xs spacing={1}>
      <Grid container item alignItems='center' justify='flex-end'>
        <Typography variant='h6' className={classes.subHeading}>
          Invoice ammount:{' '}
        </Typography>
        <Typography variant='h5' style={{ fontWeight: 'bold' }}>
          ${invoice.price}
        </Typography>
      </Grid>
      {!isProjectOwner ? (
        <Grid item>
          <GradiantButton disabled={invoice.isPaid} onClick={handlePayInvoice}>
            <Typography variant='button'>
              {invoice.isPaid ? 'Paid' : 'Pay Invoice'}
            </Typography>
          </GradiantButton>
        </Grid>
      ) : null}
    </Grid>
  )

  const handleBack = () => props.history.push('/invoices')

  const renderHeader = () => {
    if (!!user) {
      return (
        <Header
          user={user}
          renderAppIcon={true}
          onLogoClick={handleBack}
          history={props.history}
        />
      )
    }
    return null
  }
  const handlePayInvoice = () => {
    setCardModalOpen(true)
  }
  const handleCreateCharge = (token: any) => {
    if (token) {
      setCardModalOpen(false)
      const amount: number = invoice.price * 100
      const tokenId: string = token.id
      const invoiceId: string = invoice.id
      const account: string = ownerAccountId
      const customerEmail: string = ownerCustomerEmail
      dispatch(payInvoice(amount, tokenId, invoiceId, account, customerEmail))
    }
  }
  return (
    <div className={'screenContainer'}>
      {renderHeader()}
      <div className={classes.subHeaderSection}>
        {project.campaignName} <div className={classes.dot}></div>
      </div>

      {/* <Grid item sm={11} container>
            <Grid item sm={12} className={classes.headerSection}>
              {project.campaignName}
            </Grid>
          </Grid> */}
      <div className={'screenInner'}>
        <div className={clsx('responsivePadding', 'screenTopPadding')}>
          <Grid item container className={classes.section}>
            <Grid item sm={11} className={classes.mAuto}>
              <Card
                className={clsx('screenChild', classes.clientInvoiceWrapper)}>
                <Grid container className={classes.paddedContainer}>
                  <Grid item xs>
                    <Typography variant={'h4'} className={classes.heading}>
                      {project.campaignName}
                    </Typography>
                  </Grid>
                  {renderInvoiceAmmount()}
                </Grid>

                <Grid
                  container
                  className={classes.campaignWrapper}
                  spacing={5}
                  alignItems='center'>
                  <Grid item sm={7}>
                    <div className={classes.wrapper}>
                      <div className={clsx(classes.carousel)}>
                        <AssetCarousel
                          assetIds={project.videos}
                          accountId={ownerAccountId}
                          isVideo={true}
                        />
                      </div>
                    </div>
                  </Grid>
                  <Grid item sm={5}>
                    <Typography paragraph variant={'h5'}>
                      Campaign Description
                    </Typography>
                    <Typography variant='body1'>
                      {project.description}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  className={classes.campaignWrapper}
                  alignItems='center'
                  spacing={5}>
                  <Grid item sm={7}>
                    <div className={clsx(classes.carousel)}>
                      <FeatureAssetList
                        assetIds={project.images}
                        accountId={ownerAccountId}
                        isVideo={false}
                        innerImageClassName={classes.image}
                        assetContainerMinHeight={160}
                      />
                    </div>
                  </Grid>
                  <Grid item sm={5}>
                    <Typography paragraph variant={'h5'}>
                      Project Details
                    </Typography>
                    <Grid container alignItems='center'>
                      <Typography
                        className={classes.subHeading}
                        variant='subtitle1'>
                        Campaign Objective:
                      </Typography>
                      <Typography className={classes.field} variant='body1'>
                        {project.campaignObjective}
                      </Typography>
                    </Grid>
                    <Grid container alignItems='center'>
                      <Typography
                        className={classes.subHeading}
                        variant='subtitle1'>
                        Campaign Deadline:
                      </Typography>
                      <Typography variant='body1'>
                        {project.campaignDeadLine}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                {(!isAccountOwner || !!conversation?.length) && (
                  <Grid item sm={11} container justify='center'>
                    <div className={classes.editorSection}>
                      <Typography
                        paragraph
                        color='textSecondary'
                        className={classes.revisionHeading}>
                        Revision Requests
                      </Typography>

                      <Grid container className={classes.conversationWrapper}>
                        {conversation?.length
                          ? conversation
                              .sort((a: any, b: any) => {
                                return (
                                  new Date(a.date).valueOf() -
                                  new Date(b.date).valueOf()
                                )
                              })
                              .map(
                                (
                                  chat: Types.InvoiceConversation,
                                  i: number
                                ) => {
                                  return (
                                    <Grid
                                      item
                                      sm={12}
                                      container
                                      key={chat.id}
                                      justify={
                                        user && chat.senderId === user.id
                                          ? 'flex-start'
                                          : 'flex-end'
                                      }>
                                      <Grid
                                        item
                                        sm={5}
                                        className={classes.messageDateWrapper}>
                                        <div className={classes.messageWrapper}>
                                          <Typography
                                            className={`${classes.textBold} ${classes.name}`}>
                                            {isAccountOwner
                                              ? accountOwner.name
                                              : client.name}
                                          </Typography>
                                          <Typography
                                            className={classes.message}
                                            dangerouslySetInnerHTML={{
                                              __html: chat.message
                                            }}></Typography>
                                        </div>
                                        <Typography className={classes.date}>
                                          {new Date(chat.date).toLocaleString()}
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                  )
                                }
                              )
                          : null}
                        <Grid item sm={12} ref={messagesEndRef}></Grid>
                      </Grid>
                      <Editor
                        handleTextChange={handleTextChange}
                        placeholder={'Add a note to request a revision'}
                        resetValue={revisionSuccess}
                      />
                      <Grid container justify='flex-end'>
                        <GradiantButton
                          className={classes.gradiantBtn}
                          onClick={handleSendRevisonRequest}
                          loading={revisionLoading}
                          disabled={revisionLoading}>
                          <Typography>
                            {!revisionLoading &&
                              (isAccountOwner
                                ? 'Reply'
                                : 'Send Revision Request')}
                          </Typography>
                        </GradiantButton>
                      </Grid>
                    </div>
                  </Grid>
                )}
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
      <CardModal
        open={cardModalOpen}
        customerId={''}
        onRequestClose={() => setCardModalOpen(false)}
        directCheckout={true}
        handleCreateCharge={handleCreateCharge}
      />
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  paddedContainer: { padding: theme.spacing(4) },
  clientInvoiceWrapper: {
    border: `1px solid ${theme.palette.primary.light}75`,
    color: '#fff',
    boxShadow: `0 0 15px 3px ${theme.palette.primary.light}75`
  },
  heading: {
    fontWeight: 800
  },
  campaignWrapper: {
    paddingBottom: theme.spacing(5)
  },
  subHeading: {
    marginRight: '10px'
  },
  field: {},
  gradiantBtn: {
    borderRadius: 24,
    marginTop: 20
  },
  textBold: {
    fontWeight: 'bold'
  },
  totalAmount: {
    borderTop: `2px solid #fff`,
    padding: '8px 0'
  },
  totalAmountWrapper: {
    marginTop: '8px'
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column'
    }
  },
  image: {
    width: '100%'
  },
  editorSection: {
    borderTop: `2px solid ${SECONDARY_DARK_COLOR}`,
    marginTop: 30
  },
  revisionHeading: {
    marginTop: '30px'
  },
  conversationWrapper: {
    maxHeight: 400,
    overflow: 'scroll',
    marginBottom: '20px'
  },
  messageWrapper: {
    color: 'black',
    backgroundColor: '#e6e6e6',
    marginBottom: '5px',
    padding: '8px 12px',
    borderRadius: '16px',
    '& p': {
      margin: 0
    }
  },
  message: {
    // padding: '8px 12px',
    // borderRadius: '16px',
    // color:'black',
    // backgroundColor:'#e6e6e6',
  },
  date: {
    fontSize: '0.8rem'
  },
  name: {
    textTransform: 'capitalize',
    fontSize: '0.8rem'
  },
  messageDateWrapper: {
    marginBottom: '12px'
  },
  section: {
    color: '#fff'
  },
  mAuto: {
    margin: 'auto'
  },
  headerSection: {
    backgroundColor: '#ff0000',
    color: '#fff',
    padding: theme.spacing(3)
  },
  subHeaderSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.primary.light,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: '#fff',
    fontSize: 14,
    position: 'relative'
  },
  dot: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: '50%',
    bottom: 7,
    width: 5,
    height: 5,
    left: '50%'
  },
  carousel: { display: 'flex', flex: 1, alignSelf: 'stretch' },
  root: {
    backgroundColor: '#181818',
    paddingTop: theme.spacing(6)
  }
}))

export default InvoicesClientScreen
