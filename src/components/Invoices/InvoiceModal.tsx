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
import InvoiceStepThree from './Steps/InvoiceStepThree';
import { forEachChild } from 'typescript';

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

  const getFullAmount=(milestones:Array<Types.Milestone>)=>{
    let totalCost=0
    milestones.forEach((mile:Types.Milestone,i:number)=>{
      totalCost=totalCost+Number(mile.payment)
    })
    return totalCost
  }
  const handleSendInvoice=()=>{
        const invoice = {
          id: generateUid(), // Using generateId function
          dateCreated: new Date(),
          datePaid: null,
          projectId: project.id, // Id of the project being invoiced
          price: invoiceType==='fullAmount'?getFullAmount(project.milestones):0 ,// Amount that the client must pay
          milestones: project.milestones, // will contain milestones being invoiced or null if invoicing total amount
          clientEmail: project.clientEmail,
          isPaid: false,
          status:'draft' // has client paid invoice or not
        }
        dispatch(generateNewInvoiceRequest(account,project,invoice))
    
  }
  
  const renderStepsView = () => {
    const onNext=(invoiceType:any)=>{
            if(currentStep===1){
              setInvoiceType(invoiceType)
            }
            setCurrentStep((step) => step + 1)
    }
  
    
    switch (currentStep) {
      case 1:
        return (
          <InvoiceStepOne
            headerTitle={'Send Invoice'}
            project={project}
            onNext={onNext}
          />
        )
      case 2:
        return (
          <InvoiceStepTwo
          onNext={onNext}
            project={project}
            headerTitle={'Invoice'}
            invoiceType={invoiceType}
            handleSendInvoice={handleSendInvoice}
          />
        )
      case 3:
        return (
          <InvoiceStepThree
            project={project} 
            onRequestClose={onRequestClose}         
          />
        )
      default:
        return (
          <InvoiceStepOne
          onNext={onNext}
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
