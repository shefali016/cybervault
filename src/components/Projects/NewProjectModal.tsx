import React, { useState, useRef } from 'react'
import '../../App.css'
import './Projects.css'
import { Modal, makeStyles, IconButton } from '@material-ui/core'
import { POSITION_ABSOLUTE } from 'utils/constants/stringConstants'
import ClearIcon from '@material-ui/icons/Clear'
import NewProjectStepOne from './Steps/NewProjectStepOne'
import NewProjectStepTwo from './Steps/NewProjectStepTwo'
import NewProjectStepThree from './Steps/NewProjectStepThree'
import NewProjectStepFour from './Steps/NewProjectStepFour'
import { getProductData } from '../../utils'
import AppModal, { ModalProps } from '../Common/Modal'

type NewProjectProps = {
  onRequestClose: () => void
}

const NewProject = ({ onRequestClose }: NewProjectProps) => {
  const classes = useStyles()
  const [currentStep, setCurrentStep] = useState(1)
  const [projectData, setProjectData] = useState(getProductData())

  const modalContentRef = useRef<HTMLDivElement>(null)

  const renderCloseButton = () => {
    return (
      <IconButton
        aria-label='delete'
        className={classes.closeButton}
        onClick={onRequestClose}>
        <ClearIcon fontSize='small' />
      </IconButton>
    )
  }

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
      {renderCloseButton()}
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

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: POSITION_ABSOLUTE,
    top: 10,
    right: 10
  }
}))

export default NewProjectModal
