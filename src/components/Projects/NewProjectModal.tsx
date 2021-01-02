import React, { useState, useRef } from 'react'
import '../../App.css'
import './Projects.css'
import { POSITION_ABSOLUTE } from 'utils/constants/stringConstants'
import NewProjectStepOne from './Steps/NewProjectStepOne'
import NewProjectStepTwo from './Steps/NewProjectStepTwo'
import NewProjectStepThree from './Steps/NewProjectStepThree'
import NewProjectStepFour from './Steps/NewProjectStepFour'
import { getProductData } from '../../utils'
import AppModal from '../Common/Modal'
import CloseButton from '../Common/Button/CloseButton'

type NewProjectProps = {
  onRequestClose: () => void
}

const NewProject = ({ onRequestClose }: NewProjectProps) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [projectData, setProjectData] = useState(getProductData())

  const modalContentRef = useRef<HTMLDivElement>(null)

  const renderStepsView = () => {
    const props = {
      projectData,
      setProjectData,
      onNext: () => {
        setCurrentStep((step) => step + 1)
        if (modalContentRef.current) {
          modalContentRef.current.scrollTop = 0
        }
      },
      onBack: () => {
        setCurrentStep((step) => step - 1)
        if (modalContentRef.current) {
          modalContentRef.current.scrollTop = 0
        }
      }
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

type NewProjectModalProps = { open: boolean; onRequestClose: () => void }

const NewProjectModal = ({ open, onRequestClose }: NewProjectModalProps) => {
  return (
    <AppModal open={open} onRequestClose={onRequestClose}>
      <NewProject onRequestClose={onRequestClose} />
    </AppModal>
  )
}

export default NewProjectModal
