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
  screen: {minHeight: "100vh", display: "flex", flexDirection: "column"},
  portfoloTabsList: {
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
      "&:hover": {background: "rgba(0, 0, 0, 0.1)"}
    },
  },
  portfoloDarkTabsList: {
    '& li': {
      color: '#fff'
    },
  },
  portfolioWrapper: {
    display: FLEX,
    flex: 1,
    flexGrow: 1,
    flexDirection: COLUMN,
    borderRadius: 20,
    marginLeft: theme.spacing(8),
    marginRight: theme.spacing(8),
    padding: theme.spacing(6),
    marginBottom: theme.spacing(5),
    marginTop: theme.spacing(5),

  },
  assetsOuter: {
    display: "flex",
    flexDirection: "column",
  },
  assetsInner: {
    alignSelf: "center",
    width: "100%",
    maxWidth: 800,
  }
}))
