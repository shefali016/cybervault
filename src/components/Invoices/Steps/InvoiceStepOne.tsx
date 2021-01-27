import {useEffect,useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardContent, Typography, Grid } from '@material-ui/core'
import logo from '../../../assets/logo.png'
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
  WHITE_COLOR,
} from 'utils/constants/colorsConstants'
import { Invoice, Project } from '../../../utils/types';
import InvoiceLogo from '../../../assets/invoice.png';
import Milestone from '../../../assets/milestone.png';
import {GradiantButton }from '../../Common/Button/GradiantButton';


type InvoiceStepProps = {
  project: Project
  headerTitle: String,
  onNext:(invoiceType:any)=>void
 //   allProjects: Array<Project>
}



const InvoiceStepOne = ({ project, headerTitle ,onNext}: InvoiceStepProps) => {
  const classes = useStyles()

  const handleClick=(invoiceType:string)=>{
        onNext(invoiceType)
}

  return (
    <Grid>
      <div>
        <Typography variant={'h5'} className={classes.headerTitle}>
          {headerTitle}
        </Typography>
        <Typography variant={'body2'}>{project.campaignName}</Typography>
      </div>

      <Grid item sm={2} className={classes.imageWrapper}>
        <Card>
          <CardContent>
            <Grid>
              <img
                src={project.logo ? project.logo : ""}
                className={classes.img}
              />
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid container justify='center' className={classes.wrapper} >
          <Grid item sm={5} className={`${classes.wrapperBorder}`}>
              <img src={InvoiceLogo}/>
              <Typography className={`${classes.heading}`}>Invoice full amount</Typography>
              <Typography className={classes.subHeading}>Clients will receive Invoice and downloadable project fle</Typography>
              <GradiantButton className={classes.btn} onClick={()=>handleClick('fullAmount')}>Continue</GradiantButton>
          </Grid>
          <Grid item sm={5} >
              <img src={Milestone}/>
          <Typography className={classes.heading}>Invoice full milestone</Typography>
          <Typography className={classes.subHeading}>Clients will receive a partial invoice for steps Completed</Typography>
          <GradiantButton className={classes.btn} onClick={()=>handleClick('mileStone')}>Continue</GradiantButton>
          </Grid>
      </Grid>
    
      {/* {allProjects.map((pro) => {
        return (
          <Grid item sm={3}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Grid container>
                  <Grid item sm={3} container alignItems='center'>
                    <img
                      src={pro.logo ? pro.logo : logo}
                      className={classes.img}
                    />
                  </Grid>
                  <Grid item sm={9}>
                    <Typography className={classes.bodyText}>
                      {pro.campaignName}
                    </Typography>
                    <Typography className={classes.bottomText}>
                      {pro.description}
                    </Typography>
                    <Typography className={classes.bottomText}>
                      Date Completed:{pro.campaignDate}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        )
      })} */}
    </Grid>
  )
}
const useStyles = makeStyles((theme) => ({
  headerTitle: {
    fontWeight: BOLD
  },
  img: {
    width: '100%'
  },
  imageWrapper: {
    margin: 'auto'
  },
wrapperBorder:{
borderRight:`1px solid ${GREY_COLOR}`
},
  wrapper:{
      textAlign:'center',
      padding:'32px 0'
  },
  heading:{
      fontWeight:BOLD,
      fontSize:18
  },
  subHeading:{
      fontSize:10
  },
  btn:{
      minWidth:136,
      borderRadius:22,
      margin:'20px 0'
  }
}))

export default InvoiceStepOne
