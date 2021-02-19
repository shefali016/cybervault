import React, { useState, useRef, useContext, useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import './Projects.css'
import { POSITION_ABSOLUTE } from 'utils/constants/stringConstants'
import NewProjectStepOne from './Steps/NewProjectStepOne'
import NewProjectStepTwo from './Steps/NewProjectStepTwo'
import NewProjectStepThree from './Steps/NewProjectStepThree'
import NewProjectStepFour from './Steps/NewProjectStepFour'
import NewProjectStepFive from './Steps/NewProjectStepFive'
import { getProductData, generateUid } from '../../utils'
import AppModal from '../Common/Modal'
import CloseButton from '../Common/Button/CloseButton'
import * as Types from '../../utils/Interface'
import validate from '../../utils/helpers'
import { ReduxState } from 'reducers/rootReducer'
import { useOnChange } from 'utils/hooks'
import { ToastContext } from 'context/Toast'
import { isEnumDeclaration } from 'typescript'
import { Client } from '../../utils/Interface'

type NewProjectProps = {
  onRequestClose: () => void
  onSubmitClicked?: (projectData: Types.Project) => void
  success: boolean
  error: null | string
  account: Types.Account
  clients: Array<Types.Client>
  addClientSuccess: Boolean
  newClientData: Types.Client
  project?: Types.Project
  editTask?: boolean
  editCampaign?: boolean
  editExpenses?: boolean
  editBudget?: boolean
  initialStep?: number
  onUpdate?: (project: Types.Project) => void
}

const NewProject = ({
  onRequestClose,
  onSubmitClicked,
  success,
  error,
  account,
  clients,
  addClientSuccess,
  newClientData,
  project,
  editTask,
  editCampaign,
  editExpenses,
  editBudget,
  initialStep = 1,
  onUpdate
}: NewProjectProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(initialStep)
  const [projectData, setProjectData] = useState(project || getProductData())
  const [clientData, setClientData] = useState<Client | null>(null)
  const [haveError, setHaveError] = useState(false)
  const [addClient, setAddClient] = useState(false)
  const modalContentRef = useRef<HTMLDivElement>(null)
  const toastContext = useContext(ToastContext)

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

  // useEffect(() => {
  // if (addClientSuccess && addClient && currentStep == 1 && newClientData) {
  //   if (project) {
  //     setAddClient(false)
  //   } else {
  //     setClientData(newClientData)
  //     setCurrentStep((step) => step + 1)
  //     setAddClient(false)
  //   }
  // }
  // }, [addClientSuccess])

  const onUpdateData = () => {
    if (typeof onUpdate !== 'function') {
      return
    }
    const projectUpdate = { ...projectData }

    if (clientData) {
      projectUpdate.clientId = clientData.id
    }

    onUpdate(projectUpdate)
  }

  const onSubmitData = async () => {
    try {
      if (typeof onSubmitClicked !== 'function' || !clientData) {
        return
      }
      // @ts-ignorets
      setIsLoading(true)
      let project = {
        ...projectData,
        clientId: clientData.id,
        id: generateUid()
      }
      onSubmitClicked(project)
    } catch (error) {
      setIsLoading(false)
      toastContext.showToast({
        title: 'Failed to create project. Please try again.'
      })
    }
  }

  const renderStepsView = () => {
    const props = {
      isLoading,
      projectData,
      haveError,
      setHaveError,
      setProjectData,
      account,
      clients,
      addClient,
      setAddClient,
      currentStep,
      clientData,
      setClientData,
      isEdit: !!project,
      editTask,
      editCampaign,
      editExpenses,
      editBudget,
      onUpdate: () => onUpdateData(),
      onNext: () => {
        const isError = validate(currentStep, projectData, clientData)
        if (isError) {
          setHaveError(true)
        } else {
          setHaveError(false)
          if (!addClient || (addClient && currentStep !== 1)) {
            setCurrentStep((step) => step + 1)
          }
          if (modalContentRef.current) {
            modalContentRef.current.scrollTop = 0
          }
        }
      },
      onBack: () => {
        setHaveError(false)
        if (currentStep !== 1) {
          setCurrentStep((step) => step - 1)
        } else if (currentStep === 1 && addClient) {
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
        return null
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
  onSubmitClicked?: (projectData: Types.Project) => void
  account: Types.Account
  clients: Array<Types.Client>
  editTask?: boolean
  editCampaign?: boolean
  editExpenses?: boolean
  editBudget?: boolean
  project?: Types.Project
  initialStep?: number
  onUpdate?: (project: Types.Project) => void
}

const NewProjectModal = ({
  open,
  onRequestClose,
  onSubmitClicked,
  success,
  error,
  account,
  clients,
  editTask,
  editCampaign,
  editExpenses,
  editBudget,
  project,
  initialStep,
  onUpdate
}: NewProjectModalProps & StateProps) => {
  const newClientSuccess = useSelector(
    (state: any) => state.clients.newClientSuccess
  )
  const newClientData = useSelector((state: any) => state.clients.newClientData)

  return (
    <AppModal open={open} onRequestClose={onRequestClose}>
      <NewProject
        initialStep={initialStep}
        onRequestClose={onRequestClose}
        onSubmitClicked={onSubmitClicked}
        error={error}
        success={success}
        account={account}
        clients={clients}
        addClientSuccess={newClientSuccess}
        newClientData={newClientData}
        project={project}
        editTask={editTask}
        editCampaign={editCampaign}
        editExpenses={editExpenses}
        editBudget={editBudget}
        onUpdate={onUpdate}
      />
    </AppModal>
  )
}

type StateProps = {
  success: boolean
  error: string | null
  account: Types.Account
  clients: Array<Types.Client>
}

const mapState = (state: ReduxState): StateProps => ({
  success: state.project.updateSuccess,
  error: state.project.updateError,
  account: state.auth.account as Types.Account,
  clients: state.clients.clientsData as Array<Types.Client>
})

export default connect(mapState)(NewProjectModal)
