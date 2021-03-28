import { makeStyles } from '@material-ui/core'
import { COLUMN, FLEX } from 'utils/constants/stringConstants'

export const useStyles = makeStyles((theme) => ({
  clientDetailsContainer: {
    display: FLEX,
    flexDirection: COLUMN
  },
  detailsContainer: { paddingLeft: theme.spacing(2) },
  innerDiv: {
    display: 'flex',
    marginBottom: 15,
    alignItems: 'center'
  },
  title: { marginRight: theme.spacing(2), color: theme.palette.text.meta },
  button: {
    padding: 5,
    height: 15,
    width: 15
  },
  editIcon: {
    height: 15,
    width: 15
  },
  bgNone: {
    backgroundColor: 'unset !important'
  },
  clientAvatarTitle: {
    marginRight: theme.spacing(2)
  }
}))
