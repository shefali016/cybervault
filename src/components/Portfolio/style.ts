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
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
    padding: `${theme.spacing(2)}px ${theme.spacing(1)}px`,
    [theme.breakpoints.down('md')]: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      padding: `${theme.spacing(2)}px ${theme.spacing(1)}px`
    }
  },
  contentHeaderLogo: {
    height: 60,
    width: 'auto'
  },
  portfolioTitle: {},

  activeDot: { position: 'absolute', left: '50%', bottom: 6 },

  screen: { minHeight: '100vh', display: 'flex', flexDirection: 'column' },
  screenloader: { alignSelf: 'center' },

  projectBarContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: `${theme.spacing(1)}px ${theme.spacing(3)}px`,
    [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing(1)}px ${theme.spacing(1)}px`
    }
  },
  portfoloTabsList: {
    overflowX: 'scroll',
    flex: 1,
    display: 'inline-flex',
    gap: 10,
    listStyle: 'none'
  },

  projectBarCollapsed: {
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing(1),
    transition: theme.transitions.create(['height', 'padding'], {
      duration: 400,
      easing: theme.transitions.easing.easeOut
    })
  },

  projectButton: {
    fontWeight: 'bold',
    fontSize: 18,
    margin: 0,
    marginTop: 0,
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    minWidth: 200,
    color: 'black'
  },

  shareButton: {
    fontSize: 20,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    borderRadius: 100,
    background: theme.palette.background.default,
    color: theme.palette.text.background,
    '&:hover': { background: theme.palette.background.surfaceHighlight }
  },

  portfoloDarkTabsList: {
    '& $projectButton': {
      color: '#fff'
    }
  },
  portfolioWrapper: {
    display: 'flex',
    flex: 1,
    flexGrow: 1,
    flexDirection: 'column',
    maxWidth: 1500,
    alignSelf: 'center',
    borderRadius: 20,
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
    padding: `${theme.spacing(7)}px ${theme.spacing(6)}px`,
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down('md')]: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      padding: `${theme.spacing(4)}px ${theme.spacing(3)}px`,
      marginBottom: theme.spacing(4)
    }
  },
  assetsOuter: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(14)
  },
  assetsInner: {
    alignSelf: 'center',
    width: '100%'
  },
  assetDivider: {
    background: 'rgba(0,0,0,0.2) !important',
    marginTop: `${theme.spacing(10)}px !important`,
    marginBottom: `${theme.spacing(10)}px !important`,
    [theme.breakpoints.down('sm')]: {
      marginTop: `${theme.spacing(5)}px !important`,
      marginBottom: `${theme.spacing(5)}px !important`
    }
  },

  portfolioList: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: 1200
  },
  responsivePortfolioItem: {},

  addIcon: {
    fontSize: 30,
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
    minWidth: getCardHeight(theme),
    boxSizing: 'border-box'
  },
  portfolioFolderTitle: {
    marginBottom: theme.spacing(2),
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
    position: 'relative',
    '& img': {
      position: 'absolute',
      width: '100%',
      height: '100%',
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
