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
  activeDot: { position: 'absolute', left: '50%', bottom: 6 },

  screen: { minHeight: '100vh', display: 'flex', flexDirection: 'column' },
  loader: { alignSelf: 'center' },

  projectBarContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: `${theme.spacing(1)}px ${theme.spacing(3)}px`,
    [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing(1)}px ${theme.spacing(1)}px`
    }
  },
  portfoloTabsList: {
    overflowX: 'scroll',
    flex: 1,
    display: 'inline-flex',
    gap: 10,
    listStyle: 'none'
  },

  projectBarCollapsed: {
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing(2),
    transition: theme.transitions.create(['height', 'padding'], {
      duration: 400,
      easing: theme.transitions.easing.easeOut
    })
  },

  projectButton: {
    fontWeight: 'bold',
    fontSize: 18,
    margin: 0,
    marginTop: 0,
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    minWidth: 200,
    color: 'black'
  },

  shareButton: {
    fontSize: 20,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    borderRadius: 100,
    background: theme.palette.background.default,
    color: theme.palette.text.background,
    '&:hover': { background: theme.palette.background.surfaceHighlight }
  },

  portfoloDarkTabsList: {
    '& $projectButton': {
      color: '#fff'
    }
  },
  portfolioWrapper: {
    display: FLEX,
    flex: 1,
    flexGrow: 1,
    flexDirection: COLUMN,
    maxWidth: 1400,
    alignSelf: 'center',
    borderRadius: 20,
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
    padding: `${theme.spacing(7)}px ${theme.spacing(6)}px`,
    marginBottom: theme.spacing(5),
    marginTop: theme.spacing(5),
    [theme.breakpoints.down('md')]: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      padding: `${theme.spacing(4)}px ${theme.spacing(3)}px`,
      marginBottom: theme.spacing(4),
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
    background: 'rgba(0,0,0,0.2) !important',
    marginTop: `${theme.spacing(10)}px !important`,
    marginBottom: `${theme.spacing(10)}px !important`,
    [theme.breakpoints.down('sm')]: {
      marginTop: `${theme.spacing(5)}px !important`,
      marginBottom: `${theme.spacing(5)}px !important`
    }
  }
}))
