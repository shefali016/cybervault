import { makeStyles } from '@material-ui/core'
import { FLEX } from 'utils/constants/stringConstants'

export const useStyles = makeStyles((theme) => ({
ul: {
    margin: 0,
  },
  
  strong :{
    display: 'inline-block',
    marginTop: '20px',
  },
  
  dropzone: {
    textAlign: 'center',
    padding: '20px',
    border: '2px dashed #DDDDDD',
    backgroundColor: 'transparent',
    color: '#bdbdbd',
    width: 150,
    height: 120,
    borderRadius:25
  },
  text:{
      fontSize: 13,
  },
  bottomText:{
      fontSize:11
  },
  image:{
      margin:20,
      width:62,
      height:52
  },
  topContainer:{
    display:FLEX, 
    justifyContent:'space-around'
  },
  addedImage:{
    height: 70, 
    width: 70
  },
  container:{
    display: FLEX, 
    alignItems: 'center', 
    flexDirection:'column'
  }
}))