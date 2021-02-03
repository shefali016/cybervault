import React, { useState, useRef, useContext ,useEffect} from 'react'
import { connect,useDispatch,useSelector } from 'react-redux'
import './Projects.css'
import { POSITION_ABSOLUTE } from 'utils/constants/stringConstants'
import NewProjectStepOne from './Steps/NewProjectStepOne'
import NewProjectStepTwo from './Steps/NewProjectStepTwo'
import NewProjectStepThree from './Steps/NewProjectStepThree'
import NewProjectStepFour from './Steps/NewProjectStepFour'
import NewProjectStepFive from './Steps/NewProjectStepFive'
import { getProductData, generateUid, getClientData} from '../../utils'
import AppModal from '../Common/Modal'
import CloseButton from '../Common/Button/CloseButton'
import * as Types from '../../utils/Interface'
import validate from '../../utils/helpers'
import { setMedia } from '../../apis/assets'
import { ReduxState } from 'reducers/rootReducer'
import { useOnChange } from 'utils/hooks'
import { ToastContext } from 'context/Toast'
import {addClientRequest} from '../../actions/clientActions';

type NewProjectProps = {
  onRequestClose: () => void
  onSubmitClicked: (projectData: any) => void
  success: boolean
  error: null | string
  account:Types.Account,
  clients:Array<Types.Client>,
  addClientSuccess:Boolean,
  addClientLoading:Boolean
}

const NewProject = ({
  onRequestClose,
  onSubmitClicked,
  success,
  error,
  account,
  clients,
  addClientSuccess,
  addClientLoading
}: NewProjectProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [projectData, setProjectData] = useState(getProductData())
  const [clientData, setClientData] = useState(getClientData())
  const [logoFile, setLogoFile] = useState(null)
  const [haveError, setHaveError] = useState(false)
  const [addClient,setAddClient]=useState(false)
  const modalContentRef = useRef<HTMLDivElement>(null)
  const toastContext = useContext(ToastContext)
  const dispatch=useDispatch();

  useOnChange(success, (success) => {
    if (success) {
      onRequestClose()
    }
  })

  useOnChange(error, (error) => {
    if (error) {
      setIsLoading(false)
      toastContext.showToast({
        title: 'Could not create project. Please try again.'
      })
    }
  })
useEffect(()=>{
  if(addClientSuccess && addClient && currentStep==1){
    setCurrentStep((step) => step + 1)
  }
},[addClientSuccess])
  const onSubmitData = async () => {
    try {
      // @ts-ignorets
      setIsLoading(true)
      let project = { ...projectData, clientId:clientData.id,id: generateUid() }
      if (logoFile) {
        const logoUrl = await setMedia(
          `images/clientLogos/${generateUid()}`,
          logoFile
        )
        if (typeof logoUrl === 'string') {
          project = { ...project, logo: logoUrl }
        }
      }
      onSubmitClicked(project)
    } catch (error) {
      setIsLoading(false)
      toastContext.showToast({
        title: 'Failed to create project. Please try again.'
      })
    }
  }
  const handleAddClient=()=>{
    let clientId=generateUid()
    setClientData({...clientData,id:clientId})
    const payload={
      ...clientData,
      id:clientId,
    }
    dispatch(addClientRequest(account,payload))
  }
  const newProject = true
  const renderStepsView = () => {
    const props = {
      isLoading,
      projectData,
      haveError,
      setHaveError,
      newProject,
      setProjectData,
      setLogoFile,
      account,
      clients,
      addClient,
      setAddClient,
      currentStep,
      addClientLoading,
      clientData,
      setClientData,
      onNext: () => {
        const isError = validate(currentStep, projectData,clientData)
        if (isError) {
          setHaveError(true)
        } else {
          setHaveError(false)
          if(addClient && currentStep==1 ){
            handleAddClient()
          }
          else{
            setCurrentStep((step) => step + 1)
          }
          if (modalContentRef.current) {
            modalContentRef.current.scrollTop = 0
          }
        }
      },
      onBack: () => {
        setHaveError(false)
        if(currentStep!==1){
          setCurrentStep((step) => step - 1)
        }
        else if(currentStep===1 && addClient){
          setAddClient(!addClient)
        }
        if (modalContentRef.current) {
          modalContentRef.current.scrollTop = 0
        }
      },
      onSubmit: () => onSubmitData()
    }
    switch (currentStep) {    
      case 1:
        return <NewProjectStepOne {...props} />
      case 2:
        return <NewProjectStepTwo {...props} />
      case 3:
        return <NewProjectStepThree {...props} />
      case 4:
        return <NewProjectStepFour {...props} />
      case 5:
        return <NewProjectStepFive {...props} />
      default:
        return <NewProjectStepOne {...props} />
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

type NewProjectModalProps = {
  open: boolean
  onRequestClose: () => void
  onSubmitClicked: (projectData: Types.Project) => void
  account:Types.Account
  clients:Array<Types.Client>
}

const NewProjectModal = ({
  open,
  onRequestClose,
  onSubmitClicked,
  success,
  error,
  account,
  clients,
}: NewProjectModalProps & StateProps) => {
const addClientSuccess=useSelector((state:any)=>state.clients.addClientSuccess)
const addClientLoading=useSelector((state:any)=>state.clients.addClientLoading)


  return (
    <AppModal open={open} onRequestClose={onRequestClose}>
      <NewProject
        onRequestClose={onRequestClose}
        onSubmitClicked={onSubmitClicked}
        error={error}
        success={success}
        account={account}
        clients={clients}
        addClientSuccess={addClientSuccess}
        addClientLoading={addClientLoading}
      />
    </AppModal>
  )
}

type StateProps = {
  success: boolean
  error: string | null,
  account:Types.Account,
  clients:Array<Types.Client>
}

const mapState = (state: ReduxState): StateProps => ({
  success: state.project.updateSuccess,
  error: state.project.updateError,
  account: state.auth.account as Types.Account ,
  clients:state.clients.clientsData as Array<Types.Client>

  
})

export default connect(mapState)(NewProjectModal)
