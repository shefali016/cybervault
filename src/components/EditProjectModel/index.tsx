import React, { useState } from 'react'
import '../Projects/Projects.css'
import { POSITION_ABSOLUTE } from 'utils/constants/stringConstants'
import NewProjectStepOne from '../Projects/Steps/NewProjectStepOne'
import NewProjectStepTwo from '../Projects/Steps/NewProjectStepTwo'
import NewProjectStepThree from '../Projects/Steps/NewProjectStepThree'
import NewProjectStepFour from '../Projects/Steps/NewProjectStepFour'
import NewProjectStepFive from '../Projects/Steps/NewProjectStepFive'
import { generateUid } from '../../utils'
import AppModal from '../Common/Modal'
import CloseButton from '../Common/Button/CloseButton'
import * as Types from '../../utils/Interface'

type EditProjectProps = {
  onRequestClose: () => void
  onSubmitClicked: (projectData: Types.Project) => void
  currentStep: number
  editTask?: boolean
  editCampaign?: boolean
  editExpenses?: boolean
  editBudget?: boolean
  currentProjectData?: Types.Project
}

const EditProject = ({
  onRequestClose,
  onSubmitClicked,
  currentStep,
  editTask,
  editCampaign,
  editExpenses,
  editBudget,
  currentProjectData
}: EditProjectProps) => {
  const [projectData, setProjectData] = useState(currentProjectData)
  const [haveError, setHaveError] = useState(false)
  const isEdit = true

  const onSubmitData = () => {
    // @ts-ignorets
    onSubmitClicked({ ...projectData, id: generateUid() })
  }

  const onUpdateData = (projectData: any) => {
    // @ts-ignorets
    onSubmitClicked({ ...projectData })
  }

  const renderStepsView = () => {
    const props = {
      projectData,
      onUpdate: (projectData: any) => onUpdateData(projectData),
      haveError,
      setHaveError,
      setProjectData,
      onSubmit: () => onSubmitData(),
      isEdit,
      editTask,
      editCampaign,
      editExpenses,
      editBudget
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
    <div className='new-project-modal-content'>
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
  currentStep: number
  isTaskEdit?: boolean
  isCampaignEdit?: boolean
  isExpensesEdit?: boolean
  isBudgetEdit?: boolean
  projectData?: any
}

const EditProjectModal = ({
  open,
  onRequestClose,
  onSubmitClicked,
  currentStep,
  isTaskEdit,
  isCampaignEdit,
  isExpensesEdit,
  isBudgetEdit,
  projectData
}: NewProjectModalProps) => {
  return (
    <AppModal open={open} onRequestClose={onRequestClose}>
      <EditProject
        onRequestClose={onRequestClose}
        onSubmitClicked={onSubmitClicked}
        currentStep={currentStep}
        editTask={isTaskEdit}
        editCampaign={isCampaignEdit}
        editExpenses={isExpensesEdit}
        editBudget={isBudgetEdit}
        currentProjectData={projectData}
      />
    </AppModal>
  )
}

export default EditProjectModal
