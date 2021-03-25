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
import { Client } from '../../utils/Interface'
import { Typography } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import { GradiantButton } from 'components/Common/Button/GradiantButton'

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
  isBeyondLimit?: boolean
  onUpgradeSubscription?: () => void
  onClientAdded?: () => void
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
  onUpdate,
  isBeyondLimit,
  onUpgradeSubscription,
  onClientAdded
}: NewProjectProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(initialStep)
  const [projectData, setProjectData] = useState({
    ...getProductData(),
    ...(project || {})
  })
  const [clientData, setClientData] = useState<Client | null>(null)
  const [haveError, setHaveError] = useState(false)
  const [addClient, setAddClient] = useState(false)
  const modalContentRef = useRef<HTMLDivElement>(null)
  const toastContext = useContext(ToastContext)
  const theme = useTheme()

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

  const onUpdateData = () => {
    if (typeof onUpdate !== 'function') {
      return
    }

    const isError = validate(currentStep, projectData, clientData)
    if (isError) {
      setHaveError(true)
    } else {
      setHaveError(false)

      const projectUpdate = { ...projectData }

      if (clientData) {
        projectUpdate.clientId = clientData.id
      }

      onUpdate(projectUpdate)
    }
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
        createdAt: Date.now(),
        updatedAt: Date.now(),
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
      onClientAdded,
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

  const renderProjectLimitMessage = () => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: theme.spacing(2),
          textAlign: 'center',
          maxWidth: 450
        }}>
        <Typography variant='h5' style={{ marginBottom: theme.spacing(2) }}>
          Limit Reached
        </Typography>
        <Typography variant={'h6'} style={{ marginBottom: theme.spacing(3) }}>
          You have reached this month's project limit. Upgrade your subscription
          to create more projects.
        </Typography>
        <GradiantButton onClick={onUpgradeSubscription}>
          Upgrade Subscription
        </GradiantButton>
      </div>
    )
  }

  return (
    <div
      className={isBeyondLimit ? 'modalContent' : 'new-project-modal-content'}
      ref={modalContentRef}>
      {isBeyondLimit ? renderProjectLimitMessage() : renderStepsView()}
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
  isBeyondLimit?: boolean
  onUpgradeSubscription?: () => void
  onClientAdded?: () => void
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
  onUpdate,
  isBeyondLimit,
  onUpgradeSubscription,
  onClientAdded
}: NewProjectModalProps & StateProps) => {
  const newClientSuccess = useSelector(
    (state: any) => state.clients.newClientSuccess
  )
  const newClientData = useSelector((state: any) => state.clients.newClientData)

  return (
    <AppModal open={open} onRequestClose={onRequestClose}>
      <NewProject
        onClientAdded={onClientAdded}
        onUpgradeSubscription={onUpgradeSubscription}
        initialStep={initialStep}
        onRequestClose={onRequestClose}
        onSubmitClicked={onSubmitClicked}
        error={error}
        success={success}
        account={account}
        clients={clients}
        isBeyondLimit={isBeyondLimit}
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
