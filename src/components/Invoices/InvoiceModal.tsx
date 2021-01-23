import React, { useState, useRef, useContext, useEffect} from 'react'
import { connect,useSelector,useDispatch } from 'react-redux'
// import './Projects.css'
import { POSITION_ABSOLUTE } from 'utils/constants/stringConstants'
import InvoiceStepOne from './Steps/InvoiceStepOne'
import { getProductData, generateUid } from '../../utils'
import AppModal from '../Common/Modal'
import CloseButton from '../Common/Button/CloseButton'
import * as Types from '../../utils/types'
import validate from '../../utils/helpers'
import { setMedia } from '../../apis/assets'
import { ReduxState } from 'reducers/rootReducer'
import { useOnChange } from 'utils/hooks'
import { ToastContext } from 'context/Toast'
import { generateNewInvoiceRequest } from '../../actions/invoiceActions'
import { Project, Account, Invoice } from '../../utils/types'
import InvoiceStepTwo from './Steps/InvoiceStepTwo';

type InvoiceProps = {
  onRequestClose: () => void
  project: Project
  account: Account
  // allProjects:Array<Project>
}

const InvoiceData = ({
  onRequestClose,
  project,
  account,
}: 
InvoiceProps) => {
  const [currentStep, setCurrentStep] = useState(1)
  const modalContentRef = useRef<HTMLDivElement>(null)
  const toastContext = useContext(ToastContext)
  const [invoiceType, setInvoiceType] = useState('')
  const dispatch=useDispatch()
  useEffect(() => {
    if (currentStep == 2) {
      const invoice = {
        id: generateUid(), // Using generateId function
        dateCreated: new Date(),
        datePaid: null,
        projectId: project.id, // Id of the project being invoiced
        price: 20, // Amount that the client must pay
        milestones: project.milestones, // will contain milestones being invoiced or null if invoicing total amount
        clientEmail: project.clientEmail,
        isPaid: false // has client paid invoice or not
      }
      dispatch(generateNewInvoiceRequest(account,project,invoice))
    }
  }, [currentStep])
  const newProject = true
  const renderStepsView = () => {
    const props = {
      onNext: (invoiceType: String) => {
        // setInvoiceType(invoiceType)
        setCurrentStep((step) => step + 1)
      }
    }
    switch (currentStep) {
      case 1:
        return (
          <InvoiceStepOne
            headerTitle={'Send Invoice'}
            project={project}
            {...props}
          />
        )
      case 2:
        return (
          <InvoiceStepTwo
            {...props}
            project={project}
            headerTitle={'Invoice'}
          />
        )
      default:
        return (
          <InvoiceStepOne
            {...props}
            headerTitle={'Send Invoice'}
            project={project}
          />
        )
    }
  }

  return (
    <div className='new-project-modal-content' ref={modalContentRef}>
      {renderStepsView()}
      <CloseButton
        onClick={onRequestClose}
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
}

const InvoiceModal = ({
  open,
  project,
  onRequestClose,
  account,
}: 
InvoiceModalProps) => {
  console.log(account,"account")
  return (
    <AppModal open={open} onRequestClose={onRequestClose}>
      <InvoiceData
        onRequestClose={onRequestClose}
        project={project}
        account={account}
      />
    </AppModal>
  )
}



export default InvoiceModal
