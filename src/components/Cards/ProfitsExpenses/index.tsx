import React from "react";
import { Card, CardContent } from "@material-ui/core";
// @ts-ignore
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Chart from '../../Common/Chart';
import { Title } from "./style";

export default function ProfitExpenses(props: any) {

    const [view, setView] = React.useState('This Year');
    const handleChange = (event: React.MouseEvent<HTMLElement>, nextView: string) => {
        setView(nextView);
    };
    return (<Card style={{ display: "grid", width: '20rem', height: '10rem', marginLeft: 10, borderRadius: 15 }}>
        <CardContent>
            <Title style={{ fontWeight: "bold", margin: 2 }}>
                Profit/Expenses
          </Title>
            <div style={{ flexDirection: "row-reverse", }}>
                <ToggleButtonGroup value={view} onChange={handleChange} exclusive aria-label="text formatting" style={{ height: 25, width: 130, borderRadius: 50 }}>
                    <ToggleButton value="This Year" aria-label="This Year" style={{ fontSize: 8, margin: 0, padding: 0 }}>
                        This Year
                    </ToggleButton>
                    <ToggleButton value="This Month" aria-label="This Month" style={{ fontSize: 8, padding: 0 }}>
                        This Month
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
            {(view == "This Year") ? <Chart /> : <Chart />

            }
        </CardContent>
    </Card>);

}