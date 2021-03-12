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
  screen: { minHeight: '100vh', display: 'flex', flexDirection: 'column' },
  loader: { alignSelf: 'center' },

  projectBarContainer: { display: 'flex' },
  portfoloTabsList: {
    overflowX: 'scroll',
    flex: 1,
    display: 'flex',
    listStyle: 'none',
    paddingLeft: 40,
    paddingBottom: 0,
    margin: 0,
    '& li': {
      margin: 0,
      marginTop: 0,
      minWidth: 130,
      padding: '15px',
      position: POSITION_RELATIVE,
      textAlign: CENTER,
      '&:hover': { background: 'rgba(0, 0, 0, 0.1)' },
      cursor: 'pointer'
    }
  },

  portfoloDarkTabsList: {
    '& li': {
      color: '#fff'
    }
  },
  portfolioWrapper: {
    display: FLEX,
    flex: 1,
    flexGrow: 1,
    flexDirection: COLUMN,
    borderRadius: 20,
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
    padding: `${theme.spacing(6)}px ${theme.spacing(6)}px`,
    marginBottom: theme.spacing(5),
    marginTop: theme.spacing(5),
    [theme.breakpoints.down('md')]: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      padding: `${theme.spacing(3)}px ${theme.spacing(3)}px`,
      marginBottom: theme.spacing(3),
      marginTop: theme.spacing(3)
    }
  },
  assetsOuter: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(14)
  },
  assetsInner: {
    alignSelf: 'center',
    width: '100%'
  },
  assetDivider: {
    background: 'rgba(0,0,0,0.2)',
    marginTop: `${theme.spacing(10)}px !important`,
    marginBottom: `${theme.spacing(10)}px !important`,
    [theme.breakpoints.down('sm')]: {
      marginTop: `${theme.spacing(5)}px !important`,
      marginBottom: `${theme.spacing(5)}px !important`
    }
  }
}))
