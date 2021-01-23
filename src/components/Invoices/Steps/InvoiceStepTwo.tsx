import { makeStyles } from '@material-ui/core/styles'
import { Card, CardContent, Typography, Grid } from '@material-ui/core'
import logo from '../../../assets/logo.png'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  BLOCK,
  BOLD,
  CENTER,
  GRID,
  FLEX,
  AUTO
} from 'utils/constants/stringConstants'
import {
  GREY_COLOR,
  BORDER_COLOR_GREY_LIGHT,
  SECONDARY_COLOR,
  WHITE_COLOR
} from 'utils/constants/colorsConstants'
import { Project } from '../../../utils/types'
import Invoice from '../../../assets/invoice.png'
import Milestone from '../../../assets/milestone.png'
import { GradiantButton } from '../../Common/Button/GradiantButton'
// import EditIcon from '@material-ui/icons/EditIcon';

type InvoiceStepProps = {
  project: Project
  headerTitle: String
  invoiceType:string
  onNext: (invoiceType:any) => void
  handleSendInvoice:()=>void
  //   allProjects: Array<Project>
}

const InvoiceStepTwo = ({ project, headerTitle, onNext,invoiceType,handleSendInvoice }: InvoiceStepProps) => {
  const classes = useStyles()
  const handleClick=()=>{
     onNext(null)
     handleSendInvoice()
  }
  return (
        <>
          <Grid container spacing={3} alignItems='center' >
            <Grid item sm={2}>
              <Card>
                <CardContent className={classes.cardContent}>
                  <Grid>
                    <img
                      src={project.logo ? project.logo : logo}
                      className={classes.img}
                    />
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item sm={10}>
              <Typography variant={'h5'} className={classes.headerTitle}>
                Invoice
              </Typography>
              <Typography variant={'body2'} className={classes.subHeading}>
                {'Review Details'}
              </Typography>
            </Grid>
          </Grid>
          <div className={classes.mainWrapper}>
            <Grid container>
              <Typography className={classes.subHeading}>Client Details:</Typography>
              {/* <Typography><EditIcon/></Typography> */}
            </Grid>
            <Grid container className={classes.detailsWrapper}>
              <Grid item sm={3}>
                <Typography className={classes.textField}>Client Name</Typography>
                <Typography className={classes.textField}>Email Invoiced To:</Typography>
              </Grid>
              <Grid item sm={3}>
                <Typography className={classes.textField}>{project.clientName}</Typography>
                <Typography className={classes.textField}>{project.clientEmail}</Typography>
              </Grid>
            </Grid>
          </div>
          <div className={classes.mainWrapper}>
            <Grid container >
              <Typography className={classes.subHeading}>Project Details:</Typography>
              {/* <Typography><EditIcon/></Typography> */}
            </Grid>
            <Grid container className={classes.detailsWrapper}>
              <Grid item sm={3}>
                <Typography className={classes.textField}>Campaign Objective:</Typography>
                <Typography className={classes.textField}>Deadline:</Typography>
                <Typography className={classes.textField}>Project Summary:</Typography>
              </Grid>
              <Grid item sm={3}>
                <Typography className={classes.textField}>{project.campaignObjective}</Typography>
                <Typography className={classes.textField}>{project.campaignDeadline||"-"}</Typography>
                <Typography className={classes.textField}>{project.description}</Typography>
              </Grid>
            </Grid>
          </div>
          <div className={classes.amountWrapper}>
            <Grid container >
              <Typography className={classes.subHeading}>Invoice Details:</Typography>
              {/* <Typography><EditIcon/></Typography> */}
            </Grid>
            <Grid container className={classes.detailsWrapper}>
              <Grid item sm={3}>
                <Typography className={classes.textField}>Production Budget</Typography>
                <Typography className={classes.textField}>Production Expenses</Typography>
                <Typography className={`${classes.textField} ${classes.totalAmount}`}>Total Due</Typography>
              </Grid>
              <Grid item sm={1}>
                <Typography className={classes.textField}>${project.campaignBudget}</Typography>
                <Typography className={classes.textField}>${project.campaignExpenses}</Typography>
                <Typography className={`${classes.textField} ${classes.totalAmount}`}>${Number(project.campaignBudget)+Number(project.campaignExpenses)}</Typography>
              </Grid>
            </Grid>
          </div>
          <Grid container justify='flex-end' alignItems='center'>
              <Typography className={classes.previewText}>Preview</Typography>
              <GradiantButton className={classes.invoiceBtn} onClick={handleClick}>Send Invoice</GradiantButton>
          </Grid>
        </>
     
        
     
   
  )
}
const useStyles = makeStyles((theme) => ({
  headerTitle: {
    fontWeight: BOLD
  },
  cardContent:{
    padding:theme.spacing(1),
    '&:last-child':{
      paddingBottom:theme.spacing(1)
    }
  },
  img: {
    width: '100%'
  },
  imageWrapper: {
    margin: 'auto'
  },

  heading: {
    fontWeight: BOLD,
    fontSize: 18
  },
  subHeading: {
    fontSize: 15,
    fontWeight: 600
  },
  detailsWrapper:{
    paddingLeft:theme.spacing(12)
  },
  textField:{
    fontSize:12,
    padding:'5px 0'
  },
  mainWrapper:{
    padding:`${theme.spacing(3)}px 0`,
    borderBottom:`1px solid ${BORDER_COLOR_GREY_LIGHT}`
  },
  totalAmount:{
    borderTop:`1px solid ${BORDER_COLOR_GREY_LIGHT}`
  },
  amountWrapper:{
    paddingTop:theme.spacing(4)
  },
  invoiceBtn:{
    fontSize:12,
    minWidth:120,
    padding:8,
    borderRadius:22,
  },
  previewText:{
    color:GREY_COLOR,
    fontSize:12,
    padding:theme.spacing(2)
  }
}))

export default InvoiceStepTwo
