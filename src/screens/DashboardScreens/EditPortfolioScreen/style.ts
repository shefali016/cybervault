import { makeStyles } from '@material-ui/core'
import {
  BLOCK,
  CENTER,
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
      bottom:0,
    }
  }
}))
