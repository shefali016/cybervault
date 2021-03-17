import React from 'react'
import { makeStyles, Button } from '@material-ui/core'
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
import NewProjectTitle from '../../Common/Modal/ModalTitle'
import NewProjectFooter from '../NewProjectFooter'
import { RenderClientDetails } from '../../Common/Widget/ClientDetailsWidget'
import { RenderTaskDetails } from '../../Common/Widget/TaskDetailsWidget'
import { RenderProjectDetails } from '../../Common/Widget/ProjectDetailWidget'
import { RenderExpenseDetails } from '../../Common/Widget/ExpenseDetailsWidget'
import { RenderMilestonesDetails } from '../../Common/Widget/MilestonesDetailWidget'
import { RenderBudgetDetails } from '../../Common/Widget/BudgetDetailsWidget'

const NewProjectStepFive = (props: any) => {
  const classes = useStyles()
  const { projectData, onSubmit, currentStep, clientData } = props

  const renderClientLogoView = () => {
    return (
      <div className={'client-logo-container'}>
        <Button variant='contained' className={classes.clientLogo}>
          {!!clientData.logo && (
            <img
              src={clientData.logo}
              className={classes.clientLogoImg}
              alt={'client-logo'}
            />
          )}
        </Button>
      </div>
    )
  }

  const renderMiddleView = () => {
    return (
      <div className={classes.middleView}>
        <RenderClientDetails clientData={clientData} />

        <RenderProjectDetails projectData={projectData} />

        {projectData?.tasks?.length > 0 && (
          <RenderTaskDetails projectData={projectData} />
        )}

        {projectData?.expenses?.length > 0 && (
          <RenderExpenseDetails projectData={projectData} />
        )}

        {projectData?.milestones?.length > 0 && (
          <RenderMilestonesDetails projectData={projectData} />
        )}

        <RenderBudgetDetails projectData={projectData} />
      </div>
    )
  }

  return (
    <div className={classes.container}>
      <NewProjectTitle title={'New Project'} subtitle={'Review Details'} />
      {renderClientLogoView()}
      {renderMiddleView()}
      <NewProjectFooter
        title={'Step 5 of 5'}
        onStartProject={onSubmit}
        onBack={props.onBack}
        isLoading={props.isLoading}
        currentStep={currentStep}
        isEdit={props.isEdit}
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
    backgroundColor: TRANSPARENT
  },
  clientLogoImg: {
    height: 80,
    width: 80,
    borderRadius: 40,
    position: POSITION_ABSOLUTE
  },
  detailsHeaderTitle: {
    fontSize: 20,
    color: GREY_COLOR
  },
  middleView: {
    flex: 1,
    display: FLEX,
    flexDirection: COLUMN,
    [theme.breakpoints.down('sm')]: {
      paddingBottom: 30
    }
  },
  textFiledContainer: {
    display: FLEX,
    flex: 0.25,
    flexDirection: ROW,
    marginTop: 20
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

export default NewProjectStepFive
