import { makeStyles } from '@material-ui/core'
import { getCardHeight } from 'utils'
import { GREY_COLOR, TRANSPARENT } from 'utils/constants/colorsConstants'
import {
  CENTER,
  FLEX,
  POSITION_ABSOLUTE,
  POSITION_RELATIVE
} from 'utils/constants/stringConstants'

export const useStyles = makeStyles((theme) => ({
  addIcon: {
    fontSize: 35,
    color: theme.palette.primary.light,
    opacity: 0.6,
    marginRight: theme.spacing(1),
    transition: theme.transitions.create(['opacity'], {
      duration: 500
    })
  },
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
    fontWeight: 600,
    cursor: 'pointer',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    height: theme.spacing(10),
    marginRight: theme.spacing(3),
    minWidth: getCardHeight(theme),
    maxWidth: getCardHeight(theme),
    boxSizing: 'border-box'
  },
  portfolioFolderTitle: {
    marginBottom: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    marginLeft: theme.spacing(5)
  },
  portfolioLogo: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: TRANSPARENT,
    marginBottom: 5,
    overflow: 'hidden'
  },
  logoContent: { flex: 1, padding: theme.spacing(2) },
  cardLogo: {
    minWidth: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    background: theme.palette.grey[200],
    position: "relative",
    '& img': {
      position: 'absolute',
      width: "100%",
      height: "100%",
      objectFit: 'cover'
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
    marginBottom: theme.spacing(6),
    margin: `0 ${theme.spacing(5)}px`,
    padding: theme.spacing(3),
    borderRadius: '18px',
    border: '2px dashed #9ea0a28c',
    textAlign: 'center',
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
      },
      '& $addIcon': {
        opacity: 1
      }
    }
  },
  portfolioModalHead: {
    margin: 0
  },
  loader: {
    textAlign: CENTER,
    margin: theme.spacing(5)
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
