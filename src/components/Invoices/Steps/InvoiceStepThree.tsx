import { makeStyles } from '@material-ui/core/styles'
import { Card, Typography, Grid } from '@material-ui/core'
import { BOLD } from 'utils/constants/stringConstants'
import { Project } from '../../../utils/Interface'
import { GradiantButton } from '../../Common/Button/GradiantButton'
import CheckIcon from '@material-ui/icons/Check'
import { ClientLogo } from 'components/Clients/ClientLogo'

type InvoiceStepThreeProps = {
  project: Project
  handleDoneClick: () => void
  getAmountByMilestone: () => number
  invoiceType: string
  getFullAmount: () => number
}

const InvoiceStepThree = ({
  project,
  handleDoneClick,
  getAmountByMilestone,
  invoiceType,
  getFullAmount
}: InvoiceStepThreeProps) => {
  const classes = useStyles()

  return (
    <Grid container direction='column' alignItems='center'>
      <Grid item sm={2} className={classes.imageWrapper}>
        {project.logo && <ClientLogo logo={project.logo} />}
        <Card className={classes.successIcon}>
          {' '}
          <CheckIcon className={classes.checkIcon} />
        </Card>
      </Grid>
      <Grid container direction='column' alignItems='center'>
        <Typography variant={'h4'} className={classes.headerTitle} paragraph>
          {`Invoice Sent For $${
            invoiceType === 'fullAmount'
              ? getFullAmount()
              : getAmountByMilestone()
          }`}
        </Typography>
        <Typography variant={'body2'} paragraph>
          To: {project.clientEmail}
        </Typography>
        <Typography variant={'body2'} paragraph>
          A confirmation has been sent to your email.
        </Typography>
      </Grid>
      <GradiantButton className={classes.btn} onClick={handleDoneClick}>
        Done
      </GradiantButton>
    </Grid>
  )
}
const useStyles = makeStyles((theme) => ({
  headerTitle: {
    fontWeight: BOLD,
    paddingTop: '30px'
  },
  img: {
    width: '100%'
  },
  imageWrapper: {
    paddingTop: theme.spacing(2),
    margin: 'auto',
    position: 'relative'
  },
  successIcon: {
    textAlign: 'center',
    color: 'green',
    margin: 'auto',
    borderRadius: '50%',
    width: '35px',
    height: '35px',
    backgroundColor: 'white',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: '-15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkIcon: {},

  btn: {
    minWidth: 136,
    borderRadius: 22,
    margin: '20px 0'
  }
}))

export default InvoiceStepThree
