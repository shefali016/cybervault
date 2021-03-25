import { makeStyles } from '@material-ui/core/styles'

export const useGlobalStyles = makeStyles((theme) => ({
  '@global': {
    '*': { outline: 'none', selection: 'none' },
    body: {
      background: theme.palette.background.default
    },
    '.assetDeleteButton': {
      position: 'absolute',
      top: '5%',
      right: '3%',
      background: '#00000050'
    },
    '.splashScreen': {
      display: 'flex',
      height: '100vh',
      width: '100vw',
      alignItems: 'center',
      justifyContent: 'center',
      background: theme.palette.background.default
    },
    '.hiddenSmDown': {
      [theme.breakpoints.down('sm')]: {
        display: 'none !important'
      }
    },
    '.hiddenMdUp': {
      [theme.breakpoints.up('md')]: {
        display: 'none !important'
      }
    },
    '.rotate180': { transform: 'rotate(180deg)' },
    '.alignLeftButton': {
      justifyContent: 'flex-start',
      paddingLeft: theme.spacing(2)
    },
    '.fullHeight': { minHeight: '100vh' },
    '.stretch': { alignSelf: 'stretch' },
    '.flex': { flex: 1 },
    '.row': { display: 'flex', alignItems: 'center' },
    '.col': { display: 'flex', flexDirection: 'column' },
    '.center': { justifyContent: 'center' },
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
      color: theme.palette.text.background,
      [theme.breakpoints.down(530)]: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3)
      }
    },
    '.fullScreenNonInteractable': {
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      bottom: 0
    },
    '.screenTopPadding': {
      paddingTop: theme.spacing(6),
      [theme.breakpoints.down('sm')]: {
        paddingTop: theme.spacing(4)
      }
    },
    '.screenContainer': {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      color: theme.palette.text.background,
      background: theme.palette.background
    },
    '.wrapContainer': { display: 'flex', flexWrap: 'wrap' },
    '.screenInner': {
      width: '100%',
      maxWidth: 1600,
      alignSelf: 'center'
    },
    '.screenInnerMd': {
      width: '100%',
      maxWidth: 1100,
      alignSelf: 'center'
    },
    '.responsivePadding': {
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
      paddingBottom: theme.spacing(6),
      [theme.breakpoints.down('sm')]: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingBottom: theme.spacing(3)
      }
    },
    '.responsiveHorizontalPadding': {
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
      [theme.breakpoints.down('sm')]: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3)
      }
    },
    '.sectionContainer': {
      paddingBottom: theme.spacing(6),
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
      [theme.breakpoints.down('sm')]: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3)
      }
    },
    '.screenChild': {
      background: theme.palette.background.secondary,
      borderRadius: theme.shape.borderRadius,
      padding: `${theme.spacing(7)}px ${theme.spacing(6)}px`,
      [theme.breakpoints.down('md')]: {
        padding: `${theme.spacing(5.5)}px ${theme.spacing(4.5)}px`,
        [theme.breakpoints.down('sm')]: {
          padding: `${theme.spacing(4)}px ${theme.spacing(3)}px`
        }
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
    '.headerContainer': {
      paddingBottom: theme.spacing(3),
      [theme.breakpoints.down('sm')]: {
        paddingBottom: theme.spacing(2),
        flexDirection: 'column',
        alignItems: 'flex-start'
      }
    },
    // Widget
    '.widgetOuter': { marginBottom: theme.spacing(6) },
    '.widgetInner': {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'nowrap',
      overflowX: 'scroll',
      whiteSpace: 'nowrap',
      paddingTop: 15,
      paddingBottom: 15
    },
    '.widgetResponsiveInner': {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'nowrap',
      overflowX: 'scroll',
      whiteSpace: 'nowrap',
      paddingTop: 15,
      paddingBottom: 15,
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column !important',
        alignItems: 'stretch'
      }
    },
    '.widgetEmptyIcon': {
      flex: 1,
      background: theme.palette.background.secondary,
      alignSelf: 'stretch',
      maxWidth: 270,
      borderRadius: 15,
      justifyContent: 'center',
      [theme.breakpoints.down('sm')]: {
        width: 'auto',
        maxWidth: '100%'
      }
    },
    '.widgetItemOuter': { marginRight: theme.spacing(3) },
    '.widgetItemResponsiveOuter': {
      marginRight: theme.spacing(3),
      [theme.breakpoints.down('sm')]: {
        marginRight: 0,
        marginBottom: theme.spacing(3)
      }
    },
    '.widgetItem': {
      width: '70vw',
      height: '70vw',
      maxWidth: 280,
      maxHeight: 280,
      borderRadius: 15,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
      '&:hover': {
        boxShadow: `0 0 10px 10px ${theme.palette.background.shadow}`
      }
    },
    '.widgetItemSmall': {
      width: '70vw',
      height: '12rem',
      maxWidth: 280,
      maxHeight: '12rem',
      borderRadius: 15,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
      '&:hover': {
        boxShadow: `0 0 10px 10px ${theme.palette.background.shadow}`
      },
      [theme.breakpoints.down('sm')]: {
        width: 'auto',
        maxWidth: '100%'
      }
    },
    '.widgetItemWide': {
      width: '70vw',
      maxWidth: 350,
      maxHeight: '12rem',
      minHeight: '12rem',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
      borderRadius: 15,
      [theme.breakpoints.down('sm')]: {
        width: 'auto',
        maxWidth: '100%'
      },
      '&:hover': {
        boxShadow: `0 0 10px 10px ${theme.palette.background.shadow}`
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
    '.tableHeader': {
      fontWeight: 'bold',
      marginBottom: theme.spacing(3)
    },
    '.tableContainer': {
      padding: theme.spacing(3),
      background: theme.palette.background.secondary,
      borderRadius: theme.shape.borderRadius,
      flex: 1,
      overflow: 'hidden'
    },
    '.table': {
      borderRadius: theme.shape.borderRadius
    },
    // Text
    '.metaText': { color: theme.palette.text.meta },
    '.whiteText': { color: 'white' },
    '.backgroundText': { color: theme.palette.text.background },
    '.twoLines': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      whiteSpace: 'normal'
    },
    '.widgetTitle': { color: theme.palette.text.background },
    // Icons
    '.whiteIconLg': { fontSize: 40, color: theme.palette.common.white },
    '.blackIconLg': { fontSize: 40, color: theme.palette.common.black },
    '.editIcon': { color: theme.palette.grey[100], fontSize: 15 },
    '.backIcon': {
      color: theme.palette.grey[500],
      fontSize: 25,
      marginLeft: 10
    },
    '.assetListEmptyIcon': {
      color: theme.palette.background.surfaceHighlight,
      fontSize: 'min(10vw, 100px)',
      position: 'absolute'
    },
    '.assetListEmptyIconSm': {
      color: theme.palette.background.surfaceHighlight,
      fontSize: 45,
      position: 'absolute',
      [theme.breakpoints.down('md')]: {
        fontSize: 35,
        [theme.breakpoints.down('sm')]: {
          fontSize: 30
        }
      }
    },
    // img
    '.circleImage': {
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
    // Buttons
    '.iconButton': {
      color: theme.palette.background.surfaceHighlight,
      backgroundColor: '#00000040'
    },
    '.MuiIconButton-root': {
      transition: theme.transitions.create(
        ['background-color', 'box-shadow', 'border'],
        {
          duration: theme.transitions.duration.standard
        }
      )
    },
    // Color
    '.lightGrey': { color: theme.palette.grey[100] },
    '.shadowLight': {
      boxShadow: `0 0 10px 10px ${theme.palette.background.shadow}`
    }
  }
}))
