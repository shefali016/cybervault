import { makeStyles } from '@material-ui/core/styles'

export const useGlobalStyles = makeStyles((theme) => ({
  '@global': {
    '.row': { display: 'flex', alignItems: 'center' },
    '.col': { display: 'flex', flexDirection: 'column' },
    '.icon': { color: theme.palette.grey[400], fontSize: 20 },
    '.MuiButton-label': { textTransform: 'capitalize' },
    '.MuiToggleButton-label': { textTransform: 'capitalize' },
    '.Mui-selected': {
      background: `linear-gradient(90deg, ${theme.palette.primary.light},  ${theme.palette.primary.dark})`,
      color: `#fff !important`,
      fontWeight: 'bold !important'
    },
    '.MuiTableCell-body': {
      borderColor: theme.palette.background.surfaceHighlight
    },
    '.MuiTableCell-head': {
      borderColor: theme.palette.background.surfaceHighlight
    },
    '.MuiTableRow-root': {
      '&:hover': {
        background: theme.palette.background.surfaceHighlight
      }
    },
    '.MuiTableRow-head': {
      '&:hover': {
        background: theme.palette.background.surface
      }
    },
    '.modalContent': {
      color: theme.palette.text.paper,
      backgroundColor: theme.palette.background.paper,
      padding: `${theme.spacing(6)}px ${theme.spacing(5)}px`,
      maxHeight: '80vh',
      minWidth: 400,
      outline: 'none',
      borderRadius: theme.shape.borderRadius * 2,
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'scroll',
      position: 'relative'
    },
    '.horizontalGradient': {
      background: `linear-gradient(90deg, ${theme.palette.primary.light},  ${theme.palette.primary.dark})`
    },
    '.verticalGradient': {
      background: `linear-gradient(${theme.palette.primary.light},  ${theme.palette.primary.dark})`
    },
    '.container': {
      display: 'flex',
      flexDirection: 'column'
    },
    '.dashboardScreen': {
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5)
    },
    '.screenContainer': {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      color: theme.palette.text.background,
      alignItems: 'center',
      width: '100%'
    },
    '.centerContent': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    '.add-more-button': {
      padding: '8px 20px !important',
      fontSize: '8px',
      textTransform: 'none'
    },
    '.add-more-label': {
      color: '#626262',
      fontSize: '10px !important'
    },
    // Section
    '.sectionInner': {
      background: theme.palette.common.white,
      borderRadius: theme.shape.borderRadius,
      padding: '15px 25px',
      color: theme.palette.text.paper,
      display: 'flex',
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column'
      }
    },
    // Text
    '.metaText': { color: theme.palette.text.meta }
  }
}))
