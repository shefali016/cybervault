import { makeStyles } from '@material-ui/core'
import { COLUMN, FLEX } from 'utils/constants/stringConstants'

export const useStyles = makeStyles((theme) => ({
    clientDetailsContainer: {
        marginBottom: 30,
        display: FLEX,
        flex: 1,
        flexDirection: COLUMN
      },
    innerDiv : {
       display:'flex',
       marginBottom: 20, 
       alignItems:'center'
      },
      title:{ 
        marginRight:15  
      },
      button:{
        padding:5, 
        height:15, 
        width:15
      },
      editIcon:{
        height:15, 
        width:15
      }
}))