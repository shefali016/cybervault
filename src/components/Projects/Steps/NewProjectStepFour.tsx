import React, { useState } from 'react'
import { makeStyles, Typography, Button } from '@material-ui/core'
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
  FLEX_END,
  NONE,
  POSITION_ABSOLUTE,
  ROW
} from 'utils/constants/stringConstants'
import AddIcon from '@material-ui/icons/Add'
import { StretegyMilestone } from '../../../utils/types'
import { useTabletLayout } from '../../../utils/hooks'
import NewProjectTitle from '../NewProjectTitle'
import AppTextField from '../../Common/Core/AppTextField'
import NewProjectFooter from '../NewProjectFooter'
import { InputChangeEvent } from '../../../utils/types'
import AddMoreButton from '../../Common/Button/MoreButton'

const NewProjectStepFour = (props: any) => {
  const isTablet = useTabletLayout()
  const classes = useStyles()
  const { projectData, setProjectData } = props
  const [tasksData, setTasks] = useState([1])

  const addMoreClicked = () => {
    let newData: Array<number> = [...tasksData]
    newData.push(1)
    setTasks(newData)
  }

  const onMilestoneChange = (
    event: InputChangeEvent,
    key: string,
    index: number
  ) => {
    const value = event.target.value
    const updatedMilestones = ([...projectData.milestones][index][key] = value)
    setProjectData({ ...projectData, milestones: updatedMilestones })
  }

  const renderTasksView = (data: StretegyMilestone, index: number) => {
    const leftInputMargin = !isTablet ? 15 : 0
    return (
      <div className={'task-row'}>
        <div style={{ flex: 1, marginRight: leftInputMargin }}>
          <AppTextField
            type={''}
            label={`Milestone ${index + 1}`}
            value={projectData.milestones[index].title}
            onChange={(e: InputChangeEvent) =>
              onMilestoneChange(e, 'title', index)
            }
          />
        </div>
        <div style={{ flex: 1 }}>
          <AppTextField
            type={'number'}
            label={`Payment`}
            value={projectData.milestones[index].payment}
            onChange={(e: InputChangeEvent) =>
              onMilestoneChange(e, 'payment', index)
            }
          />
        </div>
      </div>
    )
  }

  const renderMiddleView = () => {
    return (
      <div className={classes.middleView}>
        {projectData.milestones && projectData.milestones.length > 0
          ? projectData.milestones.map(
              (data: StretegyMilestone, index: number) => {
                return renderTasksView(data, index)
              }
            )
          : null}
        <AddMoreButton onClick={addMoreClicked} title={'Add Milestone'} />
      </div>
    )
  }

  return (
    <div className={classes.container}>
      <NewProjectTitle
        title={'Set Milestone Payments.'}
        subtitle={'Get paid upon completion of each task or date.'}
      />
      {renderMiddleView()}
      <NewProjectFooter
        onBack={props.onBack}
        onNext={props.onNext}
        title={'Step 4 of 5'}
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
    flex: 0.25,
    flexDirection: ROW,
    marginTop: 20
  },
  tasksContainer: {
    display: FLEX,
    flex: 0.25,
    flexDirection: ROW,
    marginTop: 15,
    marginBottom: 15
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
  moreButton: {
    width: 120,
    height: 30,
    fontSize: 8,
    borderRadius: 20,
    textTransform: NONE
  },
  input: {
    color: PRIMARY_COLOR,
    fontSize: 8
  },
  textFieldDes: {
    marginTop: 10,
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
  inputRootDes: {
    fontSize: 10,
    height: 80
  },
  inputRoot: {
    fontSize: 10,
    height: 25
  },
  labelRoot: {
    fontSize: 10,
    color: GREY_COLOR,
    '&$labelFocused': {
      color: PRIMARY_DARK_COLOR,
      marginTop: 2
    },
    height: 25,
    marginTop: -5
  },
  labelRootFilled: {
    fontSize: 10,
    color: GREY_COLOR,
    '&$labelFocused': {
      color: PRIMARY_DARK_COLOR,
      marginTop: 2
    },
    height: 25,
    marginTop: 0
  },
  dateRoot: {
    fontSize: 10,
    color: GREY_COLOR,
    '&$labelFocused': {
      color: PRIMARY_DARK_COLOR
    },
    height: 25
  },
  dateRootFilled: {
    fontSize: 10,
    color: GREY_COLOR,
    '&$labelFocused': {
      color: PRIMARY_DARK_COLOR
    },
    height: 25,
    marginTop: 0
  },
  labelFocused: {},
  bottomView: {
    flex: 0.1,
    display: FLEX,
    alignItems: CENTER,
    justifyContent: FLEX_END
  },
  addMore: {
    flex: 0.1,
    display: FLEX,
    alignItems: CENTER
  },
  stepLabel: {
    color: GREY_COLOR,
    fontSize: 10,
    marginRight: 30,
    justifyContent: FLEX_END
  },
  bottomLeftView: {
    flex: 0.65,
    display: FLEX,
    alignItems: CENTER,
    color: GREY_COLOR,
    fontSize: 10
  },
  bottomRightView: {
    flex: 0.35,
    display: FLEX,
    alignItems: CENTER,
    justifyContent: FLEX_END
  },
  addMoreLabel: {
    color: GREY_COLOR,
    fontSize: 10,
    marginRight: 10
  },
  estimatedCostLabel: {
    color: GREY_COLOR,
    fontSize: 10,
    marginTop: 30
  },
  button: {
    width: 70,
    height: 25,
    fontSize: 8,
    borderRadius: 15,
    background: 'linear-gradient(45deg, #5ea5fc 30%, #3462fc 90%)',
    textTransform: NONE
  },
  closeButton: {
    position: POSITION_ABSOLUTE,
    top: 10,
    right: 10
  },
  backButton: {
    width: 12,
    height: 18
  }
}))

export default NewProjectStepFour
