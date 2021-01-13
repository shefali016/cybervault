import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
// @ts-ignore
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Chart from '../../Common/Chart'
import {
  makeStyles,
  withStyles,
  createStyles,
  Theme
} from '@material-ui/core/styles'
import {
  BOLD,
  CENTER,
  COLUMN,
  FLEX,
  GRID
} from 'utils/constants/stringConstants'
import { BLACK_COLOR } from 'utils/constants/colorsConstants'
import clsx from 'clsx'
import { getCardHeight } from '../../../utils'

export default function ProfitExpenses(props: any) {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }
  const classes = useStyles()
  return (
    <Card className={clsx(classes.card, props.className)}>
      <CardContent>
        <div className={classes.inner}>
          <div className={classes.header}>
            <h5 className={classes.title}>Profit/Expenses</h5>
            <div className={classes.root}>
              <CustomTabs
                value={value}
                onChange={handleChange}
                aria-label='ant example'>
                <CustomTab label='This Year' />
                <CustomTab label='This Month' />
              </CustomTabs>
            </div>
          </div>
          <Chart />
        </div>
      </CardContent>
    </Card>
  )
}

const useStyles = makeStyles((theme) => ({
  inner: {
    display: FLEX,
    flexDirection: COLUMN,
    justifyContent: 'space-between'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: { flexDirection: 'column' }
  },
  card: {
    [theme.breakpoints.down('sm')]: {
      minWidth: getCardHeight(theme),
      height: '12rem'
    },
    minWidth: '18rem',
    height: '10rem',
    borderRadius: 15
  },
  title: {
    fontSize: '14px',
    color: BLACK_COLOR,
    fontWeight: BOLD,
    margin: 2,
    paddingBottom: 5,
    [theme.breakpoints.up('sm')]: { paddingRight: 20, paddingBottom: 0 }
  },
  bodyText: {
    fontSize: 8,
    margin: 0,
    padding: 0
  },
  toggleDiv: {},
  toggleGroup: {
    height: 20,
    width: 135,
    borderRadius: 50
  },
  root: {},
  padding: {
    padding: theme.spacing(0)
  },
  demo1: {}
}))

interface StyledTabProps {
  label: string
}

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
        '"Segoe UI Symbol"'
      ].join(','),
      '&:hover': {
        color: '#40a9ff',
        opacity: 1
      },
      '&$selected': {
        backgroundColor: '#1890ff',
        fontWeight: theme.typography.fontWeightMedium,
        color: '#FFFFFF'
      },
      '&:focus': {
        color: '#40a9ff'
      }
    },
    selected: {}
  })
)((props: StyledTabProps) => <Tab disableRipple {...props} />)

const CustomTabs = withStyles({
  root: {
    border: '1px solid #1890ff',
    width: 105,
    borderRadius: 25,
    minHeight: 25,
    color: '#000'
  },
  indicator: {
    backgroundColor: '#000000',
    height: 0,
    width: 0
  }
})(Tabs)
