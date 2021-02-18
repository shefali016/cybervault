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

  return (
    <Grid container justify='center'>
      <Grid item sm={11}>
        <Card className={classes.clientInvoiceWrapper}>
          <Typography variant={'h4'} paragraph className={classes.heading}>
            {projectDetails.campaignName}
          </Typography>
          <Grid
            container
            className={classes.campaignWrapper}
            spacing={2}
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
              <Typography>{projectDetails.description}</Typography>
            </Grid>
          </Grid>
          <Grid
            container
            className={classes.campaignWrapper}
            alignItems='center'
            spacing={2}>
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
              <Grid container>
                <Typography className={classes.subHeading}>
                  Campaign Objective :{' '}
                </Typography>
                <Typography className={classes.field} paragraph>
                  {projectDetails.campaignObjective}
                </Typography>
              </Grid>
              <Grid container alignItems='center'>
                <Typography className={classes.subHeading}>
                  Campaign Deadline :{' '}
                </Typography>
                <Typography>{projectDetails.campaignDeadLine}</Typography>
              </Grid>
            </Grid>
          </Grid>
          {!invoiceData?.invoiceData?.milestones?.length ? (
            <Grid container justify='flex-end' spacing={2}>
              <Grid item sm={5}>
                <Typography paragraph variant={'h5'}>
                  Invoice Details
                </Typography>
                <Grid container>
                  <Grid item sm={5}>
                    <Typography className={classes.subHeading}>
                      Campaign Budget
                    </Typography>
                  </Grid>
                  <Grid item sm={3}>
                    <Typography className={classes.field}>
                      ${projectDetails.campaignBudget}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item sm={5}>
                    <Typography className={classes.subHeading}>
                      Campaign Expenses
                    </Typography>
                  </Grid>
                  <Grid item sm={3}>
                    <Typography className={classes.field} paragraph>
                      ${projectDetails.campaignExpenses}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item sm={5} className={classes.totalAmount}>
                    <Typography className={classes.subHeading}>
                      Total Amount
                    </Typography>
                  </Grid>
                  <Grid item sm={3} className={classes.totalAmount}>
                    <Typography className={classes.field}>
                      ${invoiceData.invoiceData.price}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ) : null}
          {invoiceData?.invoiceData?.milestones?.length ? (
            <Grid container justify='flex-end' spacing={2}>
              <Grid item sm={5}>
                <Typography paragraph variant={'h5'}>
                  MilestoneDetails Details
                </Typography>
                {invoiceData.invoiceData.milestones.map((mile: any) => {
                  return (
                    <Grid container>
                      <Grid item sm={5}>
                        <Typography className={classes.subHeading}>
                          {mile.title}
                        </Typography>
                      </Grid>
                      <Grid item sm={3}>
                        <Typography className={classes.field}>
                          ${mile.payment}
                        </Typography>
                      </Grid>
                    </Grid>
                  )
                })}

                <Grid container className={classes.totalAmountWrapper}>
                  <Grid item sm={5} className={classes.totalAmount}>
                    <Typography className={classes.subHeading}>
                      Total Amount
                    </Typography>
                  </Grid>
                  <Grid item sm={3} className={classes.totalAmount}>
                    <Typography className={classes.field}>
                      ${invoiceData.invoiceData.price}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ) : null}
          <Grid item sm={11} container justify='center'>
            <div className={classes.editorSection}>
              <Typography
                paragraph
                color='textSecondary'
                className={classes.revisionHeading}>
                Request Revisions
              </Typography>
              <Typography paragraph color='textSecondary'>
                Conversations
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
                                ? invoiceData.invoiceData.userDetails.email !==
                                  chat.sendersEmail
                                  ? chat.name:''
                                : invoiceData.invoiceData.clientEmail !==
                                  chat.sendersEmail?
                                chat.name:''}
                                
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
  clientInvoiceWrapper: {
    background: theme.palette.background.surface,
    border: `2px solid ${PRIMARY_COLOR}`,
    color: '#fff',
    padding: theme.spacing(2)
  },
  heading: {
    fontWeight: 800,
    marginBottom: '30px'
  },
  campaignWrapper: {
    paddingBottom: theme.spacing(5)
  },
  subHeading: {
    fontSize: '18px',
    marginRight: '10px'
  },
  field: {
    // padding: '0 10px'
  },
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
    maxHeight: '200px',
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
