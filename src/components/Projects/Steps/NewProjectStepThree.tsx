import React, { ChangeEvent, useState } from 'react'
import { makeStyles, Typography, Button } from '@material-ui/core'
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
  FLEX_END,
  NONE,
  POSITION_ABSOLUTE,
  ROW,
} from 'utils/constants/stringConstants'
import AddIcon from '@material-ui/icons/Add'
import { StretegyExpenses } from '../../../utils/types'
import AppTextField from '../../Common/Core/AppTextField'
import NewProjectFooter from '../NewProjectFooter'
import NewProjectTitle from '../NewProjectTitle'
import { useTabletLayout } from '../../../utils/hooks'

const NewProjectStepThree = (props: any) => {
  const isTablet = useTabletLayout()
  const classes = useStyles()
  const { projectData, setProjectData } = props
  const [tasksData, setTasks] = useState([1])

  const handleInputChange = (event: any, key: string) => {
    const value = event.target.value
    setProjectData({ ...projectData, [key]: value })
  }

  const addMoreClicked = () => {
    let newData: Array<number> = [...tasksData]
    newData.push(1)
    setTasks(newData)
  }

  const renderTasksView = (data: StretegyExpenses, index: number) => {
    const leftInputMargin = !isTablet ? 15 : 0
    return (
      <div className={'task-row'}>
        <div style={{ flex: 1, marginRight: leftInputMargin }}>
          <AppTextField
            type={''}
            label={`Expense ${index + 1}`}
            value={projectData.expense}
            onChange={(e: ChangeEvent) => handleInputChange(e, 'expense')}
          />
        </div>
        <div style={{ flex: 1 }}>
          <AppTextField
            type={'number'}
            label={`Estimated Cost $`}
            value={projectData.cost}
            onChange={(e: ChangeEvent) => handleInputChange(e, 'cost')}
          />
        </div>
      </div>
    )
  }

  const renderAddMoreView = () => {
    return (
      <div style={{ marginTop: isTablet ? 5 : 10 }}>
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

  const renderMiddleView = () => {
    const leftInputMargin = !isTablet ? 15 : 0
    return (
      <div className={classes.middleView}>
        <div className={'input-row'} style={{ marginBottom: 30 }}>
          <div style={{ flex: 1, marginRight: leftInputMargin }}>
            <AppTextField
              type={''}
              label={'Campaign Budget'}
              value={projectData.campaignBudget}
              onChange={(e: ChangeEvent) =>
                handleInputChange(e, 'campaignBudget')
              }
            />
          </div>
          <div style={{ flex: 1 }}>
            <AppTextField
              type={''}
              label={'Campaign Expenses'}
              value={projectData.campaignExpenses}
              onChange={(e: ChangeEvent) =>
                handleInputChange(e, 'campaignExpenses')
              }
            />
          </div>
        </div>
        <Typography variant={'caption'} className={classes.estimatedCostLabel}>
          Add your estimated cost of expenses:
        </Typography>
        {projectData.expenses && projectData.expenses.length > 0
          ? projectData.expenses.map(
              (data: StretegyExpenses, index: number) => {
                return renderTasksView(data, index)
              },
            )
          : null}
        {renderAddMoreView()}
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
      />
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
    flex: 1,
    display: FLEX,
    flexDirection: COLUMN,
  },
  textFiledContainer: {
    display: FLEX,
    flex: 0.25,
    flexDirection: ROW,
    marginTop: 20,
  },
  tasksContainer: {
    display: FLEX,
    flex: 0.25,
    flexDirection: ROW,
    marginTop: 15,
    marginBottom: 15,
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
    marginTop: 10,
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
  inputRootDes: {
    fontSize: 10,
    height: 80,
  },
  inputRoot: {
    fontSize: 10,
    height: 25,
  },
  labelRoot: {
    fontSize: 10,
    color: GREY_COLOR,
    '&$labelFocused': {
      color: PRIMARY_DARK_COLOR,
      marginTop: 2,
    },
    height: 25,
    marginTop: -5,
  },
  labelRootFilled: {
    fontSize: 10,
    color: GREY_COLOR,
    '&$labelFocused': {
      color: PRIMARY_DARK_COLOR,
      marginTop: 2,
    },
    height: 25,
    marginTop: 0,
  },
  dateRoot: {
    fontSize: 10,
    color: GREY_COLOR,
    '&$labelFocused': {
      color: PRIMARY_DARK_COLOR,
    },
    height: 25,
  },
  dateRootFilled: {
    fontSize: 10,
    color: GREY_COLOR,
    '&$labelFocused': {
      color: PRIMARY_DARK_COLOR,
    },
    height: 25,
    marginTop: 0,
  },
  labelFocused: {},
  bottomView: {
    flex: 0.1,
    display: FLEX,
    alignItems: CENTER,
  },
  stepLabel: {
    color: GREY_COLOR,
    fontSize: 10,
    marginRight: 30,
  },
  bottomLeftView: {
    flex: 0.65,
    display: FLEX,
    alignItems: CENTER,
    color: GREY_COLOR,
    fontSize: 10,
  },
  bottomRightView: {
    flex: 0.35,
    display: FLEX,
    alignItems: CENTER,
    justifyContent: FLEX_END,
  },
  estimatedCostLabel: {
    color: GREY_COLOR,
    fontSize: 10,
    marginBottom: 5,
  },
  button: {
    width: 70,
    height: 25,
    fontSize: 8,
    borderRadius: 15,
    background: 'linear-gradient(45deg, #5ea5fc 30%, #3462fc 90%)',
    textTransform: NONE,
  },
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
  addMoreButton: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
}))

export default NewProjectStepThree
