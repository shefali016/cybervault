import React from "react";
import { Button, Card, CardContent, CardMedia } from "@material-ui/core";
import logo from '../../../assets/logo.png';
import { Title } from "./style";

export const UnpaidInvoices = (props: {
  projectDetails?: any,
  openProject?: any,

}): JSX.Element => {

  return (<Button onClick={props.openProject} style={{ height: '4rem', marginTop: 10, background: '#151615' }}>
    <Card style={{ width: '16rem', height: '4rem', background: '#151615', zIndex: 2 }}>
      <div>
        <CardContent>
        <img src={(props.projectDetails && props.projectDetails.image) ? props.projectDetails.image : logo} style={{ width: "auto", height: "auto", display: "block", maxWidth:300, maxHeight:200 }} alt="Logo" />
          <Title style={{ fontWeight: "bold" }}>
            {(props.projectDetails && props.projectDetails.name) ? props.projectDetails.name : "Project Name"}
          </Title>
          <Title>Value: {(props.projectDetails && props.projectDetails.value) ? props.projectDetails.value : "value"} . {(props.projectDetails && props.projectDetails.date) ? props.projectDetails.date : "Starting Date"}</Title>
        </CardContent>
      </div>
    </Card>
  </Button>);
}
export default UnpaidInvoices;