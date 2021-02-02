import { makeStyles } from '@material-ui/core'
import {
  CENTER,
  FLEX,
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
    fontSize: 30,
    marginRight: 10
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
  portfolioFolderTitle: {
    marginBottom: theme.spacing(2)
  },
  folderDescription: { color: theme.palette.text.meta },
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
    border: '2px dashed #9ea0a28c',
    textAlign: 'center',
    marginTop: '30px',
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
  image: {}
}))
