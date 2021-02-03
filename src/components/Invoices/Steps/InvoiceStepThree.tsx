import { makeStyles } from '@material-ui/core/styles'
import {useDispatch} from 'react-redux'
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
import { Project } from '../../../utils/Interface';
import Invoice from '../../../assets/invoice.png';
import Milestone from '../../../assets/milestone.png';
import {GradiantButton }from '../../Common/Button/GradiantButton';
import CheckIcon from '@material-ui/icons/Check';



type InvoiceStepThreeProps = {
  project: Project,
  handleDoneClick:()=>void
  getAmountByMilestone:()=>number
  invoiceType:string,
  getFullAmount:()=>number
}


const InvoiceStepThree = ({ project,handleDoneClick,getAmountByMilestone,invoiceType,getFullAmount}: InvoiceStepThreeProps) => {
  const classes = useStyles()
  const dispatch=useDispatch();



  return (
    
    <Grid container direction='column' alignItems='center'>
      <Grid item sm={2} className={classes.imageWrapper}>
        {project.logo && <Card>
          <CardContent>
            <Grid>
              <img
                src={project.logo ? project.logo : ""}
                className={classes.img}
              />
            </Grid>
           
          </CardContent>

        </Card>}
        <Card className={classes.successIcon}> <CheckIcon className={classes.checkIcon}/></Card>
      </Grid>
      <Grid container direction='column' alignItems='center'>
        <Typography variant={'h4'} className={classes.headerTitle} paragraph>
          {`Invoice Sent For $${invoiceType==="fullAmount"?getFullAmount():getAmountByMilestone()}`}
        </Typography>
        <Typography variant={'body2'} paragraph>To: {project.clientEmail}</Typography>
        <Typography variant={'body2'} paragraph>A confirmation has been sent to your email.</Typography>
      </Grid>
      <GradiantButton className={classes.btn} onClick={handleDoneClick}>Done</GradiantButton>
    </Grid>
  )
}
const useStyles = makeStyles((theme) => ({
  headerTitle: {
    fontWeight: BOLD,
    paddingTop:'30px'
  },
  img: {
    width: '100%'
  },
  imageWrapper: {
    margin: 'auto',
    position:'relative'
  },
successIcon:{
  textAlign: 'center',
  color: 'green',
  margin: "auto",
  borderRadius: "50%",
  width: "35px",
  height: "35px",
  backgroundColor: "white",
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
  bottom: "-15px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"

},
checkIcon:{
  
},
 
  btn:{
      minWidth:136,
      borderRadius:22,
      margin:'20px 0'
  }
}))

export default InvoiceStepThree
