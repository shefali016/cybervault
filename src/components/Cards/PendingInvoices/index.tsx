import React from 'react';
import { LinearProgress, Card, CardContent } from "@material-ui/core";
import { Title, BodyText } from "./style";

const PendingInvoices = (props: {
    unpaidAmount?: number,
    paidAmount?: number
}): JSX.Element => (

        <Card style={{ display: "grid", width: '10rem', height: '10rem' }}>
            <CardContent>
                <Title varient={"h3"}> Invoices Pending</ Title>
                <BodyText style={{ marginTop: 8 }}> $ {props.unpaidAmount ? props.unpaidAmount : 0}  Unpaid</BodyText>
                <LinearProgress variant="determinate" value={props.unpaidAmount ? props.unpaidAmount : 50} style={{ width: 120, height: 18, borderRadius: 25, alignSelf: "center", marginTop: 8 }} />
                <BodyText style={{ marginTop: 8 }}> $ {props.paidAmount ? props.paidAmount : 0}  Paid</BodyText>
                <LinearProgress variant="determinate" value={props.paidAmount ? props.paidAmount : 50} style={{ width: 120, height: 18, borderRadius: 25, alignSelf: "center", marginTop: 8 }} />
            </CardContent>
        </Card>
    )

export default PendingInvoices;