import React from "react";
import { Button, Card, CardContent, Typography } from "@material-ui/core";
import logo from '../../../assets/logo.png';
import { makeStyles } from '@material-ui/core/styles';
import { BLOCK, BOLD, CENTER, GRID, FLEX, AUTO } from "utils/constants/stringConstants";
import { GREY_COLOR, SECONDARY_COLOR, WHITE_COLOR } from "utils/constants/colorsConstants";

function UnpaidInvoices(props: {
  projectDetails?: any,
  openProject?: any,

}) {
  const classes = useStyles();
  return (<Button onClick={props.openProject} className={classes.button}>
    <Card className={classes.card}>
      <div>
        <CardContent style={{ display: 'flex' }}>
            <div className={classes.imgWrapper}>
              <img className={classes.img} src={(props.projectDetails && props.projectDetails.image) ? props.projectDetails.image : logo} alt="Logo" />
            </div>
            <div className={classes.textWrapper}>
              <Typography className={classes.bodyText}>
                {(props.projectDetails && props.projectDetails.name) ? props.projectDetails.name : "Nike Summer Campaign"}
              </Typography>
              <Typography className={classes.bottomText}>
                {(props.projectDetails && props.projectDetails.value) ? props.projectDetails.value : "Doc 2016 campaign with audi Q6"}
              </Typography>
            </div>
        </CardContent>
      </div>
    </Card>
  </Button>);
}
const useStyles = makeStyles((theme) => ({
  button:{
    height: '4rem', 
    marginTop: 10, 
    background: SECONDARY_COLOR,
  },
  card: {
    width: '16rem', 
    height: '4rem', 
    background: SECONDARY_COLOR, 
    zIndex: 2,
  },
  imgWrapper: { 
    backgroundColor: WHITE_COLOR, 
    borderRadius: 10, 
    alignItems: CENTER, 
    justifyContent: CENTER, 
    display: FLEX, 
    padding: 5, 
    paddingTop: 10, 
    paddingBottom: 10  
  },
  bodyText:
  {
    fontWeight: BOLD, 
    fontSize: 8, 
    color: '#FFF',
  },
 img: { 
    width: AUTO, 
    height: AUTO, 
    display: BLOCK, 
    maxWidth:30, 
    maxHeight:30 
  },
  textWrapper: {
    display: GRID, 
    marginLeft: 5, 
    alignContent: CENTER,
  },
  bottomText:{
    fontWeight: BOLD, 
    fontSize: 6, 
    color: GREY_COLOR,
  }

}));
export default UnpaidInvoices;