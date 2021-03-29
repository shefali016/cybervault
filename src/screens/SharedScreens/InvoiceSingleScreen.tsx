import React, { useEffect, useState, useMemo, useRef, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getInvoiceRequest,
  sendRevisionRequest,
  getAllInvoiceConversationRequest,
  payInvoice,
  requestDeleteInvoice
} from '../../actions/invoiceActions'
import { requestGetProjectDetails } from '../../actions/projectActions'
import { getClientRequest } from '../../actions/clientActions'
import { useOnChange } from '../../utils/hooks'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Grid, Card, Typography } from '@material-ui/core'
import { AssetCarousel } from '../../components/Common/Carousel/Carousel'
import { FeatureAssetList } from '../../components/Common/Carousel/FeatureAssetList'
import Editor from '../../components/Common/textEditor'
import { GradiantButton } from '../../components/Common/Button/GradiantButton'
import { generateUid } from '../../utils'
import * as Types from '../../utils/Interface'
import { sendEmailRequest } from '../../actions/mails'
import { ReduxState } from 'reducers/rootReducer'
import DeleteIcon from '@material-ui/icons/Delete'
import clsx from 'clsx'
import {
  Invoice,
  Project,
  Client,
  Account,
  User,
  InvoiceShare
} from '../../utils/Interface'
import { ToastContext } from 'context/Toast'
import { getAccount } from 'apis/account'
import { getUser } from 'apis/user'
import { FullScreenLoader } from 'components/Common/Loading/FullScreenLoader'
import Header from 'components/Common/Header/header'
import MediaConvert, { MediaConvertParams } from './MediaConvert'
import { convertMedia, getSingleAsset, addAsset } from '../../apis/assets'
import { CardModal } from '../../components/Stripe/CardModal'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import { getSubscription } from '../../apis/stripe'
import { SubscriptionTypes } from '../../utils/enums'
import { getSubscriptionDetails } from '../../utils/subscription'
import { AppDivider } from 'components/Common/Core/AppDivider'
import { getInvoiceShare } from 'apis/invoiceApi'
import { PopoverMoreIconButton } from 'components/Common/Popover/PopoverMoreIconButton'

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
  const theme = useTheme()
  const dispatch = useDispatch()

  const toastContext = useContext(ToastContext)

  // Select cache from state
  const {
    invoiceCache,
    projectCache,
    clientCache,
    account,
    user,
    revisionSuccess,
    revisionLoading,
    invoiceConversationData,
    deletingInvoice,
    deleteSuccess
  } = useSelector((state: ReduxState) => ({
    invoiceCache: state.invoice.cache,
    projectCache: state.project.projectCache,
    clientCache: state.clients.cache,
    account: state.auth.account,
    user: state.auth.user,
    revisionSuccess: state.invoice.revisionSuccess,
    revisionLoading: state.invoice.revisionLoading,
    invoiceConversationData: state.invoice.invoiceConversationData,
    deletingInvoice: state.invoice.deletingInvoice,
    deleteSuccess: state.invoice.deleteSuccess
  }))

  const [selectedAsset, selectAsset] = useState('')
  const [mediaConversionLoading, setMediaConversionLoading] = useState(false)
  const [state, setState] = useState<{
    invoiceId: string
    ownerAccountId: string
    account: Account | null
    user: User | null
    transactionFee: number | any
    loadingError: null | string
  }>({
    account: null,
    user: null,
    transactionFee: 0,
    loadingError: null,
    invoiceId: props.match.params.id,
    ownerAccountId: props.match.params.accId
  })

  const {
    account: ownerAccount,
    user: ownerUser,
    transactionFee,
    ownerAccountId,
    invoiceId
  } = state

  const isAccountOwner: boolean = !!account && ownerAccountId === account.id

  // Select objects from cache
  const invoice: Invoice | null = useMemo(() => {
    const invoiceId = props.match.params?.id
    return invoiceId ? invoiceCache[invoiceId] : null
  }, [invoiceCache])
  const client: Client | null = useMemo(() => {
    if (!invoice) {
      return null
    }
    const clientId = invoice.clientId
    return clientCache[clientId]
  }, [invoice, clientCache])
  const project: Project | null = useMemo(() => {
    if (!invoice) {
      return null
    }
    const projectId: string = invoice.projectId
    return projectCache[projectId]
  }, [invoice, projectCache])

  const [cardModalOpen, setCardModalOpen] = useState(false)
  // Load invoice and conversations
  useEffect(() => {
    loadInitialData(invoiceId, ownerAccountId)
  }, [invoiceId, ownerAccountId])

  const loadInitialData = async (invoiceId: string, ownerAccountId: string) => {
    try {
      if (invoiceId && ownerAccountId) {
        dispatch(getInvoiceRequest(ownerAccountId, invoiceId))
        dispatch(getAllInvoiceConversationRequest(ownerAccountId, invoiceId))

        const ownerAccount = await getAccount(ownerAccountId)
        if (!ownerAccount) throw Error('No account')

        const accountOwner = await getUser(ownerAccount.owner)
        if (!accountOwner) throw Error('No account owner')

        const subscriptions = await getSubscription(accountOwner.customerId)
        if (!(subscriptions && subscriptions.length))
          throw Error('No subscription')

        const accountSubscription = subscriptions.find(
          (sub) => sub.metadata.type !== SubscriptionTypes.STORAGE
        )
        if (!accountSubscription) throw Error('No account subscription')

        const { transactionFee } = getSubscriptionDetails(
          accountSubscription.metadata.type
        )

        setState((state) => ({
          ...state,
          user: accountOwner,
          account: ownerAccount,
          transactionFee
        }))
      } else if (props.match.params.shareId) {
        const invoiceShare: InvoiceShare | undefined = await getInvoiceShare(
          props.match.params.shareId
        )
        if (invoiceShare) {
          const { accountId, invoiceId } = invoiceShare
          setState((state) => ({ ...state, accountId, invoiceId }))
        } else {
          throw Error('Missing invoice')
        }
      }
    } catch (error) {
      setState((state) => ({ ...state, loadingError: error }))
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

  useOnChange(deleteSuccess, (success: boolean) => {
    if (success) {
      props.history.goBack()
    }
  })

  const [message, setMessage] = useState('')

  const handleTextChange = (val: string) => {
    setMessage(val)
  }

  useOnChange(revisionSuccess, (success: string | null) => {
    if (success && ownerUser && client) {
      const mailPayload = {
        to: isAccountOwner ? ownerUser.email : client.email,
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

  if (state.loadingError) {
    return (
      <div className={clsx('screenContainer', 'centerContent', 'fullHeight')}>
        <Typography variant={'h4'}>Oops, something went wrong</Typography>
        <Typography variant={'subtitle1'}>
          Could not load invoice. Please try again or contact support
        </Typography>
      </div>
    )
  }

  if (!(invoice && project && ownerUser && client)) {
    return <FullScreenLoader />
  }

  const handleSendRevisonRequest = () => {
    const senderId = isAccountOwner ? ownerAccountId : client.id
    const sendersEmail = isAccountOwner ? ownerUser.email : client.email
    const receiversEmail = isAccountOwner ? client.email : ownerUser.email
    const name = isAccountOwner ? ownerUser.name : client.name

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

  const renderInvoiceAmount = () => (
    <Grid container item justify='flex-end' xs spacing={1}>
      <Grid container item alignItems='center' justify='flex-end'>
        <Typography variant='h6' className={classes.subHeading}>
          Invoice ammount:{' '}
        </Typography>
        <Typography variant='h4' style={{ fontWeight: 'bold' }}>
          ${invoice.price}
        </Typography>
      </Grid>
      {!!invoice.isPaid && (
        <div className={'row'} style={{ color: theme.palette.primary.main }}>
          <Typography variant={'body1'}>Invoice paid</Typography>
          <CheckCircleIcon style={{ fontSize: 22, marginLeft: 5 }} />
        </div>
      )}
      {!isAccountOwner && !invoice.isPaid ? (
        <Grid item>
          <GradiantButton onClick={handlePayInvoice}>
            <Typography variant='button'>{'Pay Invoice'}</Typography>
          </GradiantButton>
        </Grid>
      ) : null}
    </Grid>
  )

  const handleBack = () =>
    props.history.push(isAccountOwner ? '/invoices' : '/')

  const renderHeader = () => {
    return (
      <Header
        user={user}
        renderAppIcon={true}
        onLogoClick={handleBack}
        history={props.history}
        hideBackArrow={!user}
        style={{ position: 'fixed', top: 0 }}
      />
    )
  }
  const handlePayInvoice = () => {
    setCardModalOpen(true)
  }
  const handleCreateCharge = (token: any) => {
    if (
      token &&
      ownerAccount &&
      ownerAccount.stripe &&
      ownerAccount.stripe.accountId &&
      transactionFee
    ) {
      setCardModalOpen(false)
      const amount: number = invoice.price * 100
      const tokenId: string = token.id
      const invoiceId: string = invoice.id
      const account: string = ownerAccountId
      const stripeAccountId: string = ownerAccount.stripe.accountId

      dispatch(
        payInvoice(
          amount,
          tokenId,
          invoiceId,
          account,
          stripeAccountId,
          transactionFee
        )
      )
    } else {
      toastContext.showToast({
        title: 'Could not pay invoice. Please try again or contact support.'
      })
    }
  }

  const renderMediaConverter = () => {
    if (project.videos.length && !isAccountOwner) {
      return (
        <Grid container>
          <Grid item sm={8}></Grid>
          <Grid item sm={4}>
            <MediaConvert
              mediaConvert={mediaConvert}
              mediaConversionLoading={mediaConversionLoading}
              assetIds={project.videos}
              accountId={ownerAccountId}
              selectedAsset={selectedAsset}
            />
          </Grid>
        </Grid>
      )
    }
  }

  const handleAddAsset = async (data: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        var results = data.reduce(function (results: any, org: any) {
          ;(results[org.assetId] = results[org.assetId] || []).push(org)
          return results
        }, {})

        for (let ele in results) {
          let asset = await getSingleAsset(ele, ownerAccountId)
          let filesData = [...asset.files]
          results[ele].forEach((item: any, i: number) => {
            const newRatio = item.ratio.w / item.ratio.h
            const cropWidth = Math.ceil((newRatio * item.resolution) / 2) * 2
            filesData.push({
              assetId: item.assetId,
              id: item.id,
              height: item.resolution,
              width: cropWidth,
              status: 'pending',
              url: ''
            })
          })
          resolve(
            await addAsset(ownerAccountId, { ...asset, files: filesData })
          )
        }
      } catch (err: any) {
        reject(err)
      }
    })
  }

  const mediaConvert = async (data: MediaConvertParams[]) => {
    setMediaConversionLoading(true)
    await handleAddAsset(data)
    try {
      let res: any = await convertMedia(data)
    } catch (error) {
      toastContext.showToast({
        title:
          'Failed to start conversion. Please try again or contact support.'
      })
    }
  }

  const popoverMenuItems = [
    {
      title: 'Delete Invoice',
      onClick: () => {
        if (invoice) {
          dispatch(requestDeleteInvoice(invoice))
        }
      },
      Icon: DeleteIcon,
      desctructive: true
    }
  ]

  return (
    <div className={'screenContainer'}>
      {renderHeader()}
      <div className={classes.subHeaderSection}>
        <div />
        {project.campaignName}
        <PopoverMoreIconButton
          menuItems={popoverMenuItems}
          isLoadingDescructive={deletingInvoice === invoice.id}
        />
      </div>

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
                  {renderInvoiceAmount()}
                </Grid>

                <Grid container className={classes.campaignWrapper} spacing={5}>
                  <Grid item sm={7}>
                    <div className={classes.wrapper}>
                      <div className={clsx(classes.carousel)}>
                        <AssetCarousel
                          assetIds={project.videos}
                          accountId={ownerAccountId}
                          isVideo={true}
                          selectAsset={selectAsset}
                        />
                      </div>
                    </div>
                  </Grid>
                  <Grid item sm={5} className={classes.descContainer}>
                    <Typography paragraph variant={'h5'}>
                      Campaign Description
                    </Typography>
                    <Typography variant='body1'>
                      {project.description}
                    </Typography>
                  </Grid>
                </Grid>

                {renderMediaConverter()}

                <AppDivider spacing={10} />

                <Grid container className={classes.campaignWrapper} spacing={5}>
                  <Grid item sm={7}>
                    <div className={clsx(classes.carousel)}>
                      <FeatureAssetList
                        assetIds={project.images}
                        accountId={ownerAccountId}
                        isVideo={false}
                        innerImageClassName={classes.image}
                        assetContainerMinHeight={160}
                        featuredAsset={project.featuredImage}
                      />
                    </div>
                  </Grid>
                  <Grid item sm={5} className={classes.descContainer}>
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
                                              ? ownerUser.name
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
  descContainer: { paddingTop: theme.spacing(3) },
  paddedContainer: {
    padding: theme.spacing(4),
    paddingBottom: theme.spacing(7)
  },
  clientInvoiceWrapper: {
    border: `1px solid ${theme.palette.primary.light}75`,
    color: theme.palette.text.background,
    boxShadow: `0 0 15px 3px ${theme.palette.primary.light}75`
  },
  heading: {
    fontWeight: 800
  },
  campaignWrapper: {},
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
    borderTop: `2px solid ${theme.palette.border}`,
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
    color: theme.palette.text.paper,
    backgroundColor: theme.palette.background.paper,
    marginBottom: '5px',
    padding: '8px 12px',
    borderRadius: '16px',
    '& p': {
      margin: 0
    }
  },
  message: {},
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
    color: theme.palette.text.background
  },
  mAuto: {
    margin: 'auto'
  },
  subHeaderSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.primary.light,
    marginTop: theme.spacing(7),
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    textAlign: 'center',
    color: theme.palette.text.background,
    fontSize: 14,
    position: 'relative'
  },
  dot: {
    position: 'absolute',
    backgroundColor: theme.palette.text.background,
    borderRadius: '50%',
    bottom: 7,
    width: 5,
    height: 5,
    left: '50%'
  },
  carousel: { display: 'flex', flex: 1, alignSelf: 'stretch' }
}))

export default InvoicesClientScreen
