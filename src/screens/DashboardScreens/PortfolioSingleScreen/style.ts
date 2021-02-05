import { makeStyles } from '@material-ui/core'
import {
  AUTO,
  BLOCK,
  CENTER,
  COLUMN,
  FLEX,
  POSITION_ABSOLUTE,
  POSITION_RELATIVE
} from 'utils/constants/stringConstants'

export const useStyles = makeStyles((theme) => ({
  portfolioTabsWrap: {
    backgroundColor: theme.palette.primary.light
  },
  portfoloTabsList: {
    display: 'flex',
    listStyle: 'none',
    paddingLeft: 40,
    '& li': {
      color: '#fff',
      minWidth: 130,
      padding: '0 15px',
      position: POSITION_RELATIVE,
      textAlign: CENTER,
      margin: 0,
      paddingBottom: 12
    },
    '& li.active::after': {
      content: `""`,
      display: BLOCK,
      width: 6,
      height: 6,
      backgroundColor: '#fff',
      borderRadius: '50%',
      margin: '5px auto 0 auto',
      position: POSITION_ABSOLUTE,
      left: '50%',
      transform: 'translateX(-50%)',
      bottom: 0
    }
  },
  portfolioWrapper: {
    backgroundColor: theme.palette.background.secondary,
    display: FLEX,
    flex: 1,
    flexGrow: 1,
    flexDirection: COLUMN,
    borderRadius: 20,
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
    padding: theme.spacing(6),
    marginBottom: theme.spacing(5),
    marginTop: '20px'
  },
  corosalWrapper:{
    maxWidth: 800,
    margin: AUTO,
  }
}))
