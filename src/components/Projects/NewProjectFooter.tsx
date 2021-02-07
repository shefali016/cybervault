import { IconButton, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import ArrowBack from '@material-ui/icons/ArrowBack'
import {
  CENTER,
  COLUMN,
  FLEX,
  FLEX_END,
  NONE,
  POSITION_ABSOLUTE
} from '../../utils/constants/stringConstants'
import { GradiantButton } from '../Common/Button/GradiantButton'

type Props = {
  onBack?: () => void
  onNext?: () => void
  title?: string
  description?: string
  onStartProject?: () => void
  haveError?: boolean
  onUpdate?: (projectData: any) => void
  projectData?: any
  isLoading?: boolean
  addClient?: boolean
  currentStep?: number
  buttonText?: string
  disabled?: boolean
  isEdit: boolean
}

const NewProjectFooter = ({
  onBack,
  onNext,
  title,
  description,
  onStartProject,
  haveError,
  onUpdate,
  projectData,
  isLoading,
  currentStep,
  buttonText,
  disabled,
  isEdit
}: Props) => {
  const classes = useStyles()

  const renderBackButton = () => {
    return (
      <IconButton
        aria-label='back'
        onClick={onBack}
        className={classes.backButton}>
        <ArrowBack />
      </IconButton>
    )
  }

  return (
    <div className={classes.root}>
      {!!description && (
        <Typography variant={'caption'}>{description}</Typography>
      )}

      {haveError && (
        <Typography className={classes.warningText}>
          Please fill all the required fields.
        </Typography>
      )}

      <div className={classes.bottomView} style={{ marginTop: 10 }}>
        {!isEdit && typeof onStartProject === 'function' && (
          <div className={classes.startProjectButtonContainer}>
            <GradiantButton
              onClick={onStartProject}
              className={classes.buttonStartProject}
              loading={isLoading}>
              <Typography variant={'button'}>Start Project</Typography>
            </GradiantButton>
          </div>
        )}

        {!isEdit &&
          typeof onBack === 'function' &&
          currentStep !== 1 &&
          renderBackButton()}

        {!isEdit && !!title && (
          <Typography variant={'caption'} className={classes.stepLabel}>
            {title}
          </Typography>
        )}

        {!isEdit && typeof onNext === 'function' && (
          <GradiantButton
            onClick={onNext}
            className={classes.continueButton}
            loading={isLoading}
            disabled={disabled}>
            <Typography variant={'button'}>
              {buttonText ? buttonText : 'Continue'}
            </Typography>
          </GradiantButton>
        )}

        {isEdit && typeof onUpdate === 'function' && (
          <GradiantButton
            onClick={() => onUpdate(projectData)}
            className={classes.continueButton}>
            <Typography variant={'button'}>Update</Typography>
          </GradiantButton>
        )}
      </div>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: { marginTop: 40, display: FLEX, flexDirection: COLUMN },
  stepLabel: {
    color: theme.palette.grey[500]
  },
  continueButton: { marginLeft: 25, minWidth: '125px', borderRadius: '24px' },
  button: {
    width: 110,
    height: 40,
    fontSize: 8,
    textTransform: NONE
  },
  backButton: { height: 40, width: 40, marginRight: 15 },
  backButtonIcon: {
    width: 15,
    height: 15,
    margin: 0
  },
  bottomView: {
    flex: 1,
    display: FLEX,
    alignItems: CENTER,
    justifyContent: FLEX_END,
    position: 'relative'
  },
  buttonStartProject: {},
  startProjectButtonContainer: {
    position: POSITION_ABSOLUTE,
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    display: FLEX,
    justifyContent: CENTER,
    [theme.breakpoints.down('sm')]: { top: -55 }
  },
  warningText: {
    color: 'red',
    fontSize: 12,
    alignSelf: 'flex-end'
  }
}))

export default NewProjectFooter
