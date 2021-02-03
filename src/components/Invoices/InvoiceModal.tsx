import React, { useState, useRef, useContext, useEffect,ChangeEvent} from 'react'
import { connect,useSelector,useDispatch } from 'react-redux'
// import './Projects.css'
import { POSITION_ABSOLUTE } from 'utils/constants/stringConstants'
import InvoiceStepOne from './Steps/InvoiceStepOne'
import { getProductData, generateUid } from '../../utils'
import AppModal from '../Common/Modal'
import CloseButton from '../Common/Button/CloseButton'
import validate from '../../utils/helpers'
import { setMedia } from '../../apis/assets'
import { ReduxState } from 'reducers/rootReducer'
import { useOnChange } from 'utils/hooks'
import { ToastContext } from 'context/Toast'
import { generateNewInvoiceRequest } from '../../actions/invoiceActions'
import { Project, Account, Invoice } from '../../utils/Interface'
import InvoiceStepTwo from './Steps/InvoiceStepTwo';
import InvoiceStepThree from './Steps/InvoiceStepThree';
import { forEachChild } from 'typescript';
import {getAllProjectsRequest} from '../../actions/projectActions'



type InvoiceProps = {
  onRequestClose: () => void
  project: Project
  account: Account
  // allProjects:Array<Project>
}
type MilestoneProps={
  id: string
  title: string
  cost: number
  payment:number,
  check:boolean
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
  const [projectData,setProjectData]=useState(project)
  const [edit,setEdit]=useState({
    clientDetails:false,
    projectDetails:false,
    invoiceDetails:false,
    milestoneDetails:false
  })

  const [milestones,setMilestones]=useState(projectData.milestones.map((mile)=>{
    return {...mile,check:true}
  }))
  const dispatch=useDispatch();

  const invoiceData=useSelector((state:ReduxState)=>state.invoice)

  useEffect(()=>{
   if(invoiceData.success && (invoiceData?.invoiceData?.projectId===projectData.id||!Object.keys(invoiceData.invoiceData).length)){
    setCurrentStep((step) => step + 1)
   }
  },[invoiceData.success])

const handleMilestone=(selectedMile:MilestoneProps)=>{
  setMilestones(milestones.map((mile)=>{
      if(mile.id===selectedMile.id){
        return {...mile,check:!mile.check}
      }
      else{
        return mile
      }
  })
)

}

const handleMileChange=(id:string,key:string,e:any) =>{
  
  setMilestones(milestones.map((mile)=>{
      if(mile.id===id){
        return {...mile,[key]:e.target.value}
      }
      else{
        return mile
      }
  }))

}
const handleDoneClick=()=>{
  onRequestClose()
  dispatch(getAllProjectsRequest(account))
}

  useEffect(()=>{
    setProjectData(projectData);
    if(!projectData.milestones.length){
      setInvoiceType('fullAmount')
      setCurrentStep((step)=>step+1)
    }
    setMilestones(projectData.milestones.map((mile)=>{
        return {...mile,check:true}
    }))
  },[project])


  const getFullAmount=()=>{
    return Number(projectData.campaignBudget)-Number(projectData.campaignExpenses)
  }
  const getAmountByMilestone=()=>{
    let cost=0;
    milestones.forEach((mile)=>{
      if(mile.check){
        cost=cost+Number(mile.payment)
      }
    })
    return cost
  }
  const handleSendInvoice=()=>{
        const invoice = {
          id: generateUid(), // Using generateId function
          dateCreated: new Date().toLocaleString(),
          datePaid: null,
          projectId: projectData.id, // Id of the project being invoiced
          projectName:projectData.campaignName,
          price: invoiceType==='fullAmount'?getFullAmount():getAmountByMilestone(),
          milestones: milestones.filter((mile)=>{
              return mile.check===true
          }), // will contain milestones being invoiced or null if invoicing total amount
          clientEmail: projectData.clientEmail,
          campaignDeadLine:projectData.campaignDeadLine,
          isPaid: false,
          status:'pending', // has client paid invoice or not
        }
        dispatch(generateNewInvoiceRequest(account,projectData,invoice))
    
  }

  const handleEdit=(editType:string)=>{
      setEdit({
        ...edit,
        [editType]:true
      })
  }
  const handleSave=(editType:string)=>{
    setEdit({
      ...edit,
      [editType]:false
    })
}

  const handleChange = (event: any) => (key: string) => {
    const value = event.target.value
    setProjectData({ ...projectData, [key]: value })
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
            project={projectData}
            onNext={onNext}
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
            milestones={milestones}
            handleMilestone={handleMilestone}
            handleMileChange={handleMileChange}
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
          />
        )
      default:
        return (
          <InvoiceStepOne
          onNext={onNext}
            headerTitle={'Send Invoice'}
            project={projectData}

          />
        )
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
}

const InvoiceModal = ({
  open,
  project,
  onRequestClose,
  account,
}: 
InvoiceModalProps) => {
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
