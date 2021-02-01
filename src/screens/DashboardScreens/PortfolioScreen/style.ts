import { makeStyles } from '@material-ui/core'
import {
  CENTER,
  FLEX,
  POSITION_RELATIVE
} from 'utils/constants/stringConstants'

export const useStyles = makeStyles((theme) => ({
  portfolioBoxMainWrap: {
    width: '95%',
    display: 'block',
    margin: '0 auto',
    color: '#9ea0a28c'
  },
  portfolioFolder: {
    color: '#fff',
    marginBottom: '20px'
  },
  buttonIcon: {
    marginRight: 5,
    marginLeft: -30,
    fontSize: 30
  },
  portfoliosCard: {
    width: '230px',
    height: '50px',
    display: 'flex',
    borderRadius: '15px',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#5ea5fc',
    fontWeight: 600,
    cursor: 'pointer'
  },
  portfolioFolderTitle: {
    marginBottom: '10px'
  },
  portfolioBox: {},
  portfolioModalBtn: {
    width: '200px',
    margin: '50px auto 0'
  },
  portfolioModal: {
    color: '#24262b',
    display: FLEX,
    outline: 'none',
    padding: '52px 54px',
    position: POSITION_RELATIVE,
    maxHeight: '80vh',
    overflowY: 'scroll',
    borderRadius: '42px',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    width: '100%',
    maxWidth: '500px'
  },
  portfolioBoxWrap: {
    borderRadius: '18px',
    border: '4px dashed #9ea0a28c',
    textAlign: 'center',
    marginTop: '30px',
    padding: '40px',
    cursor: 'pointer'
  },
  portfolioModalHead: {
    margin: 0
  },
  loader: {
    textAlign: CENTER,
    margin: '0 auto'
  },
  image: {}
}))
