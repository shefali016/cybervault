import React, { ChangeEvent, useState } from 'react'
import { makeStyles, Typography, Button, TextField } from '@material-ui/core'
import {
  PRIMARY_COLOR,
  TRANSPARENT,
  PRIMARY_DARK_COLOR,
  GREY_COLOR,
} from 'utils/constants/colorsConstants'
import {
  BOLD,
  CENTER,
  COLUMN,
  FLEX,
  NONE,
  POSITION_ABSOLUTE,
  ROW,
} from 'utils/constants/stringConstants'
import AddIcon from '@material-ui/icons/Add'
import { StretegyTask } from '../../../utils/types/index'
import AppTextField from '../../Common/Core/AppTextField'
import NewProjectFooter from './NewProjectFooter'

const NewProjectStepTwo = (props: any) => {
  const classes = useStyles()
  const { projectData, setProjectData } = props
  const [tasksData, setTasks] = useState([1])

  const handleInputChange = (event: any) => (key: string) => {
    const value = event.target.value
    setProjectData({ ...projectData, [key]: value })
  }

  const addMoreClicked = () => {
    let newData: Array<number> = [...tasksData]
    newData.push(1)
    setTasks(newData)
  }

  const renderTopView = () => {
    return (
      <div className={classes.headerView}>
        <div style={{ marginBottom: 40 }}>
          <Typography variant={'h6'} className={classes.headerTitle}>
            Plan The Strategy.
          </Typography>
          <Typography variant={'body2'}>Work scope.</Typography>
        </div>
      </div>
    )
  }

  const renderTasksView = (data: StretegyTask, index: number) => {
    return (
      <div className={classes.tasksContainer} key={`task-${index}`}>
        <div style={{ flex: 2, marginRight: 15 }}>
          <AppTextField
            type={''}
            label={`Task ${index + 1}`}
            value={data.task}
            onChange={(e: ChangeEvent) => handleInputChange(e)('task')}
          />
        </div>
        <div style={{ flex: 0.2, marginRight: 15 }}>
          <AppTextField
            type={'date'}
            label={'Campaign DadeLine'}
            value={data.startDay}
            onChange={(e: ChangeEvent) => handleInputChange(e)('startDay')}
          />
        </div>
        <div style={{ flex: 0.2 }}>
          <AppTextField
            type={'date'}
            label={'Campaign DadeLine'}
            value={data.deadLine}
            onChange={(e: ChangeEvent) => handleInputChange(e)('deadLine')}
          />
        </div>
      </div>
    )
  }

  const renderAddMoreView = () => {
    return (
      <div style={{ marginBottom: 20 }}>
        <Button
          variant='contained'
          onClick={addMoreClicked}
          className={classes.moreButton}>
          <Typography variant={'button'} className={classes.addMoreLabel}>
            Add More
          </Typography>
          <AddIcon className={classes.addMoreButton} />
        </Button>
      </div>
    )
  }

  const renderProjectDescriptionView = () => {
    return (
      <TextField
        id={'description'}
        label={'Project Description'}
        variant='outlined'
        size='small'
        type={'text'}
        className={classes.textFieldDes}
        margin='normal'
        onChange={(e) => handleInputChange(e)('description')}
        value={projectData.description}
        InputProps={{ classes: { root: classes.inputRootDes } }}
        InputLabelProps={{
          classes: {
            root:
              projectData.description === ''
                ? classes.labelRoot
                : classes.labelRootFilled,
            focused: classes.labelFocused,
          },
        }}
        multiline={true}
      />
    )
  }

  const renderMiddleView = () => {
    return (
      <div className={classes.middleView}>
        <div className={classes.textFiledContainer}>
          <div style={{ flex: 4, marginRight: 15 }}>
            <AppTextField
              type={''}
              label={'Campaign Objective'}
              value={projectData.campaignObjective}
              onChange={(e: ChangeEvent) =>
                handleInputChange(e)('campaignObjective')
              }
            />
          </div>
          <div style={{ flex: 1 }}>
            <AppTextField
              type={'date'}
              label={'Campaign DadeLine'}
              value={projectData.campaignDeadLine}
              onChange={(e: ChangeEvent) =>
                handleInputChange(e)('campaignDeadLine')
              }
            />
          </div>
        </div>
        <div style={{ marginTop: 20 }}>
          {projectData.tasks && projectData.tasks.length > 0
            ? projectData.tasks.map((data: StretegyTask, index: number) => {
                return renderTasksView(data, index)
              })
            : null}
        </div>
        {renderAddMoreView()}
        {renderProjectDescriptionView()}
      </div>
    )
  }

  const renderBottomView = () => (
    <NewProjectFooter
      title={'Step 2 of 5'}
      onBack={props.onBack}
      onNext={props.onNext}
    />
  )

  return (
    <div className={classes.container}>
      {renderTopView()}
      {renderMiddleView()}
      {renderBottomView()}
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: FLEX,
    flex: 1,
    flexDirection: COLUMN,
  },
  headerView: {
    flex: 0.2,
    marginTop: 20,
  },
  headerTitle: {
    fontWeight: BOLD,
  },
  clientLogoContainer: {
    display: FLEX,
    flex: 1,
    marginTop: -30,
    alignItems: CENTER,
    justifyContent: CENTER,
    flexDirection: COLUMN,
  },
  clientLogo: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: TRANSPARENT,
    marginBottom: 5,
  },
  clientLogoImg: {
    height: 80,
    width: 80,
    borderRadius: 40,
    position: POSITION_ABSOLUTE,
  },
  addLogoText: {
    fontSize: 10,
    color: GREY_COLOR,
  },
  middleView: {
    flex: 0.7,
    display: FLEX,
    flexDirection: COLUMN,
  },
  textFiledContainer: {
    display: FLEX,
    flex: 1,
    flexDirection: ROW,
    marginBottom: 20,
  },
  tasksContainer: {
    display: FLEX,
    flex: 1,
    flexDirection: ROW,
    marginBottom: 20,
  },
  textField: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: 0,
    marginTop: 0,
    marginBottom: 0,
    fontWeight: 500,
    fontSize: 8,
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: GREY_COLOR,
      borderRadius: 20,
    },
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: PRIMARY_COLOR,
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: PRIMARY_COLOR,
    },
  },
  input: {
    color: PRIMARY_COLOR,
    fontSize: 8,
  },
  textFieldDes: {
    fontWeight: 500,
    fontSize: 8,
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: GREY_COLOR,
      borderRadius: 20,
    },
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: PRIMARY_COLOR,
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: PRIMARY_COLOR,
    },
    marginBottom: 20,
  },
  inputRootDes: {
    fontSize: 12,
    minHeight: 31,
  },
  inputRoot: {
    fontSize: 12,
    height: 31,
  },
  labelRoot: {
    fontSize: 12,
    color: GREY_COLOR,
    '&$labelFocused': {
      color: PRIMARY_DARK_COLOR,
    },
  },
  labelRootFilled: {
    fontSize: 12,
    color: GREY_COLOR,
    '&$labelFocused': {
      color: PRIMARY_DARK_COLOR,
    },
  },
  labelFocused: {},
  addMore: {
    marginTop: -10,
    marginBottom: 20,
  },
  addMoreLabel: {
    color: GREY_COLOR,
    fontSize: 10,
  },
  moreButton: {
    width: 120,
    height: 30,
    fontSize: 8,
    borderRadius: 20,
    textTransform: NONE,
  },
  closeButton: {
    position: POSITION_ABSOLUTE,
    top: 10,
    right: 10,
  },
  addMoreButton: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
}))

export default NewProjectStepTwo
