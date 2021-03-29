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
import { InvoiceTypes } from 'utils/enums'
import { EditText } from 'components/Common/EditText'

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
  onUpdateProject: () => void
  onUpdateClient: () => void
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
  client,
  onUpdateProject,
  onUpdateClient
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
      <AppIconButton
        Icon={EditIcon}
        onClick={() => handleEdit(key)}
        iconClassName={'primaryIcon'}
      />
    ) : (
      <AppIconButton
        Icon={SaveIcon}
        onClick={() => {
          if (key === EditTypes.CLIENT_DETAILS) {
            onUpdateClient()
          } else {
            onUpdateProject()
          }
          handleSave(key)
        }}
        iconClassName={'primaryIcon'}
      />
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
              <EditText
                label={'Client Name'}
                type={'text'}
                name='clientName'
                onChange={(e: ChangeEvent) => handleClientChange(e)('name')}
                value={client.name}
                isEditing={edit.clientDetails}
              />
            </Grid>
          </Grid>
          <Grid container className={classes.section}>
            <Grid item sm={3}>
              <Typography className={classes.textField} variant='body1'>
                Email to:
              </Typography>
            </Grid>
            <Grid item sm={9}>
              <EditText
                label={'Client Email'}
                type={'text'}
                name='clientEmail'
                onChange={(e: ChangeEvent) => handleClientChange(e)('email')}
                value={client.email}
                isEditing={edit.clientDetails}
              />
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
              <EditText
                label={'Objective'}
                type={'text'}
                onChange={(e: ChangeEvent) =>
                  handleChange(e)('campaignObjective')
                }
                value={project.campaignObjective}
                emptyValue={'No objective added. Will not show on invoice.'}
                isEditing={edit.projectDetails}
              />
            </Grid>
          </Grid>

          <Grid container className={classes.section}>
            <Grid item sm={3}>
              <Typography className={classes.textField} variant='body1'>
                Deadline
              </Typography>
            </Grid>
            <Grid item sm={9}>
              <EditText
                type={'date'}
                label={'Campaign Date'}
                value={project.campaignDeadLine}
                onChange={(e: ChangeEvent) =>
                  handleChange(e)('campaignDeadLine')
                }
                isEditing={edit.projectDetails}
              />
            </Grid>
          </Grid>

          <Grid container className={classes.section}>
            <Grid item sm={3}>
              <Typography className={classes.textField} variant='body1'>
                Project Summary
              </Typography>
            </Grid>
            <Grid item sm={9}>
              <EditText
                label={'Project Summary'}
                type={'text'}
                name='description'
                onChange={(e: ChangeEvent) => handleChange(e)('description')}
                value={project.description}
                emptyValue={'No summary added. Will not show on invoice.'}
                multiline={true}
                isEditing={edit.projectDetails}
              />
            </Grid>
          </Grid>
        </Grid>
      </div>

      <AppDivider className={classes.divider} spacing={2} />

      {invoiceType === InvoiceTypes.FULL && (
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
                <EditText
                  label={'Project Budget'}
                  type={'text'}
                  onChange={(e: ChangeEvent) =>
                    handleChange(e)('campaignBudget')
                  }
                  value={project.campaignBudget}
                  isEditing={edit.invoiceDetails}
                />
              </Grid>
            </Grid>

            <Grid container className={classes.section}>
              <Grid item sm={3}>
                <Typography className={classes.textField} variant='body1'>
                  Expenses
                </Typography>
              </Grid>
              <Grid item sm={3}>
                <EditText
                  label={'Project Expenses'}
                  type={'text'}
                  onChange={(e: ChangeEvent) =>
                    handleChange(e)('campaignExpenses')
                  }
                  value={project.campaignExpenses}
                  isEditing={edit.invoiceDetails}
                />
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

      {invoiceType === InvoiceTypes.MILESTONE && (
        <div className={classes.mainWrapper}>
          <Grid container alignItems='center'>
            <Typography className={classes.subHeading} variant='body1'>
              Milestone Details:
            </Typography>

            {renderEditSaveButton(EditTypes.MILESTONE_DETAILS)}
          </Grid>
          <Grid className={classes.detailsWrapper}>
            {milestones.map((mile: MilestoneProps) => {
              return (
                <Grid container alignItems='center' spacing={2} key={mile.id}>
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
                    <EditText
                      type={'text'}
                      onChange={(e: ChangeEvent) =>
                        handleMileChange(mile.id, 'title', e)
                      }
                      value={mile.title}
                      isEditing={edit.milestoneDetails}
                    />
                  </Grid>
                  <Grid item sm={2}>
                    <EditText
                      type={'text'}
                      onChange={(e: ChangeEvent) =>
                        handleMileChange(mile.id, 'payment', e)
                      }
                      value={mile.payment}
                      isEditing={edit.milestoneDetails}
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
    paddingLeft: theme.spacing(3)
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
  checkBoxIcon: {
    borderRadius: '50%',
    width: 35,
    height: 35,
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow:
      '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
  },
  checkIcon: {
    color: theme.palette.primary.main
  }
}))

export default InvoiceStepTwo
