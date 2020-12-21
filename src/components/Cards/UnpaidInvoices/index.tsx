import React from "react";
import { Button, Card, CardContent, Typography } from "@material-ui/core";
import logo from '../../../assets/logo.png';

export const UnpaidInvoices = (props: {
  projectDetails?: any,
  openProject?: any,

}): JSX.Element => {

  return (<Button onClick={props.openProject} style={{ height: '4rem', marginTop: 10, background: '#141814' }}>
    <Card style={{ width: '16rem', height: '4rem', background: '#141814', zIndex: 2 }}>
      <div>
        <CardContent style={{ display: 'flex' }}>
            <div style={{ backgroundColor: 'white', borderRadius: 10, alignItems: 'center', justifyContent: 'center', display: 'flex', padding: 5, paddingTop: 10, paddingBottom: 10 }}>
              <img src={(props.projectDetails && props.projectDetails.image) ? props.projectDetails.image : logo} style={{ width: "auto", height: "auto", display: "block", maxWidth:30, maxHeight:30 }} alt="Logo" />
            </div>
            <div style={{ display: 'grid', marginLeft: 5, alignContent: 'center' }}>
              <Typography style={{ fontWeight: "bold", fontSize: 8, color: '#FFF' }}>
                {(props.projectDetails && props.projectDetails.name) ? props.projectDetails.name : "Nike Summer Campaign"}
              </Typography>
              <Typography style={{ fontWeight: "bold", fontSize: 6, color: 'grey' }}>
                {(props.projectDetails && props.projectDetails.value) ? props.projectDetails.value : "Doc 2016 campaign with audi Q6"}
              </Typography>
            </div>
        </CardContent>
      </div>
    </Card>
  </Button>);
}
export default UnpaidInvoices;