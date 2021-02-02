import React, { useState, useRef, useContext ,useEffect} from 'react'
import { connect,useDispatch } from 'react-redux'
import './Projects.css'
import { POSITION_ABSOLUTE } from 'utils/constants/stringConstants'
import NewProjectStepOne from './Steps/NewProjectStepOne'
import NewProjectStepTwo from './Steps/NewProjectStepTwo';
import NewProjectStepThree from './Steps/NewProjectStepThree'
import NewProjectStepFour from './Steps/NewProjectStepFour'
import NewProjectStepFive from './Steps/NewProjectStepFive'
import NewProjectStepSix from './Steps/NewProjectStepSix'
import { getProductData, generateUid } from '../../utils'
import AppModal from '../Common/Modal'
import CloseButton from '../Common/Button/CloseButton'
import * as Types from '../../utils/types'
import validate from '../../utils/helpers'
import { setMedia } from '../../apis/assets'
import { ReduxState } from 'reducers/rootReducer'
import { useOnChange } from 'utils/hooks'
import { ToastContext } from 'context/Toast'
import {getClientsRequest,addClientRequest} from '../../actions/clientActions';

type NewProjectProps = {
  onRequestClose: () => void
  onSubmitClicked: (projectData: any) => void
  success: boolean
  error: null | string
  account:Types.Account,
  clients:Array<Types.Client>
}

const NewProject = ({
  onRequestClose,
  onSubmitClicked,
  success,
  error,
  account,
  clients
}: NewProjectProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [projectData, setProjectData] = useState(getProductData())
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
// useEffect(()=>{
//   if(addClientSuccess){

//   }
// },[addClientSuccess])
  const onSubmitData = async () => {
    try {
      // @ts-ignorets
      setIsLoading(true)
      let project = { ...projectData, id: generateUid() }
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
    const payload={
      name :projectData.clientName,
      email:projectData.clientEmail,
      city:projectData.city,
      country:projectData.country,
      id:generateUid(),
      state:projectData.state,
      address:projectData.address
    }
    dispatch(addClientRequest(account,payload))
    console.log(projectData,"proooo")
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
      onNext: () => {
        const isError = validate(currentStep, projectData)
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
        setCurrentStep((step) => step - 1)
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
        return <NewProjectStepTwo {...props}/>
      case 3:
        return <NewProjectStepThree {...props} />
      case 4:
        return <NewProjectStepFour {...props} />
      case 5:
        return <NewProjectStepFive {...props} />
      case 6:
        return <NewProjectStepSix {...props} />
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
  clients
}: NewProjectModalProps & StateProps) => {

  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getClientsRequest(account))
  },[])

  return (
    <AppModal open={open} onRequestClose={onRequestClose}>
      <NewProject
        onRequestClose={onRequestClose}
        onSubmitClicked={onSubmitClicked}
        error={error}
        success={success}
        account={account}
        clients={clients}
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
