import React, { useState } from 'react'
import '../../App.css'
import './Projects.css'
import { Modal, makeStyles, IconButton } from '@material-ui/core'
import { WHITE_COLOR } from 'utils/constants/colorsConstants'
import {
  APP_BAR_HEIGHT,
  COLUMN,
  FLEX,
  NONE,
  POSITION_ABSOLUTE,
} from 'utils/constants/stringConstants'
import ClearIcon from '@material-ui/icons/Clear'
import NewProjectStepOne from './Steps/NewProjectStepOne'
import NewProjectStepTwo from './Steps/NewProjectStepTwo'
import NewProjectStepThree from './Steps/NewProjectStepThree'
import NewProjectStepFour from './Steps/NewProjectStepFour'
import { getProductData } from '../../utils'

const NewProjectModal = (props: any) => {
  const classes = useStyles()
  const [currentStep, setCurrentStep] = useState(1)
  const [projectData, setProjectData] = useState(getProductData())

  const handleClose = () => {}

  const renderCloseButton = () => {
    return (
      <IconButton aria-label='delete' className={classes.closeButton}>
        <ClearIcon fontSize='small' />
      </IconButton>
    )
  }

  const renderStepsView = () => {
    const props = {
      projectData,
      setProjectData,
      onNext: () => setCurrentStep((step) => step + 1),
      onBack: () => setCurrentStep((step) => step - 1),
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
    <Modal
      open={true}
      onClose={handleClose}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'>
      <div className='new-project-modal-background'>
        <div className={'new-project-modal'}>
          {renderStepsView()}
          {renderCloseButton()}
        </div>
      </div>
    </Modal>
  )
}

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: POSITION_ABSOLUTE,
    top: 10,
    right: 10,
  },
}))

export default NewProjectModal
