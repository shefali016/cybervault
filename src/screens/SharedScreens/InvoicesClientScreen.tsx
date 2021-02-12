import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getInvoiceRequest } from '../../actions/invoiceActions'
import { requestGetProjectDetails } from '../../actions/projectActions'
import { getClientRequest } from '../../actions/clientActions'
import { useOnChange } from '../../utils/hooks'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Card, Typography } from '@material-ui/core'
import {
  PRIMARY_DARK_COLOR,
  PRIMARY_COLOR
} from '../../utils/constants/colorsConstants'

const InvoicesClientScreen = (props: any) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const accountData = useSelector((state: any) => state.auth.account)
  const invoiceData = useSelector((state: any) => state.invoice)
  const projectDetails = useSelector(
    (state: any) => state.project.projectDetails
  )
  const clientDetails = useSelector(
    (state: any) => state.clients.clientDetailData
  )
  useEffect(() => {
    dispatch(getInvoiceRequest(accountData, props.match.params.id))
  }, [])
  useOnChange(invoiceData.getInvoiceSuccess, (success: string | null) => {
    if (success) {
      dispatch(getClientRequest(accountData, invoiceData.invoiceData.clientId))
      dispatch(requestGetProjectDetails(invoiceData.invoiceData.projectId))
    }
  })

  return (
    <Grid container justify='center'>
      <Grid item sm={11}>
        <Card className={classes.clientInvoiceWrapper}>
          <Typography variant={'h4'} paragraph className={classes.heading}>
            {projectDetails.campaignName}
          </Typography>
          <Grid container className={classes.campaignWrapper}>
            <Grid item sm={6}></Grid>
            <Grid item sm={6}>
              <Typography paragraph variant={'h5'}>
                Campaign Description
              </Typography>
              <Typography>{projectDetails.description}</Typography>
            </Grid>
          </Grid>
          <Grid container className={classes.campaignWrapper}>
            <Grid item sm={6}></Grid>
            <Grid item sm={6}>
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
                <Typography>
                  {projectDetails.campaignDeadLine}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
         {!invoiceData.invoiceData.milestones.length ? <Grid container justify='flex-end'>
            <Grid item sm={6}>
              <Typography paragraph variant={'h5'}>
                Invoice Details
              </Typography>
              <Grid container >
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
              <Grid container >
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
          </Grid>:null}
          {invoiceData.invoiceData.milestones.length ? <Grid container justify='flex-end'>
            <Grid item sm={6}>
              <Typography paragraph variant={'h5'}>
                MilestoneDetails Details
              </Typography>
              {invoiceData.invoiceData.milestones.map((mile:any)=>{
                  return <Grid container >
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
              
          :null}
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
    marginBottom:'30px'
  },
  campaignWrapper: {
    paddingBottom: theme.spacing(5)
  },
  subHeading: {
    fontSize: '18px',
    marginRight:'10px'
  },
  field: {
    // padding: '0 10px'
  },
  
  totalAmount: {
    borderTop: `2px solid #fff`,
    padding:'8px 0'
  },
  totalAmountWrapper:{
      marginTop:'8px'
  }
}))

export default InvoicesClientScreen
