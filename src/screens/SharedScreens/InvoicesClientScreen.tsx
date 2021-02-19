import { HtmlHTMLAttributes, useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getInvoiceRequest,
  sendRevisionRequest,
  getAllInvoiceConversationRequest
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
import {
  sendEmailRequest,
  getAllMailTemplatesRequest
} from '../../actions/mails'
import { ReduxState } from 'reducers/rootReducer'

import {
  PRIMARY_DARK_COLOR,
  PRIMARY_COLOR,
  SECONDARY_DARK_COLOR,
  SECONDARY_COLOR
} from '../../utils/constants/colorsConstants'
import clsx from 'clsx'

const InvoicesClientScreen = (props: any) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const accId = props.match.params.accId
  const accountData = useSelector((state: any) => state.auth)
  const invoiceData = useSelector((state: any) => state.invoice)
  const projectDetails = useSelector(
    (state: any) => state.project.projectDetails
  )
  const clientDetails = useSelector(
    (state: any) => state.clients.clientDetailData
  )
  useEffect(() => {
    dispatch(getInvoiceRequest(accId, props.match.params.id))
    dispatch(getAllInvoiceConversationRequest(accId, props.match.params.id))
  }, [])
  useOnChange(invoiceData.getInvoiceSuccess, (success: string | null) => {
    if (success) {
      dispatch(getClientRequest(accId, invoiceData.invoiceData.clientId))
      dispatch(
        requestGetProjectDetails(accId, invoiceData.invoiceData.projectId)
      )
      dispatch(getAllMailTemplatesRequest())
    }
  })

  const [message, setMessage] = useState('')

  const handleTextChange = (val: string) => {
    setMessage(val)
  }

  const handleSendRevisoRequest = () => {
    const payload = {
      message: message,
      date: new Date().toLocaleString(),
      sendersEmail: accountData.isLoggedIn
        ? invoiceData.invoiceData.userDetails.email
        : clientDetails.email,
      receiversEmail: accountData.isLoggedIn
        ? clientDetails.email
        : invoiceData.invoiceData.userDetails.email,
      name: accountData.isLoggedIn
        ? invoiceData.invoiceData.userDetails.name
        : clientDetails.name,
      id: generateUid()
    }

    dispatch(sendRevisionRequest(accId, invoiceData.invoiceData.id, payload))
  }
  const mailData = useSelector((state: ReduxState) => state.mail)

  const getTemplateId = () => {
    if (mailData.mailTemplatesData) {
      let data: any
      data = mailData.mailTemplatesData.find((tmp: Types.MailTemplate) => {
        return tmp.type === 'revision'
      })
      return data?.templateId
    }
  }
  const templateId = useMemo(() => {
    return getTemplateId()
  }, [mailData.mailTemplatesData])

  useOnChange(invoiceData.revisionSuccess, (success: string | null) => {
    if (success && templateId) {
      const mailPayload = {
        to: accountData.isLoggedIn
          ? clientDetails.email
          : invoiceData.invoiceData.userDetails.email,
        from: 'no-reply@employeelinkapp.com',
        templateId: templateId.trim() || '',
        type: 'revision',
        data: {
          message: 'Message Received'
        }
      }
      dispatch(sendEmailRequest(mailPayload))
    }
  })

  const renderInvoiceAmmount = () => (
    <Grid container justify='flex-end' xs spacing={1}>
      <Grid container item alignItems='center' justify='flex-end'>
        <Typography variant='h6' className={classes.subHeading}>
          Invoice ammount:{' '}
        </Typography>
        <Typography variant='h5' style={{ fontWeight: 'bold' }}>
          ${invoiceData.invoiceData.price}
        </Typography>
      </Grid>
      <Grid item>
        <GradiantButton>
          <Typography variant='button'>Pay Invoice</Typography>
        </GradiantButton>
      </Grid>
    </Grid>
  )

  return (
    <Grid container justify='center'>
      <Grid item>
        <Card className={classes.clientInvoiceWrapper}>
          <Grid container className={classes.paddedContainer}>
            <Grid item xs>
              <Typography variant={'h4'} className={classes.heading}>
                {projectDetails.campaignName}
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
                    assetIds={projectDetails.videos}
                    accountId={accId}
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
                {projectDetails.description}
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
                  assetIds={projectDetails.images}
                  accountId={accId}
                  isVideo={false}
                  innerImageClassName={classes.image}
                  assetContainerMinHeight={160}
                  // onFeatureSelect={onFeatureSelect}
                  // featuredAsset={featuredAsset}
                />
              </div>
            </Grid>
            <Grid item sm={5}>
              <Typography paragraph variant={'h5'}>
                Project Details
              </Typography>
              <Grid container alignItems='center'>
                <Typography className={classes.subHeading} variant='subtitle1'>
                  Campaign Objective:
                </Typography>
                <Typography className={classes.field} variant='body1'>
                  {projectDetails.campaignObjective}
                </Typography>
              </Grid>
              <Grid container alignItems='center'>
                <Typography className={classes.subHeading} variant='subtitle1'>
                  Campaign Deadline:
                </Typography>
                <Typography variant='body1'>
                  {projectDetails.campaignDeadLine}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            container
            justify='flex-end'
            className={classes.paddedContainer}>
            {renderInvoiceAmmount()}
          </Grid>

          <Grid item sm={11} container justify='center'>
            <div className={classes.editorSection}>
              <Typography
                paragraph
                color='textSecondary'
                className={classes.revisionHeading}>
                Revision Requests
              </Typography>

              <Grid container className={classes.conversationWrapper}>
                {invoiceData?.invoiceConversationData?.length
                  ? invoiceData.invoiceConversationData.map(
                      (chat: Types.userConversation, i: number) => {
                        return (
                          <Grid
                            item
                            sm={12}
                            container
                            justify={
                              accountData.isLoggedIn
                                ? invoiceData.invoiceData.userDetails.email ===
                                  chat.sendersEmail
                                  ? 'flex-end'
                                  : 'flex-start'
                                : invoiceData.invoiceData.clientEmail ===
                                  chat.sendersEmail
                                ? 'flex-end'
                                : 'flex-start'
                            }>
                            <Grid
                              item
                              sm={5}
                              className={classes.messageDateWrapper}>
                              <div className={classes.messageWrapper}>
                                <Typography
                                  className={`${classes.textBold} ${classes.name}`}>
                                  {accountData.isLoggedIn
                                    ? invoiceData.invoiceData.userDetails
                                        .email !== chat.sendersEmail
                                      ? chat.name
                                      : ''
                                    : invoiceData.invoiceData.clientEmail !==
                                      chat.sendersEmail
                                    ? chat.name
                                    : ''}
                                </Typography>
                                <Typography
                                  className={classes.message}
                                  dangerouslySetInnerHTML={{
                                    __html: chat.message
                                  }}></Typography>
                              </div>
                              <Typography className={classes.date}>
                                {chat.date}
                              </Typography>
                            </Grid>
                          </Grid>
                        )
                      }
                    )
                  : null}
              </Grid>
              <Editor
                handleTextChange={handleTextChange}
                placeholder={'Add a note to request a revision'}
                resetValue={invoiceData.revisionSuccess}
              />
              <Grid container justify='flex-end'>
                <GradiantButton
                  className={classes.gradiantBtn}
                  onClick={handleSendRevisoRequest}
                  loading={invoiceData.revisionLoading}
                  disabled={invoiceData.revisionLoading}>
                  {!invoiceData.revisionLoading && 'Send Revision Request'}
                </GradiantButton>
              </Grid>
            </div>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  )
}

const useStyles = makeStyles((theme) => ({
  paddedContainer: { padding: theme.spacing(4) },
  clientInvoiceWrapper: {
    background: theme.palette.background.surface,
    border: `1px solid ${theme.palette.primary.light}`,
    color: '#fff',
    padding: theme.spacing(2),
    boxShadow: `0 0 10px ${theme.palette.primary.light}`,
    marginBottom: theme.spacing(6),
    marginLeft: theme.spacing(6),
    marginRight: theme.spacing(6)
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

  carousel: { display: 'flex', flex: 1, alignSelf: 'stretch' }
}))

export default InvoicesClientScreen
