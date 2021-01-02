import React, { ChangeEvent, useState } from 'react'
import '../Projects.css'
import { makeStyles } from '@material-ui/core'
import {
  PRIMARY_COLOR,
  TRANSPARENT,
  PRIMARY_DARK_COLOR,
  GREY_COLOR
} from 'utils/constants/colorsConstants'
import {
  BOLD,
  CENTER,
  COLUMN,
  FLEX,
  NONE,
  POSITION_ABSOLUTE,
  ROW
} from 'utils/constants/stringConstants'
import { InputChangeEvent, Task } from '../../../utils/types'
import AppTextField from '../../Common/Core/AppTextField'
import NewProjectFooter from '../NewProjectFooter'
import NewProjectTitle from '../NewProjectTitle'
import { useTabletLayout } from '../../../utils/hooks'
import AddMoreButton from '../../Common/Button/MoreButton'
import { generateUid } from '../../../utils'
import CloseButton from '../../Common/Button/CloseButton'

const NewProjectStepTwo = (props: any) => {
  const isTablet = useTabletLayout()
  const classes = useStyles()
  const { projectData, setProjectData } = props
  const [tasksData, setTasks] = useState([1])

  const handleInputChange = (event: InputChangeEvent) => (key: string) => {
    const value = event.target.value
    setProjectData({ ...projectData, [key]: value })
  }

  const addTask = () => {
    const tasks = [
      ...projectData.tasks,
      { id: generateUid(), title: '', endDate: '', startDate: '' }
    ]
    setProjectData({ ...projectData, tasks })
  }

  const handleTaskChange = (
    event: InputChangeEvent,
    key: string,
    index: number
  ) => {
    const value = event.target.value
    const tasks = [...projectData.tasks]
    tasks[index][key] = value
    setProjectData({ ...projectData, tasks })
  }

  const deleteTask = (id: string) => {
    const tasks = projectData.tasks.filter((task: Task) => task.id !== id)
    setProjectData({ ...projectData, tasks })
  }

  const renderTasksView = (data: Task, index: number) => {
    const leftInputMargin = !isTablet ? 15 : 0
    const closeButton = (
      <div style={isTablet ? { alignSelf: 'flex-start' } : { marginLeft: 10 }}>
        <CloseButton onClick={() => deleteTask(data.id)} />
      </div>
    )
    return (
      <div className={'task-row'} key={`task-${data.id}`}>
        {isTablet && closeButton}
        <div style={{ flex: 2, marginRight: leftInputMargin }}>
          <AppTextField
            type={''}
            label={`Task ${index + 1}`}
            value={data.title}
            onChange={(e: InputChangeEvent) =>
              handleTaskChange(e, 'title', index)
            }
          />
        </div>
        <div style={{ flex: 0.2, marginRight: leftInputMargin }}>
          <AppTextField
            type={'date'}
            label={'Campaign DadeLine'}
            value={data.startDate}
            onChange={(e: InputChangeEvent) =>
              handleTaskChange(e, 'startDate', index)
            }
          />
        </div>
        <div style={{ flex: 0.2 }}>
          <AppTextField
            type={'date'}
            label={'Campaign DadeLine'}
            value={data.endDate}
            onChange={(e: InputChangeEvent) =>
              handleTaskChange(e, 'endDate', index)
            }
          />
        </div>
        {!isTablet && closeButton}
      </div>
    )
  }

  const renderProjectDescriptionView = () => {
    return (
      <div style={{ marginTop: 30 }}>
        <AppTextField
          label={'Project Description'}
          type={'text'}
          onChange={(e) => handleInputChange(e)('description')}
          value={projectData.description}
          multiline={true}
        />
      </div>
    )
  }

  const renderMiddleView = () => {
    const leftInputMargin = !isTablet ? 15 : 0
    return (
      <div className={classes.middleView}>
        <div>
          <div className={'input-row'} style={{ marginBottom: 30 }}>
            <div style={{ flex: 4, marginRight: leftInputMargin }}>
              <AppTextField
                type={''}
                label={'Campaign Objective'}
                value={projectData.campaignObjective}
                onChange={(e: InputChangeEvent) =>
                  handleInputChange(e)('campaignObjective')
                }
              />
            </div>
            <div style={{ flex: 1 }}>
              <AppTextField
                type={'date'}
                label={'Campaign DadeLine'}
                value={projectData.campaignDeadLine}
                onChange={(e: InputChangeEvent) =>
                  handleInputChange(e)('campaignDeadLine')
                }
              />
            </div>
          </div>
        </div>
        {projectData.tasks && projectData.tasks.length > 0
          ? projectData.tasks.map((data: Task, index: number) => {
              return renderTasksView(data, index)
            })
          : null}
        <AddMoreButton onClick={addTask} title={'Add Task'} />
        {renderProjectDescriptionView()}
      </div>
    )
  }

  return (
    <div className={classes.container}>
      <NewProjectTitle title={'Plan The Strategy.'} subtitle={'Work scope.'} />
      {renderMiddleView()}
      <NewProjectFooter
        title={'Step 2 of 5'}
        onBack={props.onBack}
        onNext={props.onNext}
      />
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: FLEX,
    flex: 1,
    flexDirection: COLUMN
  },
  headerView: {
    flex: 0.2,
    marginTop: 20
  },
  headerTitle: {
    fontWeight: BOLD
  },
  clientLogoContainer: {
    display: FLEX,
    flex: 1,
    marginTop: -30,
    alignItems: CENTER,
    justifyContent: CENTER,
    flexDirection: COLUMN
  },
  clientLogo: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: TRANSPARENT,
    marginBottom: 5
  },
  clientLogoImg: {
    height: 80,
    width: 80,
    borderRadius: 40,
    position: POSITION_ABSOLUTE
  },
  addLogoText: {
    fontSize: 10,
    color: GREY_COLOR
  },
  middleView: {
    flex: 1,
    display: FLEX,
    flexDirection: COLUMN
  },
  textFiledContainer: {
    display: FLEX,
    flex: 1,
    flexDirection: ROW,
    marginBottom: 20
  },
  tasksContainer: {
    display: FLEX,
    flex: 1,
    flexDirection: ROW,
    marginBottom: 20
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
      borderRadius: 20
    },
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: PRIMARY_COLOR
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: PRIMARY_COLOR
    }
  },
  input: {
    color: PRIMARY_COLOR,
    fontSize: 8
  },
  textFieldDes: {
    fontWeight: 500,
    fontSize: 8,
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: GREY_COLOR,
      borderRadius: 20
    },
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: PRIMARY_COLOR
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: PRIMARY_COLOR
    },
    marginBottom: 20
  },
  inputRootDes: {
    fontSize: 12,
    minHeight: 31
  },
  inputRoot: {
    fontSize: 12,
    height: 31
  },
  labelRoot: {
    fontSize: 12,
    color: GREY_COLOR,
    '&$labelFocused': {
      color: PRIMARY_DARK_COLOR
    }
  },
  labelRootFilled: {
    fontSize: 12,
    color: GREY_COLOR,
    '&$labelFocused': {
      color: PRIMARY_DARK_COLOR
    }
  },
  labelFocused: {},
  addMore: {
    marginTop: -10,
    marginBottom: 20
  },
  addMoreLabel: {
    color: GREY_COLOR,
    fontSize: 10
  },
  moreButton: {
    width: 120,
    height: 30,
    fontSize: 8,
    borderRadius: 20,
    textTransform: NONE
  },
  addMoreButton: {
    width: 20,
    height: 20,
    marginLeft: 10
  }
}))

export default NewProjectStepTwo
