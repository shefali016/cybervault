import { makeStyles } from '@material-ui/core/styles'

export const useGlobalStyles = makeStyles((theme) => ({
  '@global': {
    '.stretch': { alignSelf: 'stretch' },
    '.flex': { flex: 1 },
    '.row': { display: 'flex', alignItems: 'center' },
    '.col': { display: 'flex', flexDirection: 'column' },
    '.icon': { color: theme.palette.grey[400], fontSize: 20 },
    '.wrap': { flexWrap: 'wrap' },
    '.fullWidth': { width: '100%' },
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
    '.modalContentWrapper': {
      outline: 'none',
      borderRadius: theme.shape.borderRadius * 2,
      overflow: 'hidden',
      position: 'relative'
    },
    '.modalContent': {
      color: theme.palette.text.paper,
      backgroundColor: theme.palette.background.paper,
      padding: `${theme.spacing(6)}px ${theme.spacing(5)}px`,
      maxHeight: '80vh',
      minWidth: 400,
      maxWidth: 1200,
      outline: 'none',
      borderRadius: theme.shape.borderRadius * 2,
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'scroll',
      position: 'relative',
      [theme.breakpoints.down('md')]: {
        // padding: `${theme.spacing(4)}px ${theme.spacing(3)}px`,
      },
      [theme.breakpoints.down('sm')]: {
        padding: `${theme.spacing(4)}px ${theme.spacing(3)}px`,
        minWidth: 'auto'
      }
    },
    '.bold': { fontWeight: 'bold' },
    '.responsiveRow': {
      display: 'flex',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column'
      }
    },
    '.scrollY': { overflowY: 'scroll' },
    '.modalContentNoScroll': {
      color: theme.palette.text.paper,
      backgroundColor: theme.palette.background.paper,
      padding: `${theme.spacing(6)}px ${theme.spacing(5)}px`,
      maxHeight: '80vh',
      minWidth: 400,
      outline: 'none',
      borderRadius: theme.shape.borderRadius * 2,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    },
    '.modalCloseButton': { position: 'absolute', top: 10, right: 10 },
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
      paddingRight: theme.spacing(5),
      [theme.breakpoints.down(530)]: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3)
      },
      color: theme.palette.text.background
    },
    '.screenContainer': {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      color: theme.palette.text.background,
      alignItems: 'center',
      width: '100%'
    },
    '.wrapContainer': { display: 'flex', flexWrap: 'wrap' },
    '.screenInner': {
      width: "100%",
      maxWidth: 1500
    },
    '.responsivePadding': {
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
      [theme.breakpoints.down('sm')]: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3)
      }
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
    '.dashBox': {
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
        }
      }
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
    '.metaText': { color: theme.palette.text.meta },
    '.whiteText': { color: 'white' }
  }
}))
