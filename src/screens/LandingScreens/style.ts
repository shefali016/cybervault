import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => {
  const transitionConfig = {
    duration: 400,
    easing: theme.transitions.easing.easeOut
  }

  return {
    socialBar: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(3),
      paddingLeft: theme.spacing(6),
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column-reverse',
        alignItems: 'center',
        padding: theme.spacing(3),
        paddingLeft: theme.spacing(0)
      }
    },
    socialButton: {
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(1),
      [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(1)
      }
    },
    socialIcon: { fontSize: 40, color: theme.palette.text.meta },

    pricingScreenContent: {
      zIndex: 1,
      paddingTop: theme.spacing(15),
      color: 'white'
    },

    subscriptionPricesContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: theme.spacing(10)
    },

    footerListContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginBottom: theme.spacing(5)
    },
    footerListButton: {
      color: theme.palette.common.white,
      justifyContent: 'flex-start',
      minWidth: 200,
      paddingLeft: theme.spacing(2),
      marginLeft: -theme.spacing(2)
    },
    footerListItems: {
      marginTop: theme.spacing(1),
      paddingTop: theme.spacing(2),
      borderTopStyle: 'solid',
      borderTopWidth: 1,
      borderTopColor: theme.palette.background.surfaceHighlight,
      display: 'flex',
      flexDirection: 'column'
    },
    footerListInnerRow: {
      display: 'flex',
      alignItems: 'flex-start',
      flex: 1,
      justifyContent: 'space-around',
      [theme.breakpoints.down(400)]: {
        flexDirection: 'column'
      }
    },

    imageFooter: {
      width: '100vw',
      position: 'relative',
      marginTop: theme.spacing(10)
    },
    imageFooterImage: { width: '100vw', objectFit: 'cover', minHeight: 500 },
    footerContent: {
      textAlign: 'center',
      color: theme.palette.common.white,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
      background: `linear-gradient(${theme.palette.background.default}, #FFFFFF00 30%, #FFFFFF00 30%, ${theme.palette.background.default})`,
      padding: theme.spacing(10),
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(3),
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6)
      }
    },
    footerTitle: {
      fontWeight: 'bold',
      [theme.breakpoints.down('sm')]: {
        fontSize: 25
      }
    },
    footerSubTitle: {
      marginTop: theme.spacing(1),
      [theme.breakpoints.down('sm')]: {
        fontSize: 18
      }
    },

    trustedPartnerContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    trustedPartnerImage: {
      width: '20vw',
      maxWidth: 250,
      minWidth: 120,
      objectFit: 'cover',
      margin: theme.spacing(1)
    },
    trustedPartnerImageWide: {
      width: '40vw',
      minWidth: 260,
      maxWidth: 500,
      objectFit: 'cover',
      margin: theme.spacing(1)
    },

    featureSlideContainer: {
      background: `linear-gradient(90deg, #09BDFF, #0088FC, #4E4EFF, #7B09FF)`,
      padding: theme.spacing(8),
      borderRadius: 30,
      flex: 1,
      color: theme.palette.common.white,
      [theme.breakpoints.down('sm')]: { padding: theme.spacing(3) }
    },
    featureRow: {
      display: 'flex',
      [theme.breakpoints.down('md')]: { flexDirection: 'column' }
    },
    featureSlideImage: {
      height: 'auto',
      width: '100%'
    },
    featureTitle: {
      [theme.breakpoints.down('md')]: {
        fontSize: 35
      }
    },
    featureContentContainer: {
      flex: 1,
      paddingLeft: theme.spacing(5),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      [theme.breakpoints.down('md')]: {
        paddingLeft: theme.spacing(0),
        paddingTop: theme.spacing(5)
      }
    },

    sliderContainer: {
      width: '100%',
      maxWidth: 1200,
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'row'
      }
    },
    sliderBg: {
      borderRadius: 10,
      overflow: 'hidden',
      flex: 1,
      display: 'flex',
      height: 10,
      backgroundColor: theme.palette.background.surfaceHighlight,
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        height: 'auto',
        maxWidth: 10
      }
    },
    slider: {
      height: 10,
      flex: 1,
      transition: theme.transitions.create(['background'], transitionConfig),
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'row',
        height: 'auto',
        maxWidth: 10
      }
    },
    activeSlider: { background: theme.palette.primary.main },
    sliderItem: {
      width: '100%',
      marginTop: theme.spacing(3),
      paddingLeft: theme.spacing(2),
      textAlign: 'center',
      [theme.breakpoints.down('sm')]: {
        marginTop: theme.spacing(0),
        flex: 1,
        alignSelf: 'stretch',
        paddingLeft: theme.spacing(0),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
      },
      cursor: 'pointer'
    },
    sliderItemBorder: {
      borderRightStyle: 'solid',
      borderRightWidth: 1,
      borderRightColor: theme.palette.background.surfaceHighlight,
      [theme.breakpoints.down('sm')]: {
        borderRightStyle: 'none',
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: theme.palette.background.surfaceHighlight
      }
    },
    sliderTitle: { fontWeight: 'bold' },
    sliderSubtitle: { color: theme.palette.text.meta },
    sliderItems: {
      display: 'flex',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        flex: 1,
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3)
      }
    },

    headerBackground: { width: '100vw', height: '100vh', position: 'absolute' },
    shadowOverlay: {
      background: `linear-gradient(#FFFFFF00 70%,  ${theme.palette.background.default})`,
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },

    checkListItem: {
      display: 'flex',
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2)
    },
    checkListIcon: { fontSize: 30, color: theme.palette.primary.main },
    checkListTextContainer: { paddingLeft: theme.spacing(2) },
    checkListTitle: { fontWeight: 'bold' },
    checkListSubtitle: { color: theme.palette.text.meta },

    computerImage: {
      width: '100%',
      height: 'auto'
    },

    container: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: theme.palette.background.default,
      position: 'relative',
      minHeight: '100vh',
      userSelect: 'none'
    },

    navContainer: { position: 'fixed', width: '100%', zIndex: 100 },
    nav: {
      top: 0,
      display: 'flex',
      zIndex: 100,
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: theme.spacing(3),
      transition: theme.transitions.create(['background'], transitionConfig),
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(2)
      }
    },
    navTranslucent: { background: `${theme.palette.background.secondary}` },
    navOpen: { background: theme.palette.background.secondary },
    navItemContainer: {
      display: 'flex',
      justifyContent: 'center',
      flex: 1,
      [theme.breakpoints.down('md')]: {
        display: 'none'
      }
    },
    navItem: {
      color: theme.palette.common.white,
      width: 150,
      opacity: 1,
      [theme.breakpoints.down('md')]: {
        width: '90%',
        paddingTop: 15,
        paddingBottom: 15
      },
      transition: theme.transitions.create(['opacity'], transitionConfig)
    },
    navItemInactive: { opacity: 0 },
    navItemTitle: { fontSize: 20 },
    navLoginContainer: {
      color: theme.palette.common.white,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      [theme.breakpoints.down('md')]: {
        display: 'none'
      }
    },

    navToggle: {
      display: 'none',
      [theme.breakpoints.down('md')]: {
        display: 'block'
      }
    },
    navToggleIcon: { fontSize: 40, color: theme.palette.common.white },
    navCollapsed: {
      paddingBottom: theme.spacing(5),
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      transformOrigin: 'top',
      background: theme.palette.background.secondary,
      transition: theme.transitions.create(['height'], transitionConfig)
    },
    navCollapsedOpen: { height: 400 },
    navCollapsedClosed: {
      overflow: 'hidden',
      pointerEvents: 'none',
      paddingBottom: theme.spacing(0),
      height: 0
    },

    loginButton: {
      color: theme.palette.common.white,
      width: 150,
      [theme.breakpoints.down('md')]: {
        width: '90%',
        paddingTop: 15,
        paddingBottom: 15
      },
      transition: theme.transitions.create(['opacity'], transitionConfig)
    },
    loginTitle: { fontSize: 20 },

    headerContent: {
      color: theme.palette.common.white,
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      justifyContent: 'center',
      padding: theme.spacing(10),
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(3)
      }
    },
    headerTitle: {
      fontWeight: 'bold',
      [theme.breakpoints.down('sm')]: {
        fontSize: 25
      }
    },
    headerSubTitle: {
      marginTop: theme.spacing(3),
      [theme.breakpoints.down('sm')]: {
        fontSize: 18
      }
    },

    signUpInputContainer: {
      display: 'flex',
      marginTop: theme.spacing(6),
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column'
      }
    },
    signUpInput: {
      maxWidth: 400,
      marginRight: 30,
      height: 60,
      borderRadius: 30,
      backgroundColor: 'rgba(0,0,0,0.3)',
      paddingLeft: 10,
      color: theme.palette.common.white,
      [theme.breakpoints.down('sm')]: {
        marginRight: 0
      }
    },
    signUpInputLabel: {
      marginTop: 10,
      marginLeft: 10,
      color: theme.palette.common.white
    },
    signUpInputLabelFocused: { marginTop: 0, marginLeft: 0 },
    signUpButtonContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative'
    },
    signUpButton: {
      height: 60,
      borderRadius: 30,
      transition: theme.transitions.create(['opacity'], transitionConfig),
      [theme.breakpoints.down('md')]: {
        marginTop: theme.spacing(2)
      }
    },
    signUpButtonCaption: { position: 'absolute', bottom: -25 },

    roundGradiantButton: {
      height: 60,
      borderRadius: 30,
      fontSize: 30
    },

    appIcon: {
      color: theme.palette.common.white,
      fontSize: 50,
      cursor: 'pointer'
    },
    header: {
      width: '100vw',
      height: '100vh',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column'
    },
    headerImage: {
      top: 0,
      width: '100vw',
      height: '100vh',
      objectFit: 'cover',
      position: 'absolute'
    },

    section: {
      padding: `${theme.spacing(12)}px ${theme.spacing(6)}px`,
      display: 'flex',
      justifyContent: 'center',
      color: theme.palette.text.background,
      [theme.breakpoints.down('sm')]: {
        padding: `${theme.spacing(12)}px ${theme.spacing(3)}px`
      }
    },
    sectionInner: { flex: 1, maxWidth: 1400 }
  }
})
