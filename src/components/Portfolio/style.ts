import { makeStyles } from '@material-ui/core'
import { GREY_COLOR, TRANSPARENT } from 'utils/constants/colorsConstants'
import {
  CENTER,
  FLEX,
  POSITION_ABSOLUTE,
  POSITION_RELATIVE
} from 'utils/constants/stringConstants'

export const useStyles = makeStyles((theme) => ({
  uploadFolderIcon: {
    fontSize: 60,
    color: theme.palette.primary.light,
    opacity: 0.6,
    transition: theme.transitions.create(['opacity'], {
      duration: 500
    })
  },
  portfolioBoxMainWrap: {},
  portfolioFolder: {
    color: '#fff',
    marginBottom: theme.spacing(6)
  },
  buttonIcon: {
    fontSize: 30,
    marginRight: 10
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
      margin: 0
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
  createPortfolioButton: {
    padding: `13px 28px`,
    color: '#5ea5fc',
    cursor: 'pointer',
    background: theme.palette.common.white,
    transition: theme.transitions.create(['background', 'color'], {
      duration: 600
    }),
    '&:hover': {
      background: theme.palette.primary.main,
      color: theme.palette.common.white
    }
  },
  folderDescription: { color: theme.palette.text.meta },
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
    border: '2px dashed #9ea0a28c',
    textAlign: 'center',
    padding: '40px',
    cursor: 'pointer',
    color: theme.palette.text.meta,
    transition: theme.transitions.create(
      ['border', 'background', 'color', 'opacity'],
      {
        duration: 500
      }
    ),
    '&:hover': {
      border: `2px dashed ${theme.palette.grey[600]}`,
      color: theme.palette.common.white,
      background: 'rgba(0,0,0,0.1)',
      '& $uploadFolderIcon': {
        opacity: 1
      }
    }
  },
  portfolioModalHead: {
    margin: 0
  },
  loader: {
    textAlign: CENTER,
    margin: '0 auto'
  },
  image: {},
  listProject: {
    transition: theme.transitions.create(['background']),
    borderRadius: theme.shape.borderRadius,
    marginBottom: 3
  },
  selectedProject: {
    background: `${theme.palette.primary.light}60`,
    '&:hover': { background: `${theme.palette.primary.light}80` }
  },
  selectedProjectText: { fontWeight: 'bold' }
}))
