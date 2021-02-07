import { makeStyles } from '@material-ui/core/styles'
import { Typography, Grid } from '@material-ui/core'
import { BOLD } from 'utils/constants/stringConstants'
import { GREY_COLOR } from 'utils/constants/colorsConstants'
import { Project } from '../../../utils/Interface'
import InvoiceLogo from '../../../assets/invoice.png'
import Milestone from '../../../assets/milestone.png'
import { GradiantButton } from '../../Common/Button/GradiantButton'
import { ClientLogo } from '../../Clients/ClientLogo'

type InvoiceStepProps = {
  project: Project
  headerTitle: String
  onNext: (invoiceType: any) => void
}

const InvoiceStepOne = ({ project, headerTitle, onNext }: InvoiceStepProps) => {
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
        <ClientLogo logo={project.logo} />
      </Grid>
      <Grid container justify='center' className={classes.wrapper}>
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
            onClick={() => handleClick('fullAmount')}>
            Continue
          </GradiantButton>
        </Grid>
        <Grid item sm={5} className={classes.milestoneSection}>
          <img src={Milestone} className={classes.icon} />
          <Typography className={classes.heading}>
            Invoice full milestone
          </Typography>
          <Typography className={classes.subHeading}>
            Clients will receive a partial invoice for steps Completed
          </Typography>
          <GradiantButton
            className={classes.btn}
            onClick={() => handleClick('mileStone')}>
            Continue
          </GradiantButton>
        </Grid>
      </Grid>

      {/* {allProjects.map((pro) => {
        return (
          <Grid item sm={3}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Grid container>
                  <Grid item sm={3} container alignItems='center'>
                    <img
                      src={pro.logo ? pro.logo : logo}
                      className={classes.img}
                    />
                  </Grid>
                  <Grid item sm={9}>
                    <Typography className={classes.bodyText}>
                      {pro.campaignName}
                    </Typography>
                    <Typography className={classes.bottomText}>
                      {pro.description}
                    </Typography>
                    <Typography className={classes.bottomText}>
                      Date Completed:{pro.campaignDate}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        )
      })} */}
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
    justifyContent: 'center'
  },
  wrapperBorder: {
    [theme.breakpoints.up('sm')]: {
      borderRight: `1px solid ${theme.palette.grey[500]}`
    }
  },
  wrapper: {
    textAlign: 'center',
    padding: '32px 0'
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
