import { makeStyles } from '@material-ui/core/styles'
import { Typography, Grid, Checkbox } from '@material-ui/core'
import { ChangeEvent } from 'react'
import { BOLD } from 'utils/constants/stringConstants'
import { GREY_COLOR, PRIMARY_COLOR } from 'utils/constants/colorsConstants'
import { Project, Milestone, Client } from '../../../utils/Interface'
import { GradiantButton } from '../../Common/Button/GradiantButton'
import EditIcon from '@material-ui/icons/Edit'
import AppTextField from '../../Common/Core/AppTextField'
import CheckIcon from '@material-ui/icons/Check'
import SaveIcon from '@material-ui/icons/Save'
import { ClientLogo } from 'components/Clients/ClientLogo'

type InvoiceStepProps = {
  project: Project
  headerTitle: String
  invoiceType: string
  onNext: (invoiceType: any) => void
  handleSendInvoice: () => void
  edit: editType
  handleEdit: (editType: string) => void
  handleSave: (type: string) => void
  handleChange: (e: ChangeEvent) => (key: string) => void
  handleClientChange: (e: ChangeEvent) => (key: string) => void
  handleMilestone: (mile: MilestoneProps) => void
  handleMileChange: (id: string, key: string, e: any) => void
  milestones: Array<MilestoneProps>
  client: Client
}
type editType = {
  clientDetails: boolean
  invoiceDetails: boolean
  projectDetails: boolean
  milestoneDetails: boolean
}
type MilestoneProps = {
  id: string
  title: string
  payment: number
  check: boolean
}

const InvoiceStepTwo = ({
  project,
  invoiceType,
  handleSendInvoice,
  handleEdit,
  edit,
  handleChange,
  handleClientChange,
  handleMilestone,
  handleMileChange,
  handleSave,
  milestones,
  client
}: InvoiceStepProps) => {
  const classes = useStyles()
  const handleClick = () => {
    handleSendInvoice()
  }

  return (
    <>
      <Grid container spacing={3} alignItems='center'>
        <Grid item>
          <ClientLogo logo={client.logo} />
        </Grid>
        <Grid item>
          <Typography variant={'h5'} className={classes.headerTitle}>
            Invoice
          </Typography>
          <Typography variant={'body2'} className={classes.subHeading}>
            {'Review Details'}
          </Typography>
        </Grid>
      </Grid>
      <div className={classes.mainWrapper}>
        <Grid container alignItems='center'>
          <Typography className={classes.subHeading}>
            Client Details:
          </Typography>

          <Typography>
            {!edit.clientDetails ? (
              <EditIcon
                className={classes.editicon}
                onClick={() => handleEdit('clientDetails')}
              />
            ) : (
              <SaveIcon
                className={classes.editicon}
                onClick={() => handleSave('clientDetails')}
              />
            )}
          </Typography>
        </Grid>
        <Grid className={classes.detailsWrapper}>
          <Grid container alignItems='center'>
            <Grid item sm={3}>
              <Typography className={classes.textField}>Client Name</Typography>
            </Grid>
            <Grid item sm={9}>
              {' '}
              {!edit.clientDetails ? (
                <Typography className={classes.textField}>
                  {client.name}
                </Typography>
              ) : (
                <AppTextField
                  label={'Client Name'}
                  type={'text'}
                  name='clientName'
                  onChange={(e: ChangeEvent) => handleClientChange(e)('name')}
                  value={client.name}
                />
              )}
            </Grid>
          </Grid>
          <Grid container alignItems='center'>
            <Grid item sm={3}>
              {' '}
              <Typography className={classes.textField}>
                Email Invoiced To:
              </Typography>
            </Grid>
            <Grid item sm={9}>
              {!edit.clientDetails ? (
                <Typography className={classes.textField}>
                  {client.email}
                </Typography>
              ) : (
                <AppTextField
                  label={'Client Email'}
                  type={'text'}
                  name='clientEmail'
                  onChange={(e: ChangeEvent) => handleClientChange(e)('email')}
                  value={client.email}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
      </div>
      <div className={classes.mainWrapper}>
        <Grid container>
          <Typography className={classes.subHeading}>
            Project Details:
          </Typography>
          <Typography>
            {!edit.projectDetails ? (
              <EditIcon
                className={classes.editicon}
                onClick={() => handleEdit('projectDetails')}
              />
            ) : (
              <SaveIcon
                className={classes.editicon}
                onClick={() => handleSave('projectDetails')}
              />
            )}
          </Typography>
        </Grid>
        <Grid className={classes.detailsWrapper}>
          <Grid container alignItems='center'>
            <Grid item sm={3}>
              <Typography className={classes.textField}>
                Campaign Objective
              </Typography>
            </Grid>
            <Grid item sm={9}>
              {' '}
              {!edit.projectDetails ? (
                <Typography className={classes.textField}>
                  {project.campaignObjective}
                </Typography>
              ) : (
                <AppTextField
                  label={'Objective'}
                  type={'text'}
                  name='campaignObjective'
                  onChange={(e: ChangeEvent) =>
                    handleChange(e)('campaignObjective')
                  }
                  value={project.campaignObjective}
                />
              )}
            </Grid>
          </Grid>
          <Grid container alignItems='center'>
            <Grid item sm={3}>
              {' '}
              <Typography className={classes.textField}>Deadline</Typography>
            </Grid>
            <Grid item sm={9}>
              {!edit.projectDetails ? (
                <Typography className={classes.textField}>
                  {project.campaignDeadLine}
                </Typography>
              ) : (
                <AppTextField
                  type={'date'}
                  label={'Campaign Date'}
                  value={project.campaignDeadLine}
                  onChange={(e: ChangeEvent) =>
                    handleChange(e)('campaignDeadline')
                  }
                />
              )}
            </Grid>
          </Grid>
          <Grid container alignItems='center'>
            <Grid item sm={3}>
              {' '}
              <Typography className={classes.textField}>
                Project Summary
              </Typography>
            </Grid>
            <Grid item sm={9}>
              {!edit.projectDetails ? (
                <Typography className={classes.textField}>
                  {project.description}
                </Typography>
              ) : (
                <AppTextField
                  label={'Project Summary'}
                  type={'text'}
                  name='description'
                  onChange={(e: ChangeEvent) => handleChange(e)('description')}
                  value={project.description}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
      </div>
      {invoiceType === 'fullAmount' && (
        <div className={classes.amountWrapper}>
          <Grid container>
            <Typography className={classes.subHeading}>
              Invoice Details:
            </Typography>
            <Typography>
              {!edit.invoiceDetails ? (
                <EditIcon
                  className={classes.editicon}
                  onClick={() => handleEdit('invoiceDetails')}
                />
              ) : (
                <SaveIcon
                  className={classes.editicon}
                  onClick={() => handleSave('invoiceDetails')}
                />
              )}
            </Typography>
          </Grid>
          <Grid className={classes.detailsWrapper}>
            <Grid container>
              <Grid item sm={3}>
                {' '}
                <Typography className={classes.textField}>
                  Production Budget
                </Typography>
              </Grid>
              <Grid item sm={3}>
                {' '}
                {!edit.invoiceDetails ? (
                  <Typography className={classes.textField}>
                    ${project.campaignBudget}
                  </Typography>
                ) : (
                  <AppTextField
                    label={'Project Budget'}
                    type={'text'}
                    name='projectBudget'
                    onChange={(e: ChangeEvent) =>
                      handleChange(e)('campaignBudget')
                    }
                    value={project.campaignBudget}
                  />
                )}
              </Grid>
            </Grid>
            <Grid container>
              <Grid item sm={3}>
                {' '}
                <Typography className={classes.textField}>
                  Production Expenses
                </Typography>
              </Grid>
              <Grid item sm={3}>
                {' '}
                {!edit.invoiceDetails ? (
                  <Typography className={classes.textField}>
                    ${project.campaignExpenses}
                  </Typography>
                ) : (
                  <AppTextField
                    label={'Project Expenses'}
                    type={'text'}
                    name='projectExpenses'
                    onChange={(e: ChangeEvent) =>
                      handleChange(e)('campaignExpenses')
                    }
                    value={project.campaignExpenses}
                  />
                )}
              </Grid>
            </Grid>
            <Grid container>
              <Grid item sm={3}>
                {' '}
                <Typography
                  className={`${classes.textField} ${classes.totalAmount}`}>
                  Total Due
                </Typography>
              </Grid>
              <Grid item sm={3}>
                {' '}
                <Typography
                  className={`${classes.textField} ${classes.totalAmount}`}>
                  $
                  {Number(project.campaignBudget) -
                    Number(project.campaignExpenses)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </div>
      )}
      {invoiceType === 'mileStone' && (
        <div className={classes.amountWrapper}>
          <Grid container alignItems='center'>
            <Typography className={classes.subHeading}>
              Milestone Details:
            </Typography>
            <Typography>
              {!edit.milestoneDetails ? (
                <EditIcon
                  className={classes.editicon}
                  onClick={() => handleEdit('milestoneDetails')}
                />
              ) : (
                <SaveIcon
                  className={classes.editicon}
                  onClick={() => handleSave('milestoneDetails')}
                />
              )}
            </Typography>
          </Grid>
          <Grid className={classes.detailsWrapper}>
            {milestones.map((mile, i) => {
              return (
                <Grid container alignItems='center' spacing={1}>
                  <Grid item sm={1}>
                    <Checkbox
                      onChange={() => handleMilestone(mile)}
                      checked={mile.check}
                      defaultChecked={true}
                      checkedIcon={
                        <div className={classes.checkBoxIcon}>
                          <CheckIcon className={classes.checkIcon} />
                        </div>
                      }
                      icon={<div className={classes.checkBoxIcon}></div>}
                    />
                  </Grid>
                  <Grid item sm={4}>
                    <AppTextField
                      type={'text'}
                      name='mileStone'
                      disabled={edit.milestoneDetails ? false : true}
                      onChange={(e: ChangeEvent) =>
                        handleMileChange(mile.id, 'title', e)
                      }
                      value={mile.title}
                    />
                  </Grid>
                  <Grid item sm={2}>
                    <AppTextField
                      type={'text'}
                      name='mileStonePrice'
                      disabled={edit.milestoneDetails ? false : true}
                      onChange={(e: ChangeEvent) =>
                        handleMileChange(mile.id, 'payment', e)
                      }
                      value={mile.payment}
                    />
                  </Grid>
                </Grid>
              )
            })}
          </Grid>
        </div>
      )}

      <Grid container justify='flex-end' alignItems='center'>
        <Typography className={classes.previewText}>Preview</Typography>
        <GradiantButton className={classes.invoiceBtn} onClick={handleClick}>
          Send Invoice
        </GradiantButton>
      </Grid>
    </>
  )
}
const useStyles = makeStyles((theme) => ({
  headerTitle: {
    fontWeight: BOLD
  },
  cardContent: {
    padding: theme.spacing(1),
    '&:last-child': {
      paddingBottom: theme.spacing(1)
    }
  },
  img: {
    width: '100%'
  },
  imageWrapper: {
    margin: 'auto'
  },

  heading: {
    fontWeight: BOLD,
    fontSize: 18
  },
  subHeading: {
    fontSize: 15,
    fontWeight: 600
  },
  detailsWrapper: {
    paddingLeft: theme.spacing(12)
  },
  textField: {
    fontSize: 12,
    padding: '5px 0'
  },
  mainWrapper: {
    padding: `${theme.spacing(3)}px 0`,
    borderBottom: `1px solid ${theme.palette.background.surfaceHighlight}`
  },
  totalAmount: {
    borderTop: `1px solid ${theme.palette.background.surfaceHighlight}`
  },
  amountWrapper: {
    paddingTop: theme.spacing(4)
  },
  invoiceBtn: {
    fontSize: 12,
    minWidth: 120,
    padding: 8,
    borderRadius: 22
  },
  previewText: {
    color: theme.palette.text.meta,
    fontSize: 12,
    padding: theme.spacing(2)
  },
  editicon: {
    color: PRIMARY_COLOR,
    fontSize: '1.2em',
    padding: '0 8px'
  },
  checkBoxIcon: {
    borderRadius: '50%',
    width: '35px',
    height: '35px',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow:
      '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
  },
  checkIcon: {
    color: 'black'
  }
}))

export default InvoiceStepTwo
