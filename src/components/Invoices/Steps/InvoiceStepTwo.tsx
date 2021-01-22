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
  WHITE_COLOR
} from 'utils/constants/colorsConstants'
import { Project } from '../../../utils/types';
import Invoice from '../../../assets/invoice.png';
import Milestone from '../../../assets/milestone.png';
import {GradiantButton }from '../../Common/Button/GradiantButton';

type InvoiceStepProps = {
  project: Project
  headerTitle: String,
  onNext:(invoiceType:String)=>void
 //   allProjects: Array<Project>
}


// const InvoiceStepOne = ({ allProjects }: InvoiceStepProps) => {
const InvoiceStepTwo = ({ project, headerTitle ,onNext}: InvoiceStepProps) => {
  const classes = useStyles()

  const handleClick=(invoiceType:String)=>{
    if(invoiceType==='fullAmount'){
        onNext(invoiceType)
    }
    else{
        onNext(invoiceType)
    }
}
  console.log(project, 'project')
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
                src={project.logo ? project.logo : logo}
                className={classes.img}
              />
            </Grid>
          </CardContent>
        </Card>
      </Grid>
     

     
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

  heading:{
      fontWeight:BOLD,
      fontSize:18
  },
  subHeading:{
      fontSize:10
  },
 

  //   bodyText: {
  //     fontWeight: BOLD,
  //     fontSize: 10
  //   },
  //   cardContent: {
  //     padding: theme.spacing(1),
  //     '&:last-child':{
  //         paddingBottom:theme.spacing(1)
  //     }
  //   },
  //   card:{
  //       border:`1px solid ${BORDER_COLOR_GREY_LIGHT}`
  //   },

  //   textWrapper: {
  //     display: GRID,
  //     marginLeft: 5,
  //     alignContent: CENTER
  //   },
  //   bottomText: {
  //     fontWeight: BOLD,
  //     fontSize: 8,
  //     color: GREY_COLOR
  //   },
}))

export default InvoiceStepTwo
