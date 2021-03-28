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
import DeleteIcon from '@material-ui/icons/Delete'

type Props = {
  onBack?: () => void
  onNext?: () => void
  onDelete?: () => void
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
  isEdit?: boolean
  persistBackButton?: boolean
}

const NewProjectFooter = ({
  onBack,
  onNext,
  onDelete,
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
  isEdit,
  persistBackButton
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
              className={classes.button}
              loading={isLoading}>
              <Typography variant={'button'}>Start Project</Typography>
            </GradiantButton>
          </div>
        )}

        {typeof onBack === 'function' &&
          ((!isEdit && currentStep !== 1) || persistBackButton) &&
          renderBackButton()}

        {!isEdit && !!title && (
          <Typography variant={'caption'} className={classes.stepLabel}>
            {title}
          </Typography>
        )}

        {!isEdit && typeof onNext === 'function' && (
          <GradiantButton
            onClick={onNext}
            className={classes.button}
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
            loading={isLoading}
            className={classes.button}>
            <Typography variant={'button'}>Update</Typography>
          </GradiantButton>
        )}

        {isEdit && onDelete && (
          <IconButton
            onClick={onDelete}
            aria-label={'Delete Client'}
            className={'backButton'}
          />
        )}
      </div>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: { marginTop: 40, display: FLEX, flexDirection: COLUMN },
  stepLabel: {
    color: theme.palette.grey[500],
    marginLeft: 15
  },
  button: { marginLeft: 25, minWidth: '125px', borderRadius: '24px' },
  backButton: { height: 40, width: 40 },
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
  startProjectButtonContainer: {
    position: POSITION_ABSOLUTE,
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    display: FLEX,
    height: 50,
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
