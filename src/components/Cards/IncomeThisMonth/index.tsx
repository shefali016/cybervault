import React from 'react';
import { LinearProgress, Card, CardContent } from "@material-ui/core";
import { Title, BodyText } from "./style";

const IncomeThisMonth = (props: {
     unpaidAmount?: number,
     paidAmount?: number
}): JSX.Element => (

          <Card style={{ display: "grid", width: 250, height: '10rem', marginLeft: 10, borderRadius: 15 }}>
               <CardContent>
                    <Title> Income This Month</ Title>
                    <BodyText style={{ marginTop: 8 }}> $ {props.unpaidAmount ? props.unpaidAmount : 0}  Unpaid</BodyText>
                    <LinearProgress variant="determinate" value={props.unpaidAmount ? props.unpaidAmount : 50} style={{ width: 200, height: 18, borderRadius: 25, alignSelf: "center", marginTop: 8 }} />
                    <BodyText style={{ marginTop: 8 }}> $ {props.paidAmount ? props.paidAmount : 0}  Paid</BodyText>
                    <LinearProgress variant="determinate" value={props.paidAmount ? props.paidAmount : 50} style={{ width: 200, height: 18, borderRadius: 25, alignSelf: "center", marginTop: 8 }} />
               </CardContent>
          </Card>
     )

export default IncomeThisMonth;