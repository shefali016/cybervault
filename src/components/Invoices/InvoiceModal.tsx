import React, { useState, useRef, useContext, useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { POSITION_ABSOLUTE } from 'utils/constants/stringConstants'
import InvoiceStepOne from './Steps/InvoiceStepOne'
import { generateUid } from '../../utils'
import AppModal from '../Common/Modal'
import CloseButton from '../Common/Button/CloseButton'
import { ReduxState } from 'reducers/rootReducer'
import { ToastContext } from 'context/Toast'
import { generateNewInvoiceRequest } from '../../actions/invoiceActions'
import { Project, Account, Client,MailTemplate } from '../../utils/Interface'
import InvoiceStepTwo from './Steps/InvoiceStepTwo'
import InvoiceStepThree from './Steps/InvoiceStepThree'
import { getAllProjectsRequest } from '../../actions/projectActions'
import { useOnChange } from 'utils/hooks'
import { InvoiceStatuses } from 'utils/enums'
import {sendEmailRequest,getAllMailTemplatesRequest} from '../../actions/mails'


export const InvoiceTypes = { full: 'fullAmount', milestone: 'milestone' }

type InvoiceProps = {
  onRequestClose: () => void
  project: Project
  account: Account
  client: Client
}
type MilestoneProps = {
  id: string
  title: string
  cost: number
  payment: number
  check: boolean
}

const InvoiceData = ({
  onRequestClose,
  project,
  account,
  client
}: InvoiceProps) => {
  const hasMilestones = project.milestones && project.milestones.length

  const [currentStep, setCurrentStep] = useState(hasMilestones ? 1 : 2)
  const modalContentRef = useRef<HTMLDivElement>(null)
  const toastContext = useContext(ToastContext)
  const [invoiceType, setInvoiceType] = useState(
    !hasMilestones ? InvoiceTypes.full : ''
  )
  const [projectData, setProjectData] = useState(project)
  const [clientData, setClientData] = useState(client)
  const [edit, setEdit] = useState({
    clientDetails: false,
    projectDetails: false,
    invoiceDetails: false,
    milestoneDetails: false
  })

  const [milestones, setMilestones] = useState(
    projectData.milestones
      ? projectData.milestones.map((mile) => {
          return { ...mile, check: true }
        })
      : []
  )
  const dispatch = useDispatch()

  const invoiceData = useSelector((state: ReduxState) => state.invoice)
  const mailTemplatesData = useSelector((state: ReduxState) => state.mail.mailTemplatesData)

  const getTemplateId=()=>{
    if(mailTemplatesData){
      let data:any
      data=mailTemplatesData.find((tmp:MailTemplate)=>{
        return tmp.type==='invoice'
      })
      return data?.templateId
    }
  }
const templateId=useMemo(()=>{
  return getTemplateId()
},[mailTemplatesData])

  useEffect(() => {
    if (
      invoiceData.success &&
      (invoiceData?.invoiceData?.projectId === projectData.id ||
        !Object.keys(invoiceData.invoiceData).length)
    ) {
      const mailPayload={
        to:invoiceData.invoiceData.clientEmail,
        from:account.email,
        templateId:templateId,
        data:{
          clientEmail:invoiceData.invoiceData.clientEmail,
          projectName:invoiceData.invoiceData.projectName,
          invoiceId:invoiceData.invoiceData.id,
          userEmail:account.email,
          amount:invoiceData.invoiceData.price,
          subject:`Invoice for ${invoiceData.invoiceData.projectName}`
        }
      }
      dispatch( sendEmailRequest(mailPayload))
      setCurrentStep((step) => step + 1)
    }
  }, [invoiceData.success])

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
    dispatch(getAllProjectsRequest(account))
  }

  useEffect(() => {
    setProjectData(project)
    if (projectData.milestones) {
      setMilestones(
        projectData.milestones.map((mile) => {
          return { ...mile, check: true }
        })
      )
    }
  }, [project])

  useEffect(()=>{
    dispatch(getAllMailTemplatesRequest())
  },[])

  const getFullAmount = () => {
    return (
      Number(projectData.campaignBudget) - Number(projectData.campaignExpenses)
    )
  }
  const getAmountByMilestone = () => {
    let cost = 0
    milestones.forEach((mile) => {
      if (mile.check) {
        cost = cost + Number(mile.payment)
      }
    })
    return cost
  }
  const handleSendInvoice = () => {
    const invoice = {
      id: generateUid(), // Using generateId function
      dateCreated: new Date().toLocaleString(),
      datePaid: null,
      projectId: projectData.id, // Id of the project being invoiced
      projectName: projectData.campaignName,
      price:
        invoiceType === 'fullAmount' ? getFullAmount() : getAmountByMilestone(),
      milestones: milestones.filter((mile) => {
        return mile.check === true
      }), // will contain milestones being invoiced or null if invoicing total amount
      clientEmail: clientData.email,
      campaignDeadLine: projectData.campaignDeadLine,
      isPaid: false,
      status: InvoiceStatuses.PENDING // has client paid invoice or not
    }
    dispatch(generateNewInvoiceRequest(account, projectData, invoice))
  }

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
    const value = event.target.value
    setProjectData({ ...projectData, [key]: value })
  }

  const handleClientChange = (event: any) => (key: string) => {
    const value = event.target.value
    setClientData({ ...clientData, [key]: value })
  }

  const renderStepsView = () => {
    const onNext = (invoiceType: any) => {
      if (currentStep === 1) {
        setInvoiceType(invoiceType)
      }
      setCurrentStep((step) => step + 1)
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
            handleSendInvoice={handleSendInvoice}
            edit={edit}
            handleEdit={handleEdit}
            handleSave={handleSave}
            handleChange={handleChange}
            handleClientChange={handleClientChange}
            milestones={milestones}
            handleMilestone={handleMilestone}
            handleMileChange={handleMileChange}
            client={clientData}
          />
        )
      case 3:
        return (
          <InvoiceStepThree
            project={projectData}
            handleDoneClick={handleDoneClick}
            getAmountByMilestone={getAmountByMilestone}
            invoiceType={invoiceType}
            getFullAmount={getFullAmount}
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
  project: Project
  onRequestClose: () => void
  account: Account
  client: Client | undefined
}

const InvoiceModal = ({
  open,
  project,
  onRequestClose,
  account,
  client
}: InvoiceModalProps) => {
  if (!client) {
    return null
  }

  return (
    <AppModal open={open} onRequestClose={onRequestClose}>
      <InvoiceData
        onRequestClose={onRequestClose}
        project={project}
        account={account}
        client={client}
      />
    </AppModal>
  )
}

export default InvoiceModal
