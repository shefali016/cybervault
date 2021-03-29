import React, { useMemo, useContext } from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import { TRANSPARENT, GREY_COLOR } from 'utils/constants/colorsConstants'
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
import NewProjectTitle from '../../Common/Modal/ModalTitle'
import AppTextField from '../../Common/Core/AppTextField'
import NewProjectFooter from '../NewProjectFooter'
import { InputChangeEvent } from '../../../utils/Interface'
import AddMoreButton from '../../Common/Button/MoreButton'
import { generateUid, numberWithCommas } from '../../../utils'
import CloseButton from '../../Common/Button/CloseButton'
import { useTheme } from '@material-ui/core/styles'
import { ToastContext } from 'context/Toast'

const NewProjectStepFour = (props: any) => {
  const isTablet = useTabletLayout()
  const classes = useStyles()
  const theme = useTheme()
  const toastContext = useContext(ToastContext)
  const { projectData, setProjectData, currentStep, haveError, account } = props

  const addMilestone = () => {
    const milestones: Array<Milestone> = [
      ...projectData.milestones,
      { id: generateUid(), title: '', payment: 0 }
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

  const totalMilestoneCost = useMemo(() => {
    return projectData.milestones.reduce(
      (acc: number, milestone: Milestone) => acc + Number(milestone.payment),
      0
    )
  }, [projectData.milestones])

  const validateMilestones = () => {
    if (totalMilestoneCost > projectData.campaignBudget) {
      toastContext.showToast({
        title: 'Your milestones exeed the project budget.'
      })
      return false
    }
    return true
  }

  const handleNext = () => {
    if (validateMilestones()) {
      props.onNext()
    }
  }

  const handleUpdate = () => {
    if (validateMilestones()) {
      props.onUpdate()
    }
  }

  const renderMilstone = (data: Milestone, index: number) => {
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

    const title = projectData.milestones[index].title
    const payment = projectData.milestones[index].payment

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
            error={haveError && !title}
          />
        </div>
        <div style={{ flex: 1 }}>
          <AppTextField
            type={'number'}
            label={`Payment`}
            value={payment}
            onChange={(e: InputChangeEvent) =>
              onMilestoneChange(e, 'payment', index)
            }
            error={haveError && !payment}
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
              return renderMilstone(data, index)
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
      <div className={classes.budgetContainer}>
        <Typography variant='h6'>Remaining budget</Typography>
        <Typography
          variant='h4'
          style={
            totalMilestoneCost > projectData.campaignBudget
              ? { color: theme.palette.error.main }
              : {}
          }
          color='inherit'>
          {account.region.currencySymbol}
          {numberWithCommas(projectData.campaignBudget - totalMilestoneCost)}
        </Typography>
      </div>
      {renderMiddleView()}
      <NewProjectFooter
        onBack={props.onBack}
        onNext={handleNext}
        onUpdate={handleUpdate}
        title={'Step 4 of 5'}
        isEdit={props.isEdit}
        projectData={projectData}
        currentStep={currentStep}
      />
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  budgetContainer: { paddingBottom: theme.spacing(2) },
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
  moreButton: {
    width: 120,
    height: 30,
    fontSize: 8,
    borderRadius: 20,
    textTransform: NONE
  },
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
