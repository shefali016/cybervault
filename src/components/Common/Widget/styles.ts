import { makeStyles } from '@material-ui/core'
import { COLUMN, FLEX } from 'utils/constants/stringConstants'

export const useStyles = makeStyles((theme) => ({
    clientDetailsContainer: {
        marginBottom: 30,
        display: FLEX,
        flex: 1,
        flexDirection: COLUMN
      }
}))