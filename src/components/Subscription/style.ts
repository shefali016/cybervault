import { makeStyles } from '@material-ui/core/styles'
import businessSubBg from '../../assets/business-sub-bg.png'

export const useStyles = makeStyles((theme) => ({
  switchWhiteRoot: { background: 'white' },
  subscriptionContainer: {
    display: 'flex',
    [theme.breakpoints.down(1000)]: {
      flexDirection: 'column'
    }
  },
  cancelDateText: {
    color: theme.palette.error.main,
    paddingTop: theme.spacing(2),
    textAlign: 'center'
  },
  loadingView: {
    display: 'flex',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: 'auto',
    height: 'auto',
    backgroundColor: 'rgba(255, 255, 255, 0.75)'
  },
  choosePlanContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'flex-end',
    paddingTop: theme.spacing(5)
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(3)
    }
  },
  subscriptionItemInner: {
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    position: 'relative',
    padding: theme.spacing(3),

    [theme.breakpoints.down(1000)]: {
      flexDirection: 'column'
    }
  },
  subscriptionItemContainer: {
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0 5px 10px #999999',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'transparent',
    cursor: 'pointer',
    transition: theme.transitions.create(
      ['transform', 'border-color', 'box-shadow'],
      {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.standard
      }
    ),

    [theme.breakpoints.down(1000)]: {
      marginLeft: theme.spacing(0),
      marginRight: theme.spacing(0),
      marginBottom: theme.spacing(4)
    }
  },
  selected: {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 5px 20px ${theme.palette.primary.light}`,
    transition: theme.transitions.create(
      ['transform', 'border-color', 'box-shadow'],
      {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.standard
      }
    ),
    transform: `translateY(-10px)`
  },
  creatorSelected: {
    transform: `translateY(-10px)`
  },
  businessSubscription: {
    borderRadius: theme.shape.borderRadius,
    background: `url(${businessSubBg})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: theme.spacing(12),

    overflow: 'hidden',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(4),
    flex: 1,
    boxShadow: '0 5px 10px #999999',
    padding: `${theme.spacing(3)}px ${theme.spacing(5)}px`,
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: theme.transitions.create(
      ['transform', 'border-color', 'box-shadow'],
      {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.standard
      }
    ),
    [theme.breakpoints.down(1000)]: {
      marginLeft: theme.spacing(0),
      marginRight: theme.spacing(0),
      marginTop: theme.spacing(2)
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
      textAlign: 'center'
    },
    '&:hover': {
      boxShadow: `0 5px 30px ${theme.palette.primary.light}`
    }
  },
  businessSubscriptionText: {
    textShadow: '0 5px 5px #000'
  },
  businessSubscriptionButton: {
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(3),
      alignSelf: 'center'
    }
  },
  divider: { margin: `${theme.spacing(3)}px 0` },
  featureTitle: {
    color: theme.palette.primary.main,
    fontSize: 16
  },
  descriptionText: {},
  priceContainer: {
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center'
  },
  priceText: { color: theme.palette.grey[600] },
  durationText: { color: theme.palette.grey[600], fontSize: 12, marginTop: 8 },
  cancelBtn: {
    minWidth: 200,
    paddingTop: 13,
    paddingBottom: 13,
    color: 'red'
  },
  ribbon: {
    backgroundColor: theme.palette.primary.main,
    position: 'absolute',
    color: 'white',
    width: 200,
    textAlign: 'center',
    textTransform: 'capitalize',
    padding: 7,
    font: 'Lato',
    '&::before': {
      position: 'absolute',
      zIndex: -1,
      content: '',
      display: 'block',
      border: '5px solid #2980b9'
    },
    '&::after': {
      position: 'absolute',
      zIndex: -1,
      content: '',
      display: 'block',
      border: '5px solid #2980b9'
    },
    transform: 'rotate(40deg)',
    top: 10,
    marginRight: -37,
    right: -38
  },
  span: {}
}))
