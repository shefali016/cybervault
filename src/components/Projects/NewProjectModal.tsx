import React, { useState, useRef } from 'react'
import '../../App.css'
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
import * as Types from '../../utils/types'
import validate from '../../utils/helpers'
import { setMedia } from '../../apis/assets'

type NewProjectProps = {
  onRequestClose: () => void
  onSubmitClicked: (projectData: any) => void
}

const NewProject = ({ onRequestClose, onSubmitClicked }: NewProjectProps) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [projectData, setProjectData] = useState(getProductData())
  const [haveError, setHaveError] = useState(false)
  const modalContentRef = useRef<HTMLDivElement>(null)

  const onSubmitData = async () => {
    // @ts-ignorets
    const { logoFile, logo, ...rest } = projectData
    const logoUrl = await setMedia(
      `images/clientLogos/${generateUid()}`,
      logoFile
    )
    onSubmitClicked({ ...rest, id: generateUid(), logo: logoUrl })
  }
  const newProject = true
  const renderStepsView = () => {
    const props = {
      projectData,
      haveError,
      setHaveError,
      newProject,
      setProjectData,
      onNext: () => {
        const isError = validate(currentStep, projectData)
        if (isError) {
          setHaveError(true)
        } else {
          setHaveError(false)
          setCurrentStep((step) => step + 1)
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
}

const NewProjectModal = ({
  open,
  onRequestClose,
  onSubmitClicked
}: NewProjectModalProps) => {
  return (
    <AppModal open={open} onRequestClose={onRequestClose}>
      <NewProject
        onRequestClose={onRequestClose}
        onSubmitClicked={onSubmitClicked}
      />
    </AppModal>
  )
}

export default NewProjectModal
