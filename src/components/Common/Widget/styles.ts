import { makeStyles } from '@material-ui/core'
import { COLUMN, FLEX } from 'utils/constants/stringConstants'

export const useStyles = makeStyles((theme) => ({
  clientDetailsContainer: {
    display: FLEX,
    flex: 1,
    flexDirection: COLUMN
  },
  innerDiv: {
    display: 'flex',
    marginBottom: 15,
    alignItems: 'center'
  },
  title: {
  },
  button: {
    padding: 5,
    height: 15,
    width: 15
  },
  editIcon: {
    height: 15,
    width: 15
  },
  bgNone:{
    backgroundColor: "unset !important"
  }
}))
