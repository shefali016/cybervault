import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'
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
import NewProjectTitle from '../../Common/Modal/ModalTitle'
import AppTextField from '../../Common/Core/AppTextField'
import NewProjectFooter from '../NewProjectFooter'
import { InputChangeEvent, Expense } from '../../../utils/Interface'
import AddMoreButton from '../../Common/Button/MoreButton'
import { generateUid } from '../../../utils'
import CloseButton from '../../Common/Button/CloseButton'

const NewProjectStepThree = (props: any) => {
  const isTablet = useTabletLayout()
  const classes = useStyles()
  const {
    projectData,
    setProjectData,
    haveError,
    currentStep,
    isEdit,
    editExpenses,
    editBudget
  } = props

  const handleInputChange = (event: InputChangeEvent, key: string) => {
    const value = event.target.value
    setProjectData({ ...projectData, [key]: value })
  }

  const addExpense = () => {
    const expenses: Array<Expense> = [
      ...projectData.expenses,
      { id: generateUid(), title: '', cost: 0 }
    ]
    setProjectData({ ...projectData, expenses })
  }

  const handleExpenseChange = (
    event: InputChangeEvent,
    key: string,
    index: number
  ) => {
    const value = event.target.value
    const expenses = [...projectData.expenses]
    expenses[index][key] = value
    setProjectData({ ...projectData, expenses })
  }

  const deleteExpense = (id: string) => {
    const expenses = projectData.expenses.filter(
      (expense: Expense) => expense.id !== id
    )
    setProjectData({ ...projectData, expenses })
  }

  const renderTasksView = (data: Expense, index: number) => {
    const leftInputMargin = !isTablet ? 15 : 0
    const closeButton = (
      <div
        style={
          isTablet
            ? { alignSelf: 'flex-start', marginLeft: -10 }
            : { marginLeft: 10 }
        }>
        <CloseButton onClick={() => deleteExpense(data.id)} />
      </div>
    )

    const title = projectData.expenses[index].title
    const cost = projectData.expenses[index].cost

    return (
      <div className={'task-row'} key={`expense-${data.id}`}>
        {isTablet && closeButton}
        <div style={{ flex: 1, marginRight: leftInputMargin }}>
          <AppTextField
            type={''}
            label={`Expense ${index + 1}`}
            value={title}
            onChange={(e: InputChangeEvent) =>
              handleExpenseChange(e, 'title', index)
            }
            error={haveError && !title}
          />
        </div>
        <div style={{ flex: 1 }}>
          <AppTextField
            type={'number'}
            label={`Estimated Cost $`}
            value={cost}
            onChange={(e: InputChangeEvent) =>
              handleExpenseChange(e, 'cost', index)
            }
            error={haveError && !cost}
          />
        </div>
        {!isTablet && closeButton}
      </div>
    )
  }

  const renderMiddleView = () => {
    const leftInputMargin = !isTablet ? 15 : 0
    return (
      <div className={classes.middleView}>
        {(!isEdit || editBudget) && (
          <div className={'input-row'} style={{ marginBottom: 30 }}>
            <div style={{ flex: 1, marginRight: leftInputMargin }}>
              <AppTextField
                error={
                  haveError && projectData.campaignBudget === '' ? true : false
                }
                type={'number'}
                label={'Campaign Budget'}
                value={projectData.campaignBudget}
                onChange={(e: InputChangeEvent) =>
                  handleInputChange(e, 'campaignBudget')
                }
              />
            </div>
            <div style={{ flex: 1 }}>
              <AppTextField
                error={
                  haveError && projectData.campaignExpenses === ''
                    ? true
                    : false
                }
                type={'number'}
                label={'Campaign Expenses'}
                value={projectData.campaignExpenses}
                onChange={(e: InputChangeEvent) =>
                  handleInputChange(e, 'campaignExpenses')
                }
              />
            </div>
          </div>
        )}

        {(!isEdit || editExpenses) && (
          <React.Fragment>
            <Typography
              variant={'caption'}
              className={classes.estimatedCostLabel}>
              Add your estimated cost of expenses:
            </Typography>

            {projectData.expenses && projectData.expenses.length > 0
              ? projectData.expenses.map((data: Expense, index: number) => {
                  return renderTasksView(data, index)
                })
              : null}

            <AddMoreButton onClick={addExpense} title={'Add Expense'} />
          </React.Fragment>
        )}
      </div>
    )
  }

  return (
    <div className={classes.container}>
      <NewProjectTitle
        title={'Budget & expenses.'}
        subtitle={'Set your campaign budget & estimated expenses.'}
      />
      {renderMiddleView()}
      <NewProjectFooter
        title={'Step 3 of 5'}
        onNext={props.onNext}
        onBack={props.onBack}
        description={
          '*This will be added to the final invoice sent to client. The campaign budget will be the total amount due to the client. You can go back and edit this page again if needed.'
        }
        isEdit={props.isEdit}
        projectData={projectData}
        onUpdate={props.onUpdate}
        haveError={haveError ? haveError : false}
        currentStep={currentStep}
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
    flexDirection: COLUMN,
    justifyContent: 'flex-start'
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
  bottomView: {
    flex: 0.1,
    display: FLEX,
    alignItems: CENTER
  },
  stepLabel: {
    color: GREY_COLOR,
    fontSize: 10,
    marginRight: 30
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
  estimatedCostLabel: {
    color: GREY_COLOR,
    fontSize: 10,
    marginBottom: 5
  },
  button: {
    width: 70,
    height: 25,
    fontSize: 8,
    borderRadius: 15,
    background: 'linear-gradient(45deg, #5ea5fc 30%, #3462fc 90%)',
    textTransform: NONE
  },
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

export default NewProjectStepThree
