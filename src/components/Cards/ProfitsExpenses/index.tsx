import React from "react";
import { Card, CardContent } from "@material-ui/core";
// @ts-ignore
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Chart from '../../Common/Chart';
import { makeStyles } from '@material-ui/core/styles';
import { BOLD, CENTER, GRID, ROW_REVERSE } from "utils/constants/stringConstants";
import { BLACK_COLOR } from "utils/constants/colorsConstants";

export default function ProfitExpenses(props: any) {

    const [view, setView] = React.useState('This Year');
    const handleChange = (event: React.MouseEvent<HTMLElement>, nextView: string) => {
        setView(nextView);
    };
    const classes = useStyles();
    return (<Card className= {classes.card}>
        <CardContent>
            <h5 className= {classes.title}>
                Profit/Expenses
          </h5>
            <div className= {classes.toggleDiv}>
                <ToggleButtonGroup className= {classes.toggleGroup} value={view} onChange={handleChange} exclusive aria-label="text formatting">
                    <ToggleButton className= {classes.bodyText} value="This Year" aria-label="This Year">
                        This Year
                    </ToggleButton>
                    <ToggleButton value="This Month" className= {classes.bodyText} aria-label="This Month" style={{ fontSize: 8, padding: 0 }}>
                        This Month
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
            {(view == "This Year") ? <Chart /> : <Chart />

            }
        </CardContent>
    </Card>);

}
const useStyles = makeStyles((theme) => ({
    card: {
        display: GRID, 
        width: '20rem', 
        height: '10rem', 
        marginLeft: 10, 
        borderRadius: 15,
    },
    progressBar: { 
         width: 120, 
         height: 18, 
         borderRadius: 25, 
         alignSelf: CENTER, 
         marginTop: 8 
    },
    title:
    {
         fontSize: '14px',
         color: BLACK_COLOR,
         fontWeight: BOLD, 
         margin: 2,
    },
    bodyText:
    {
        fontSize: 8,
         margin: 0, 
         padding: 0,
    },
    toggleDiv:
    {
        flexDirection: ROW_REVERSE,
    },
  toggleGroup:
  {
    height: 25, 
    width: 130, 
    borderRadius: 50,
  },
}));
