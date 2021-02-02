import React from 'react'
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
  FLEX_END,
  NONE,
  POSITION_ABSOLUTE,
  ROW
} from 'utils/constants/stringConstants'
import { Milestone } from '../../../utils/Interface'
import { useTabletLayout } from '../../../utils/hooks'
import NewProjectTitle from '../NewProjectTitle'
import AppTextField from '../../Common/Core/AppTextField'
import NewProjectFooter from '../NewProjectFooter'
import { InputChangeEvent } from '../../../utils/Interface'
import AddMoreButton from '../../Common/Button/MoreButton'
import { generateUid } from '../../../utils'
import CloseButton from '../../Common/Button/CloseButton'

const NewProjectStepFive = (props: any) => {
  const isTablet = useTabletLayout()
  const classes = useStyles()
  const { projectData, setProjectData } = props

  const addMilestone = () => {
    const milestones: Array<Milestone> = [
      ...projectData.milestones,
      { id: generateUid(), title: '', cost: 0 }
    ]
    setProjectData({ ...projectData, milestones })
  }

  const onMilestoneChange = (
    event: InputChangeEvent,
    key: string,
    index: number
  ) => {
    const value = event.target.value
    const updatedMilestones = [...projectData.milestones]
    updatedMilestones[index][key] = value
    setProjectData({ ...projectData, milestones: updatedMilestones })
  }

  const deleteMilestone = (id: string) => {
    const milestones = projectData.milestones.filter(
      (expense: Milestone) => expense.id !== id
    )
    setProjectData({ ...projectData, milestones })
  }

  const renderTasksView = (data: Milestone, index: number) => {
    const leftInputMargin = !isTablet ? 15 : 0
    const closeButton = (
      <div
        style={
          isTablet
            ? { alignSelf: 'flex-start', marginLeft: -10 }
            : { marginLeft: 10 }
        }>
        <CloseButton onClick={() => deleteMilestone(data.id)} />
      </div>
    )
    return (
      <div className={'task-row'} key={`milestone-${data.id}`}>
        {isTablet && closeButton}
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
        {!isTablet && closeButton}
      </div>
    )
  }

  const renderMiddleView = () => {
    return (
      <div className={classes.middleView}>
        {projectData.milestones && projectData.milestones.length > 0
          ? projectData.milestones.map((data: Milestone, index: number) => {
              return renderTasksView(data, index)
            })
          : null}
        <AddMoreButton onClick={addMilestone} title={'Add Milestone'} />
      </div>
    )
  }

  return (
    <div className={classes.container}>
      {!props.isEdit ? (
        <NewProjectTitle
          title={'Set Milestone Payments.'}
          subtitle={'Get paid upon completion of each task or date.'}
        />
      ) : (
        <NewProjectTitle
          title={'Edit Milestone Payments.'}
          subtitle={'Get paid upon completion of each task or date.'}
        />
      )}
      {renderMiddleView()}
      <NewProjectFooter
        onBack={props.onBack}
        onNext={props.onNext}
        onUpdate={props.onUpdate}
        title={props.isEdit ? '' : 'Step 5 of 6'}
        projectData={projectData}
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

export default NewProjectStepFive
