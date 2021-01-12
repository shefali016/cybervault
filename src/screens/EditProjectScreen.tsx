import React, { useCallback, useState } from 'react'
import '../App.css'
import { connect } from 'react-redux'
import { Typography, Button } from '@material-ui/core'
import Layout from '../components/Common/Layout'
import { makeStyles } from '@material-ui/core/styles'
import { AUTO, COLUMN, FLEX } from '../utils/constants/stringConstants'
import { WHITE_COLOR } from '../utils/constants/colorsConstants'
import IconMaterialEdit from '../assets/IconMaterialEdit.png'
import NewProjectModal from '../components/Projects/NewProjectModal'
import * as Types from 'utils/types'
import {
  createNewProjectRequest,
  clearNewProjectData
} from '../actions/projectActions'
import { RenderClientDetails } from '../components/Common/Widget/ClientDetailsWidget'
import { RenderTaskDetails } from '../components/Common/Widget/TaskDetailsWidget'
import { RenderProjectDetails } from '../components/Common/Widget/ProjectDetailWidget'
import { RenderExpenseDetails } from '../components/Common/Widget/ExpenseDetailsWidget'
import { RenderMilestonesDetails } from '../components/Common/Widget/MilestonesDetailWidget'
import { RenderBudgetDetails } from '../components/Common/Widget/BudgetDetailsWidget'
import Dummy from '../assets/Dummy.jpg'

import { GradiantButton } from '../components/Common/Button/GradiantButton'
// @ts-ignore
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { ImageCarousel } from '../components/Common/Carousel'

export const EditProjectScreen = (props: any) => {
  const [isClientEditable, setClientEditable] = useState(false)
  const [isProjectEditable, setProjectEditable] = useState(false)
  const [isBudgetEditable, setBudgetEditable] = useState(false)
  const classes = useStyles()
  const currentDate = new Date().toISOString().slice(0, 10)
  const projectData = {
    logo: '',
    campaignName: 'Test Campaign',
    campaignDate: currentDate,
    clientName: 'Test name',
    clientEmail: 'test@yopmail.com',
    address: '201 ST New york',
    city: 'Newyork city',
    state: 'LA',
    country: 'United states',
    campaignObjective: 'To get our own',
    campaignDeadLine: currentDate,
    description: 'Start with the game',
    tasks: [
      {
        id: '0',
        title: 'Work on',
        startDate: '23-10-2021',
        endDate: '19-09-2022'
      }
    ],
    campaignBudget: '5000',
    campaignExpenses: '1008',
    expenses: [
      {
        id: '0',
        title: 'New',
        cost: '230'
      }
    ],
    milestones: [
      {
        id: '0',
        title: 'First',
        payment: '4000'
      }
    ],
    id: '12'
  }

  const editItems = (index: number): any => {
    if (index === 1) {
      setClientEditable(true)
    } else if (index === 2) {
      setProjectEditable(true)
    } else if (index === 3) {
      setBudgetEditable(true)
    }
  }

  const [newProjectModalOpen, setNewProjectModalOpen] = useState(false)
  const openNewProjectModal = useCallback(
    () => setNewProjectModalOpen(true),
    []
  )
  const closeNewProjectModal = useCallback(
    () => setNewProjectModalOpen(false),
    []
  )
  const createNewProject = useCallback(
    (projectData) => props.createNewProject(projectData),
    []
  )

  return (
    <div className={classes.background}>
      <Layout
        actionButtonTitle={'New Project'}
        history={props.history}
        headerTitle={'Edit Project'}
        onActionButtonPress={openNewProjectModal}>
        <div className={'dashboardContainer'}>
          <div className={classes.wrapper}>
            <div style={{ marginTop: 30, marginLeft: 30 }}>
              <RenderClientDetails projectData={projectData} editInfo />
              <RenderProjectDetails projectData={projectData} editInfo />
              {projectData.tasks.length > 0 &&
              projectData.tasks[0].title.trim() !== '' ? (
                <RenderTaskDetails projectData={projectData} editInfo />
              ) : null}
              {projectData.expenses.length > 0 &&
              projectData.expenses[0].title.trim() !== '' ? (
                <RenderExpenseDetails projectData={projectData} editInfo />
              ) : null}
              {projectData.milestones.length > 0 &&
              projectData.milestones[0].title.trim() !== '' ? (
                <RenderMilestonesDetails projectData={projectData} editInfo />
              ) : null}
              <RenderBudgetDetails projectData={projectData} editInfo />
              <div style={{ marginBottom: 80 }}>
                <Typography className={classes.textColor}>
                  Upload Videos
                </Typography>
                <div className={classes.imageCorouselContainer}>
                  <Carousel>
                    {
                      //Using static data for testing
                      [1, 2, 3].map((index: number) => {
                        return (
                          <div className={classes.carouselChild}>
                            <img src={Dummy} alt='' />
                          </div>
                        )
                      })
                    }
                  </Carousel>
                </div>
              </div>
              <div>
                <Typography className={classes.textColor}>
                  Upload Photo Content
                </Typography>
                <div className={classes.imageCorouselContainer}>
                  <ImageCarousel />
                </div>
              </div>
              {/* <div className={classes.button}>
            <GradiantButton> 
              <Typography className={classes.buttonText}> Save Changes</Typography> </GradiantButton>
            </div> */}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  isLoggedIn: state.auth.isLoggedIn,
  newProjectData: state.project.projectData
})

const mapDispatchToProps = (dispatch: any) => ({
  createNewProject: (projectData: Types.Project) => {
    return dispatch(createNewProjectRequest(projectData))
  },

  clearNewProjectData: () => {
    return dispatch(clearNewProjectData())
  }
})

const useStyles = makeStyles((theme) => ({
  background: {
    display: 'grid',
    backgroundColor: '#24262B',
    height: '100%',
    width: '100%',
    overflowY: 'auto',
    overflowX: 'hidden'
  },
  generalMarginLeft: {
    marginLeft: 10,
    color: WHITE_COLOR
  },
  topCardsWrapper: {
    marginLeft: 10,
    marginTop: 20
  },
  textWrapper: {
    display: FLEX
  },
  wrapper: {
    backgroundColor: '#393939',
    width: '90%',
    display: FLEX,
    flex: 1,
    flexGrow: 1,
    flexDirection: COLUMN,
    borderRadius: 20,
    heigth: '70vh'
  },
  title: {
    fontFamily: 'Helvetica Neue',
    fontSize: 20,
    color: WHITE_COLOR,
    marginRight: 40
  },
  detailsContainer: {
    display: FLEX,
    marginLeft: 80,
    marginTop: 75,
    flexDirection: COLUMN
  },
  heading: {
    display: FLEX,
    marginTop: 40,
    marginBottom: 40
  },
  textContent: {
    fontFamily: 'Helvetica Neue',
    fontSize: 15,
    color: WHITE_COLOR,
    width: 197,
    height: 30
  },
  textContentContainer: {},
  root: {
    borderColor: '5px solid white',
    borderWidth: 5
  },
  focused: {
    //<---- see here
    backgroundColor: 'red',
    borderColor: '2px solid green',
    borderWidth: 10
  },
  imageCorouselContainer: {
    width: theme.spacing(50),
    height: theme.spacing(30),
    marginTop: 20
  },
  carouselChild: {
    width: 350,
    height: 150,
    marginLeft: 25
  },
  textColor: {
    color: 'white'
  },
  button: {
    width: 135,
    height: 40,
    display: FLEX,
    flexDirection: 'column-reverse',
    position: 'relative'
  },
  buttonText: {
    fontSize: 8
  }
}))

export default connect(mapStateToProps, mapDispatchToProps)(EditProjectScreen)
