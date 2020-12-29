import React from "react";
import { Button, Card, CardContent, Typography } from "@material-ui/core";
import logo from '../../../assets/logo.png';
import { makeStyles } from '@material-ui/core/styles';
import { BOLD, CENTER, FLEX, AUTO, COLUMN, FLEX_END } from "../../../utils/constants/stringConstants";
import { GREY_COLOR } from "../../../utils/constants/colorsConstants";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

function ProjectArchives(props: {
  projectDetails?: any,
  openProject?: any,

}) {
  const classes = useStyles();
  return (
    <Button style={{ display: "inline-block", flex: 1 }}>
      <Card className={classes.card}>
        <CardContent className={classes.contentWrapper}>
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

          <div className={classes.button}>
            <ArrowForwardIosIcon fontSize="small" />
          </div>

        </CardContent>
      </Card>
    </Button>);
}
const useStyles = makeStyles((theme) => ({
  button:{ 
    marginLeft:10, 
    paddingTop: 0, 
    display:FLEX, 
    justifyContent: CENTER, 
    alignSelf: FLEX_END
},
  card: {
    width: '13rem', 
    height: '3rem',  
    zIndex: 2,
    display: FLEX,
    flex:1,
    flexDirection: "column",
    borderRadius:15,
    margin:5,
    padding:0,
    alignItems: CENTER,
    justifyContent:CENTER
  },
  imgWrapper: { 
    borderRadius: 10, 
    display:FLEX,
    alignContent: CENTER,
    justifyContent: CENTER
  },
  bodyText:
  {
    fontWeight: BOLD, 
    fontSize: 8, 
  },
 img: { 
    width: AUTO, 
    height: AUTO,  
    maxWidth:30, 
    maxHeight:30 
  },
  textWrapper: { 
    marginLeft: 5,
    display: FLEX,
    flexDirection: COLUMN,
    flexWrap: "nowrap"
  },
  bottomText:{
    fontWeight: BOLD, 
    fontSize: 6, 
    color: GREY_COLOR,
  },
  contentWrapper:{ 
  display: 'flex', 
  alignItems: CENTER, 
  justifyContent: CENTER, 
  flex:1,
  alignSelf:CENTER,
  marginTop:8
}

}));
export default ProjectArchives;