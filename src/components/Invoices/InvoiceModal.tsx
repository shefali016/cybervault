import React, { useState, useRef, useContext, useEffect, useMemo } from 'react'
import { useSelector, useDispatch, connect } from 'react-redux'
import { POSITION_ABSOLUTE } from 'utils/constants/stringConstants'
import InvoiceStepOne from './Steps/InvoiceStepOne'
import { generateUid } from '../../utils'
import AppModal from '../Common/Modal'
import CloseButton from '../Common/Button/CloseButton'
import { ReduxState } from 'reducers/rootReducer'
import { ToastContext } from 'context/Toast'
import { generateNewInvoiceRequest } from '../../actions/invoiceActions'
import {
  Project,
  Account,
  Client,
  MailTemplate,
  Mail,
  InvoiceShare
} from '../../utils/Interface'
import InvoiceStepTwo from './Steps/InvoiceStepTwo'
import InvoiceStepThree from './Steps/InvoiceStepThree'
import { getAllProjects } from '../../actions/projectActions'
import { useOnChange } from 'utils/hooks'
import { InvoiceStatuses, InvoiceTypes } from 'utils/enums'
import { sendEmailRequest } from '../../actions/mails'
import sendGridTemplates from '../../sendGridTemplates.json'
import { ProjectSelect } from 'components/Projects/ProjectSelect'
import { Typography } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import NewProjectFooter from 'components/Projects/NewProjectFooter'
import { GradiantButton } from 'components/Common/Button/GradiantButton'
import { getProjects } from 'apis/projectRequest'
import { sendMail } from 'apis/mails'

type InvoiceProps = {
  onRequestClose: () => void
  project?: Project | null | undefined
  account: Account
  userInfo: any
  onCreateProject: () => void
}
export type MilestoneProps = {
  id: string
  title: string
  payment: number
  isPaid: boolean
  check: boolean
}

const InvoiceData = ({
  onRequestClose,
  project,
  account,
  userInfo,
  onCreateProject
}: InvoiceProps) => {
  const theme = useTheme()

  const currencySymbol = account.region?.currencySymbol || '$'

  const dispatch = useDispatch()
  const clientState: {
    clients: Client[]
    clientCache: { [id: string]: Client }
  } = useSelector((state: ReduxState) => ({
    clients: state.clients.clientsData,
    clientCache: state.clients.cache
  }))
  const { clients, clientCache } = clientState
  const projects: Project[] = useSelector(
    (state: ReduxState) => state.project.allProjectsData
  )
  const filteredProjects = useMemo(
    () => projects.filter((p: Project) => p.canInvoice !== false),
    [projects]
  )
  const invoiceData = useSelector((state: ReduxState) => state.invoice)

  const modalContentRef = useRef<HTMLDivElement>(null)
  const toastContext = useContext(ToastContext)

  const [projectData, setProjectData] = useState(project)
  const hasMilestones =
    projectData && projectData.milestones && projectData.milestones.length

  const [clientData, setClientData] = useState(
    projectData
      ? clients.find((client: Client) => client.id === projectData.clientId)
      : undefined
  )
  const [invoiceType, setInvoiceType] = useState<InvoiceTypes>(
    hasMilestones ? InvoiceTypes.MILESTONE : InvoiceTypes.FULL
  )
  const [currentStep, setCurrentStep] = useState(
    !project ? 0 : hasMilestones ? 1 : 2
  )
  const [edit, setEdit] = useState({
    clientDetails: false,
    projectDetails: false,
    invoiceDetails: false,
    milestoneDetails: false
  })

  const [milestones, setMilestones] = useState(
    projectData && projectData.milestones
      ? projectData.milestones.map((mile, i) => {
          return { ...mile, check: !!mile.isPaid }
        })
      : []
  )

  useOnChange(invoiceData.error, (error) => {
    if (!!error) {
      toastContext.showToast({ title: 'Failed to create invoice' })
    }
  })

  const handleMilestone = (selectedMile: MilestoneProps) => {
    setMilestones(
      milestones.map((mile) => {
        if (mile.id === selectedMile.id) {
          return { ...mile, check: !mile.check }
        } else {
          return mile
        }
      })
    )
  }

  const handleMileChange = (id: string, key: string, e: any) => {
    setMilestones(
      milestones.map((mile) => {
        if (mile.id === id) {
          return { ...mile, [key]: e.target.value }
        } else {
          return mile
        }
      })
    )
  }
  const handleDoneClick = () => {
    onRequestClose()
    dispatch(getAllProjects())
  }

  useEffect(() => {
    if (!project) {
      dispatch(getAllProjects())
    }
  }, [])

  const getFullAmount = () => {
    return projectData
      ? Number(projectData.campaignBudget) -
          Number(projectData.campaignExpenses)
      : 0
  }
  const getAmountByMilestone = () => {
    let cost = 0
    milestones.forEach((mile: MilestoneProps) => {
      if (mile.check && !mile.isPaid) {
        cost = cost + Number(mile.payment)
      }
    })
    return cost
  }

  const invoiceAmount: number = useMemo(
    invoiceType === InvoiceTypes.FULL ? getFullAmount : getAmountByMilestone,
    [invoiceType, milestones]
  )

  const validateSending = () => {
    if (!projectData) {
      return toastContext.showToast({
        title: 'Choose a project before incoiving'
      })
    }

    if (!clientData) {
      return toastContext.showToast({
        title: 'Please wait to invoice.'
      })
    }
  }

  const handleSendInvoice = (invoiceId: string, invoiceShare: InvoiceShare) => {
    if (!(projectData && clientData)) {
      return validateSending()
    }
    const invoice = {
      id: invoiceId, // Using generateId function
      dateCreated: Date.now(),
      datePaid: null,
      projectId: projectData.id, // Id of the project being invoiced
      accountId: account.id,
      clientId: clientData.id,
      price: invoiceAmount,
      milestones: milestones
        .filter((mile: MilestoneProps) => {
          return !mile.isPaid && mile.check === true
        })
        .map((m) => {
          const { check: _, ...milestone } = m
          return milestone
        }), // will contain milestones being invoiced or null if invoicing total amount
      isPaid: false,
      status: InvoiceStatuses.PENDING, // has client paid invoice or not
      projectName: projectData.campaignName,
      type: invoiceType
    }
    dispatch(
      generateNewInvoiceRequest(account, projectData, invoice, invoiceShare)
    )
  }

  const handleSendMail = async () => {
    if (!(projectData && clientData)) {
      return validateSending()
    }

    const invoiceId = generateUid()

    if (!invoiceAmount) {
      return toastContext.showToast({
        title: 'Cannot send invoice. No price has been added.'
      })
    }

    const invoiceShare: InvoiceShare = {
      accountId: account.id,
      invoiceId: invoiceId,
      isViewed: false,
      createdAt: Date.now(),
      id: generateUid(),
      title: `${projectData.campaignName} invoice`
    }

    const mailPayload: Mail = {
      to: clientData.email,
      templateId: sendGridTemplates.invoice,
      type: 'invoice',
      data: {
        clientEmail: clientData.email,
        projectName: projectData.campaignName,
        invoiceId,
        userEmail: userInfo.email,
        amount: invoiceAmount,
        subject: "Creator's Cloud Invoice",
        link: `${window.location.origin}/invoicing/${invoiceShare.id}`
      }
    }

    try {
      await sendMail(mailPayload)

      handleSendInvoice(invoiceId, invoiceShare)
    } catch (error) {
      toastContext.showToast({
        title: 'Failed to send invoice. Please try again or contact support.'
      })
    }
  }

  useOnChange(invoiceData.success, (success) => {
    if (success) {
      setCurrentStep((step) => step + 1)
    }
  })

  const handleEdit = (editType: string) => {
    setEdit({
      ...edit,
      [editType]: true
    })
  }
  const handleSave = (editType: string) => {
    setEdit({
      ...edit,
      [editType]: false
    })
  }

  const handleChange = (event: any) => (key: string) => {
    if (projectData) {
      const value = event.target.value
      setProjectData({ ...projectData, [key]: value })
    }
  }

  const handleClientChange = (event: any) => (key: string) => {
    if (clientData) {
      const value = event.target.value
      setClientData({ ...clientData, [key]: value })
    }
  }

  const handleProjectSelect = (project: Project) => {
    setMilestones(
      project.milestones.map((mile) => {
        return { ...mile, check: mile.isPaid }
      })
    )
    const client = clientCache[project.clientId]
    if (client) setClientData(client)
    setProjectData(project)
  }

  const handleUpdateClient = () => {
    if (clientData) {
      // dispatch(updateClient(clientData))
    }
  }

  const handleUpdateProject = () => {
    if (projectData) {
      // dispatch(updateProject(projectData))
    }
  }

  const renderStepsView = () => {
    const onNext = (invoiceType?: InvoiceTypes) => {
      if (invoiceType) {
        setInvoiceType(invoiceType)
      }
      setCurrentStep((step) => step + 1)
    }

    if (filteredProjects.length === 0)
      return (
        <div
          style={{
            display: 'flex',
            minHeight: 200,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <Typography variant={'h5'} className={'bold'}>
            You have no projects to invoice.
          </Typography>
          <GradiantButton
            onClick={onCreateProject}
            style={{ marginLeft: theme.spacing(3) }}>
            Create a project now
          </GradiantButton>
        </div>
      )

    if (!(clientData && projectData) || currentStep === 0) {
      return (
        <div>
          <Typography variant={'h5'} className={'bold'}>
            Choose A Project
          </Typography>
          <ProjectSelect
            projects={filteredProjects}
            clientCache={clientCache}
            handleSelect={handleProjectSelect}
            selected={projectData && projectData.id}
          />
          <NewProjectFooter onNext={() => onNext()} disabled={!projectData} />
        </div>
      )
    }

    switch (currentStep) {
      case 1:
        return (
          <InvoiceStepOne
            headerTitle={'Send Invoice'}
            project={projectData}
            onNext={onNext}
            client={clientData}
          />
        )
      case 2:
        return (
          <InvoiceStepTwo
            onNext={onNext}
            project={projectData}
            headerTitle={'Invoice'}
            invoiceType={invoiceType}
            handleSendInvoice={handleSendMail}
            invoiceAmount={invoiceAmount}
            edit={edit}
            handleEdit={handleEdit}
            handleSave={handleSave}
            handleChange={handleChange}
            handleClientChange={handleClientChange}
            milestones={milestones}
            handleMilestone={handleMilestone}
            handleMileChange={handleMileChange}
            client={clientData}
            onUpdateClient={handleUpdateClient}
            onUpdateProject={handleUpdateProject}
            currencySymbol={currencySymbol}
          />
        )
      case 3:
        return (
          <InvoiceStepThree
            project={projectData}
            handleDoneClick={handleDoneClick}
            invoiceAmount={invoiceAmount}
            currencySymbol={currencySymbol}
            client={clientData}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className='new-project-modal-content' ref={modalContentRef}>
      {renderStepsView()}
      <CloseButton
        onClick={handleDoneClick}
        style={{
          position: POSITION_ABSOLUTE,
          top: 10,
          right: 10
        }}
      />
    </div>
  )
}

type InvoiceModalProps = {
  open: boolean
  onRequestClose: () => void
} & InvoiceProps

const InvoiceModal = ({
  open,
  project,
  onRequestClose,
  account,
  userInfo,
  onCreateProject
}: InvoiceModalProps) => {
  return (
    <AppModal open={open} onRequestClose={onRequestClose}>
      <InvoiceData
        onCreateProject={onCreateProject}
        onRequestClose={onRequestClose}
        project={project}
        account={account}
        userInfo={userInfo}
      />
    </AppModal>
  )
}

export default InvoiceModal
