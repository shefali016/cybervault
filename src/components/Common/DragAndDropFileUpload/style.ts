import { makeStyles } from '@material-ui/core'
import { CENTER, FLEX } from 'utils/constants/stringConstants'

export const useStyles = makeStyles((theme) => ({
  ul: {
    margin: 0,
  },
  strong: {
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
    borderRadius: 25,
    position: 'relative',
  },
  text: {
    fontSize: 13,
  },
  bottomText: {
    fontSize: 11
  },
  image: {
    margin: 20,
    width: 62,
    height: 52
  },
  topContainer: {
    display: FLEX,
    justifyContent: 'space-around',
  },
  addedImage: {
    height: 70,
    width: 70
  },
  container: {
    display: FLEX,
    alignItems: 'center',
    flexDirection: 'column',
  },
  loader: {
    zIndex: 100,
  },
  loaderWrapper: {
    zIndex: 1000,
    position: 'absolute',
    right: '0px',
    bottom: '0px',
    height: '100%',
    width: '100%',
    display: FLEX,
    alignItems: CENTER,
    justifyContent: CENTER,
  }
}))