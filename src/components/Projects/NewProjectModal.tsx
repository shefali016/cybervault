import React, { useState } from 'react'
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
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'

type Props = {
  open: boolean
  onRequestClose: () => void
}

const NewProjectModal = ({ open, onRequestClose }: Props) => {
  const classes = useStyles()
  const [currentStep, setCurrentStep] = useState(1)
  const [projectData, setProjectData] = useState(getProductData())

  const handleClose = () => {}

  const renderCloseButton = () => {
    return (
      <IconButton
        aria-label='delete'
        className={classes.closeButton}
        onClick={() => {
          setCurrentStep(1)
          onRequestClose()
        }}>
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
      open={open}
      onClose={handleClose}
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      className={'new-project-modal'}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}>
      <Fade in={open}>
        <div className='new-project-modal-content'>
          {renderStepsView()}
          {renderCloseButton()}
        </div>
      </Fade>
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
