import { Button, IconButton, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import ArrowBack from '@material-ui/icons/ArrowBack'
import {
  CENTER,
  FLEX,
  FLEX_END,
  NONE,
} from '../../utils/constants/stringConstants'
import { GREY_COLOR } from '../../utils/constants/colorsConstants'

type Props = {
  onBack?: () => void
  onNext?: () => void
  title: string
}

const NewProjectFooter = ({ onBack, onNext, title }: Props) => {
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
    <div className={classes.bottomView}>
      {typeof onBack === 'function' && renderBackButton()}
      <Typography variant={'caption'} className={classes.stepLabel}>
        {title}
      </Typography>
      {typeof onNext === 'function' && (
        <Button
          variant='contained'
          onClick={onNext}
          color='primary'
          className={classes.button}>
          <Typography variant={'button'}>Continue</Typography>
        </Button>
      )}
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  stepLabel: {
    color: GREY_COLOR,
    marginRight: 25,
    marginLeft: 15,
  },
  button: {
    width: 110,
    height: 40,
    fontSize: 8,
    borderRadius: 20,
    background: 'linear-gradient(45deg, #5ea5fc 30%, #3462fc 90%)',
    textTransform: NONE,
  },
  backButton: { height: 40, width: 40 },
  backButtonIcon: {
    width: 15,
    height: 15,
    margin: 0,
  },
  bottomView: {
    flex: 0.1,
    display: FLEX,
    alignItems: CENTER,
    justifyContent: FLEX_END,
    marginTop: 20,
  },
}))

export default NewProjectFooter
