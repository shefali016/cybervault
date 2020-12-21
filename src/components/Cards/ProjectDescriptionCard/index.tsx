import React from "react";
import { Button, Card, CardContent, Grid } from "@material-ui/core";
import logo from '../../../assets/logo.png';
import { Title, BodyText } from "./style";
const ProjectCard = (props: {
    projectDetails?: any,
    openProject?: any,
}): JSX.Element => (
        <Button onClick={props.openProject}>
            <Card style={{ width: '10rem', height: '10rem', borderRadius: 15, flexGrow: 1 }}>
                <Grid container spacing={6} direction={'column'}>
                    <Grid item xs={12} style={{ boxShadow: '0 0px 1px 2px #DCDCDC', alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                        <img src={(props.projectDetails && props.projectDetails.image) ? props.projectDetails.image : logo} style={{ width: "auto", height: "auto", display: "block", maxWidth:300, maxHeight:200 }} alt="Logo" />
                    </Grid>
                    <Grid item xs={12}>
                        <Title >
                            {(props.projectDetails && props.projectDetails.name) ? props.projectDetails.name : "Project Name"}
                        </Title>
                        <BodyText>Value: {(props.projectDetails && props.projectDetails.value) ? props.projectDetails.value : "value"} . {(props.projectDetails && props.projectDetails.date) ? props.projectDetails.date : "Starting Date"}</BodyText>
                    </Grid>
                </Grid>            
            </Card>
        </Button>
    )

export default ProjectCard;