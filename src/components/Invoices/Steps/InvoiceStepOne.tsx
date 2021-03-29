import { makeStyles } from '@material-ui/core/styles'
import { Typography, Grid } from '@material-ui/core'
import { BOLD } from 'utils/constants/stringConstants'
import { GREY_COLOR } from 'utils/constants/colorsConstants'
import { Project, Client } from '../../../utils/Interface'
import InvoiceLogo from '../../../assets/invoice.png'
import Milestone from '../../../assets/milestone.png'
import { GradiantButton } from '../../Common/Button/GradiantButton'
import { ClientLogo } from '../../Clients/ClientLogo'
import { InvoiceTypes } from 'utils/enums'

type InvoiceStepProps = {
  project: Project
  headerTitle: String
  onNext: (invoiceType: any) => void
  client: Client
}

const InvoiceStepOne = ({
  project,
  headerTitle,
  onNext,
  client
}: InvoiceStepProps) => {
  const classes = useStyles()

  const handleClick = (invoiceType: string) => {
    onNext(invoiceType)
  }

  return (
    <Grid>
      <Grid>
        <Typography variant={'h5'} className={classes.headerTitle}>
          {headerTitle}
        </Typography>
        <Typography variant={'body2'}>{project.campaignName}</Typography>
      </Grid>

      <Grid item className={classes.imageWrapper}>
        <ClientLogo logo={client.logo} />
      </Grid>
      <Grid
        container
        justify='center'
        alignItems='center'
        className={classes.wrapper}>
        <Grid item sm={5} className={classes.wrapperBorder}>
          <img src={InvoiceLogo} className={classes.icon} />
          <Typography className={`${classes.heading}`}>
            Invoice full amount
          </Typography>
          <Typography className={classes.subHeading}>
            Clients will receive Invoice and downloadable project fle
          </Typography>
          <GradiantButton
            className={classes.btn}
            onClick={() => handleClick(InvoiceTypes.FULL)}>
            Continue
          </GradiantButton>
        </Grid>
        <Grid item sm={5} className={classes.milestoneSection}>
          <img src={Milestone} className={classes.icon} />
          <Typography className={classes.heading}>
            Invoice by milestone
          </Typography>
          <Typography className={classes.subHeading}>
            Clients will receive a partial invoice for steps Completed
          </Typography>
          <GradiantButton
            className={classes.btn}
            onClick={() => handleClick(InvoiceTypes.MILESTONE)}>
            Continue
          </GradiantButton>
        </Grid>
      </Grid>
    </Grid>
  )
}
const useStyles = makeStyles((theme) => ({
  milestoneSection: {
    [theme.breakpoints.down('sm')]: { marginTop: theme.spacing(2) }
  },
  headerTitle: {
    fontWeight: BOLD
  },
  imageWrapper: {
    marginTop: -theme.spacing(2),
    paddingBottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: { marginTop: theme.spacing(2) }
  },
  wrapperBorder: {
    [theme.breakpoints.up('md')]: {
      borderRight: `1px solid ${theme.palette.grey[500]}`
    }
  },
  wrapper: {
    textAlign: 'center',
    padding: '32px 0',
    [theme.breakpoints.down('sm')]: { flexDirection: 'column', display: 'flex' }
  },
  heading: {
    fontWeight: BOLD,
    fontSize: 18
  },
  subHeading: {
    fontSize: 10
  },
  btn: {
    minWidth: 136,
    borderRadius: 22,
    margin: '20px 0'
  },
  icon: { paddingBottom: theme.spacing(1) }
}))

export default InvoiceStepOne
