import React from "react";
import { Button, Card, CardContent } from "@material-ui/core";
import logo from '../../../assets/logo.png';
import { Title, BodyText } from "./style";
const ProjectCard = (props: {
    projectDetails?: any,
    openProject?: any,
}): JSX.Element => (
        <Button onClick={props.openProject}>
            <Card style={{ width: '12rem', height: '9rem' }}>
                
                <CardContent>
                <img src={(props.projectDetails && props.projectDetails.image) ? props.projectDetails.image : logo} style={{ width: "auto", height: "auto", display: "block", maxWidth:300, maxHeight:200 }} alt="Logo" />
                    <Title >
                        {(props.projectDetails && props.projectDetails.name) ? props.projectDetails.name : "Project Name"}
                    </Title>
                    <BodyText>Value: {(props.projectDetails && props.projectDetails.value) ? props.projectDetails.value : "value"} . {(props.projectDetails && props.projectDetails.date) ? props.projectDetails.date : "Starting Date"}</BodyText>
                </CardContent>
            </Card>
        </Button>
    )

export default ProjectCard;