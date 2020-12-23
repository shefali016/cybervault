import React from "react";
import { Button, Card, Grid } from "@material-ui/core";
import logo from '../../../assets/logo.png';
import { makeStyles } from '@material-ui/core/styles';
import { AUTO, BLOCK, CENTER, FLEX } from "utils/constants/stringConstants";
import { BLACK_COLOR } from "utils/constants/colorsConstants";
function ProjectCard(props: {
    projectDetails?: any,
    openProject?: any,
}){
    const classes = useStyles();
      return ( <Button onClick={props.openProject}>
            <Card className={classes.card}>
                <Grid container spacing={4} direction={'column'}>
                    <Grid item xs={12} className={classes.imageWrapper}>
                        <img className={classes.img} src={(props.projectDetails && props.projectDetails.image) ? props.projectDetails.image : logo} alt="Logo" />
                    </Grid>
                    <Grid item xs={12}>
                        <h5 className={classes.title}>
                            {(props.projectDetails && props.projectDetails.name) ? props.projectDetails.name : "Project Name"}
                        </h5>
                        <h6 className={classes.bodyText}>Value: {(props.projectDetails && props.projectDetails.value) ? props.projectDetails.value : "value"} . {(props.projectDetails && props.projectDetails.date) ? props.projectDetails.date : "Starting Date"}</h6>
                    </Grid>
                </Grid>            
            </Card>
        </Button>);
}

const useStyles = makeStyles((theme) => ({
    card: {
        width: '10rem', 
        height: '10rem', 
        borderRadius: 15, 
        flexGrow: 1
    },
    imageWrapper: { 
        boxShadow: '0 0px 1px 2px #DCDCDC', 
        alignItems: CENTER, 
        display: FLEX, 
        justifyContent: CENTER,
    },
    title:
    {
        fontSize: '12px',
        color: BLACK_COLOR,
        fontWeight: 600,
        margin: 0,
    },
    bodyText:
    {
    fontSize: '8px',
    color: BLACK_COLOR,
    margin: 0,
    },
    img:{ 
    width: AUTO, 
    height: AUTO, 
    display: BLOCK, 
    maxWidth:300, 
    maxHeight:200,
    marginTop: 10
 }

}));
export default ProjectCard;