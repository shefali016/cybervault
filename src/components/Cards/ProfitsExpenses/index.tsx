import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
// @ts-ignore
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Chart from '../../Common/Chart';
import { makeStyles, withStyles, createStyles, Theme } from '@material-ui/core/styles';
import { BOLD, CENTER, GRID } from "utils/constants/stringConstants";
import { BLACK_COLOR } from "utils/constants/colorsConstants";

export default function ProfitExpenses(props: any) {

  const CustomTabs = withStyles({
    root: {
      border: '1px solid #1890ff',
      width: 105,
      borderRadius: 25,
      minHeight: 25,
    },
    indicator: {
      backgroundColor: '#000000',
      height: 0,
      width: 0,
    },
  })(Tabs);

  const CustomTab = withStyles((theme: Theme) =>
    createStyles({
      root: {
        padding: 0,
        paddingLeft: 5,
        paddingRight: 5,
        minHeight: 25,
        textTransform: 'none',
        minWidth: 40,
        fontWeight: theme.typography.fontWeightRegular,
        borderRadius: 25,
        fontSize: 8,
        backgroundColor: 'transparent',
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
          color: '#40a9ff',
          opacity: 1,
        },
        '&$selected': {
          backgroundColor: '#1890ff',
          fontWeight: theme.typography.fontWeightMedium,
          color: '#FFFFFF'
        },
        '&:focus': {
          color: '#40a9ff',
        },
      },
      selected: {},
    }),
  )((props: StyledTabProps) => <Tab disableRipple {...props} />);
  interface StyledTabProps {
    label: string;
  }
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  const classes = useStyles();
  return (<Card className={classes.card}>
    <CardContent>
      <h5 className={classes.title}>
        Profit/Expenses
          </h5>
      <div className={classes.root}>
        <CustomTabs value={value} onChange={handleChange} aria-label="ant example">
          <CustomTab label="This Year" />
          <CustomTab label="This Month" />
        </CustomTabs>

      </div>
      {(value == 0) ? <Chart /> : <Chart />}
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



  },
  toggleGroup:
  {
    height: 20,
    width: 135,
    borderRadius: 50,
  },
  root: {
    flexGrow: 1,
    borderWidth: 1,
    borderColor: "black",
    position: "relative",
    top: -20,
    right: -150,
  },
  padding: {
    padding: theme.spacing(0),
  },
  demo1: {

  },
}));
