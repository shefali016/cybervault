import { makeStyles } from '@material-ui/core'
import { GREY_COLOR, TRANSPARENT } from 'utils/constants/colorsConstants'
import {
  CENTER,
  FLEX,
  POSITION_ABSOLUTE,
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
    display: 'flex',
    borderRadius: '15px',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#5ea5fc',
    fontWeight: 600,
    cursor: 'pointer',
    padding: '15px 4px 15px 15px',
    height: '100%',
    boxSizing: 'border-box'
  },
  portfolioFolderTitle: {
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    '& span': {
      marginLeft: 10,
      cursor: 'pointer',
      '& svg': {
        width: 18
      }
    }
  },
  portfolioLogo: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: TRANSPARENT,
    marginBottom: 5,
    overflow: 'hidden'
  },
  logoCOntent: {
    width: 'calc(100% - 108px)',
    padding: '0 0px 0 15px',

    '& h5': {
      color: '#353535',
      fontSize: '14px',
      margin: '0 0 5px 0',
      fontWeight: 500,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    '& p ': {
      fontSize: '10px',
      color: '#000',
      fontWeight: 300,
      margin: 0,
      textAlign: 'right'
    }
  },
  cardLogo: {
    width: 60,
    '& img': {
      maxWidth: '100%'
    }
  },
  listItemText: {
    '& span': {
      fontSize: '1.3rem'
    }
  },
  portfolioBox: {},
  portfolioLogoImg: {
    height: 80,
    borderRadius: 40,
    position: POSITION_ABSOLUTE
  },
  addLogoText: {
    fontSize: 10,
    color: GREY_COLOR
  },
  portfolioLogoContainer: {
    display: FLEX,
    marginTop: 3,
    alignItems: CENTER,
    justifyContent: CENTER
  },
  portfolioModalBtn: {
    width: '200px',
    margin: '50px auto 0',
    borderRadius: '30px',
    '& span': {
      textTransform: 'capitalize'
    }
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
