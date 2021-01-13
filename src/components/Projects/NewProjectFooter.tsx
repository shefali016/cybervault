import { Button, IconButton, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import ArrowBack from '@material-ui/icons/ArrowBack'
import {
  CENTER,
  FLEX,
  FLEX_END,
  NONE,
  POSITION_ABSOLUTE
} from '../../utils/constants/stringConstants'
import { GREY_COLOR } from '../../utils/constants/colorsConstants'
import { GradiantButton } from '../Common/Button/GradiantButton'

type Props = {
  onBack?: () => void
  onNext?: () => void
  title: string
  description?: string
  onStartProject?: () => void
  haveError?: boolean
  onUpdate?: (projectData: any) => void
  projectData?: any
}

const NewProjectFooter = ({
  onBack,
  onNext,
  title,
  description,
  onStartProject,
  haveError,
  onUpdate,
  projectData
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
      <div className={classes.bottomView} style={{ marginTop: 10 }}>
        {typeof onStartProject === 'function' && (
          <div className={classes.startProjectButtonContainer}>
            <GradiantButton
              onClick={onStartProject}
              className={classes.buttonStartProject}>
              <Typography variant={'button'}>Start Project</Typography>
            </GradiantButton>
          </div>
        )}
        {haveError ? (
          <Typography className={classes.warningText}>
            {' '}
            Please fill all the required fields.
          </Typography>
        ) : null}
        {typeof onBack === 'function' && renderBackButton()}
        <Typography variant={'caption'} className={classes.stepLabel}>
          {title}
        </Typography>
        {typeof onNext === 'function' && (
          <GradiantButton onClick={onNext} className={classes.continueButton}>
            <Typography variant={'button'}>Continue</Typography>
          </GradiantButton>
        )}
        {typeof onUpdate === 'function' && (
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
  root: { marginTop: 40 },
  stepLabel: {
    color: theme.palette.grey[500]
  },
  continueButton: { marginLeft: 25 },
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
  buttonStartProject: {
    width: 180,
    height: 40
  },
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
    position: 'absolute',
    right: 0,
    top: -20
  }
}))

export default NewProjectFooter
