import { makeStyles } from '@material-ui/core/styles'
import { Typography, Grid, Checkbox } from '@material-ui/core'
import React, { ChangeEvent, useContext } from 'react'
import { BOLD } from 'utils/constants/stringConstants'
import { GREY_COLOR, PRIMARY_COLOR } from 'utils/constants/colorsConstants'
import { Project, Milestone, Client } from '../../../utils/Interface'
import { GradiantButton } from '../../Common/Button/GradiantButton'
import EditIcon from '@material-ui/icons/Edit'
import AppTextField from '../../Common/Core/AppTextField'
import CheckIcon from '@material-ui/icons/Check'
import SaveIcon from '@material-ui/icons/Save'
import { ClientLogo } from 'components/Clients/ClientLogo'
import { AppIconButton } from 'components/Common/Core/AppIconButton'
import { AppDivider } from 'components/Common/Core/AppDivider'
import { ToastContext } from 'context/Toast'

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
enum EditTypes {
  CLIENT_DETAILS = 'clientDetails',
  INVOICE_DETAILS = 'invoiceDetails',
  PROJECT_DETAILS = 'projectDetails',
  MILESTONE_DETAILS = 'milestoneDetails'
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
  const toastContext = useContext(ToastContext)

  const handleClick = () => {
    let isEditing = false

    Object.values(edit).forEach((val) => isEditing === isEditing || !!val)

    if (isEditing) {
      return toastContext.showToast({
        title: 'Save your changes before sending invoice.'
      })
    }

    handleSendInvoice()
  }

  const renderEditSaveButton = (key: EditTypes) => {
    if (!edit.hasOwnProperty(key)) {
      return null
    }
    return !edit[key] ? (
      <AppIconButton Icon={EditIcon} onClick={() => handleEdit(key)} />
    ) : (
      <AppIconButton Icon={SaveIcon} onClick={() => handleSave(key)} />
    )
  }

  return (
    <>
      <Grid
        container
        spacing={3}
        alignItems='center'
        style={{ marginBottom: 10 }}>
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
          <Typography className={classes.subHeading} variant='h6'>
            Client Details:
          </Typography>

          {renderEditSaveButton(EditTypes.CLIENT_DETAILS)}
        </Grid>
        <Grid className={classes.detailsWrapper}>
          <Grid container className={classes.section}>
            <Grid item sm={3}>
              <Typography className={classes.textField} variant='body1'>
                Client Name
              </Typography>
            </Grid>
            <Grid item sm={9}>
              {!edit.clientDetails ? (
                <Typography className={classes.textField} variant='body1'>
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
          <Grid container className={classes.section}>
            <Grid item sm={3}>
              <Typography className={classes.textField} variant='body1'>
                Email to:
              </Typography>
            </Grid>
            <Grid item sm={9}>
              {!edit.clientDetails ? (
                <Typography className={classes.textField} variant='body1'>
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

      <AppDivider className={classes.divider} spacing={2} />

      <div className={classes.mainWrapper}>
        <Grid container alignItems='center'>
          <Typography className={classes.subHeading} variant='h6'>
            Project Details:
          </Typography>

          {renderEditSaveButton(EditTypes.PROJECT_DETAILS)}
        </Grid>
        <Grid className={classes.detailsWrapper}>
          <Grid container className={classes.section}>
            <Grid item sm={3}>
              <Typography className={classes.textField} variant='body1'>
                Objective
              </Typography>
            </Grid>
            <Grid item sm={9}>
              {!edit.projectDetails ? (
                <Typography className={classes.textField} variant='body1'>
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

          <Grid container className={classes.section}>
            <Grid item sm={3}>
              <Typography className={classes.textField} variant='body1'>
                Deadline
              </Typography>
            </Grid>
            <Grid item sm={9}>
              {!edit.projectDetails ? (
                <Typography className={classes.textField} variant='body1'>
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

          <Grid container className={classes.section}>
            <Grid item sm={3}>
              <Typography className={classes.textField} variant='body1'>
                Project Summary
              </Typography>
            </Grid>
            <Grid item sm={9}>
              {!edit.projectDetails ? (
                <Typography className={classes.textField} variant='body1'>
                  {project.description}
                </Typography>
              ) : (
                <AppTextField
                  label={'Project Summary'}
                  type={'text'}
                  name='description'
                  onChange={(e: ChangeEvent) => handleChange(e)('description')}
                  value={project.description}
                  multiline={true}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
      </div>

      <AppDivider className={classes.divider} spacing={2} />

      {invoiceType === 'fullAmount' && (
        <div className={classes.mainWrapper}>
          <Grid container alignItems='center'>
            <Typography className={classes.subHeading} variant='body1'>
              Invoice Details:
            </Typography>

            {renderEditSaveButton(EditTypes.INVOICE_DETAILS)}
          </Grid>
          <Grid className={classes.detailsWrapper}>
            <Grid container className={classes.section}>
              <Grid item sm={3}>
                <Typography className={classes.textField} variant='body1'>
                  Budget
                </Typography>
              </Grid>
              <Grid item sm={3}>
                {!edit.invoiceDetails ? (
                  <Typography className={classes.textField} variant='body1'>
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

            <Grid container className={classes.section}>
              <Grid item sm={3}>
                <Typography className={classes.textField} variant='body1'>
                  Expenses
                </Typography>
              </Grid>
              <Grid item sm={3}>
                {!edit.invoiceDetails ? (
                  <Typography className={classes.textField} variant='body1'>
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

            <AppDivider
              spacing={1}
              className={classes.amountDivider}
              style={{ maxWidth: 350 }}
            />

            <Grid container>
              <Grid item sm={3}>
                <Typography
                  className={`${classes.textField} ${classes.totalAmount}`}
                  variant='body1'>
                  Total Due
                </Typography>
              </Grid>
              <Grid item sm={3}>
                <Typography
                  className={`${classes.textField} ${classes.totalAmount}`}
                  variant='body1'>
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
        <div className={classes.mainWrapper}>
          <Grid container alignItems='center'>
            <Typography className={classes.subHeading} variant='body1'>
              Milestone Details:
            </Typography>

            {renderEditSaveButton(EditTypes.MILESTONE_DETAILS)}
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
        {/* <Typography className={classes.previewText}>Preview</Typography> */}
        <GradiantButton className={classes.invoiceBtn} onClick={handleClick}>
          Send Invoice
        </GradiantButton>
      </Grid>
    </>
  )
}
const useStyles = makeStyles((theme) => ({
  divider: {
    backgroundColor: `${theme.palette.grey[300]} !important`
  },
  amountDivider: { backgroundColor: `${theme.palette.grey[400]} !important` },
  section: { marginBottom: theme.spacing(1.2) },
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
    fontWeight: BOLD
  },
  subHeading: {
    fontWeight: 600,
    marginRight: theme.spacing(1)
  },
  detailsWrapper: {
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(5)
  },
  textField: {},
  mainWrapper: {
    padding: `${theme.spacing(1)}px 0`
  },
  totalAmount: {},
  amountWrapper: {},
  invoiceBtn: { marginTop: theme.spacing(4) },
  previewText: {
    color: theme.palette.text.meta,
    padding: theme.spacing(2)
  },
  editicon: {
    color: PRIMARY_COLOR,
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
