import React, { useCallback, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { COLUMN, FLEX, FLEX_END } from '../../utils/constants/stringConstants'
import { WHITE_COLOR } from '../../utils/constants/colorsConstants'
import NewProjectModal from '../../components/Projects/NewProjectModal'
import * as Types from 'utils/types'

import {
  createNewProjectRequest,
  requestGetProjectDetails,
  requestUpdateProjectDetails
} from '../../actions/projectActions'
import { RenderClientDetails } from '../../components/Common/Widget/ClientDetailsWidget'
import { RenderTaskDetails } from '../../components/Common/Widget/TaskDetailsWidget'
import { RenderProjectDetails } from '../../components/Common/Widget/ProjectDetailWidget'
import { RenderExpenseDetails } from '../../components/Common/Widget/ExpenseDetailsWidget'
import { RenderMilestonesDetails } from '../../components/Common/Widget/MilestonesDetailWidget'
import { RenderBudgetDetails } from '../../components/Common/Widget/BudgetDetailsWidget'
import { DragAndDropUploader } from '../../components/Common/DragAndDropFileUpload'
import { GradiantButton } from '../../components/Common/Button/GradiantButton'
import { ImageCarousel } from '../../components/Common/Carousel'
import EditProjectModal from '../../components/EditProjectModel'
import ProjectStatusIndicator from '../../components/Common/ProjectStatusIndicator'
import { renderDevider } from '../../components/ProjectInfoDisplay/renderDetails'

import { getDefaultProjectData } from '../../utils'
import { getDownloadUrl, uploadMedia } from '../../apis/assets'
import { generateUid } from '../../utils/index'

const EditProjectScreen = (props: any) => {
  const classes = useStyles()
  const [projectData, setProjectData] = useState(getDefaultProjectData())
  const [newProjectModalOpen, setNewProjectModalOpen] = useState(false)
  const [editProjectModalOpen, setEditProjectModalOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isExpenseEdit, setExpenseEdit] = useState(false)
  const [isCampaignEdit, setCampaignEdit] = useState(false)
  const [isTaskEdit, setTaskEdit] = useState(false)
  const [isBudgetEdit, setBudgetEdit] = useState(false)
  const [isImageLoading, setImageLoading] = useState(false)
  const [isVideoLoading, setVideoLoading] = useState(false)
  const [projectId, setProjectId] = useState('')

  console.log('>>>>>>>>>>>>>Props', props)

  const openNewProjectModal = useCallback(
    () => setNewProjectModalOpen(true),
    []
  )

  const closeNewProjectModal = useCallback(
    () => setNewProjectModalOpen(false),
    []
  )

  const createNewProject = useCallback(
    (projectData) =>
      props.createNewProject(projectData, props.userData.account),
    []
  )

  const openEditProjectModal = (
    currentStep: number,
    isTaskEdit?: boolean,
    isCampaignEdit?: boolean,
    isExpensesEdit?: boolean,
    isBudgetEdit?: boolean
  ) => {
    setEditProjectModalOpen(true)
    setCurrentStep(currentStep)
    setCampaignEdit(Boolean(isCampaignEdit))
    setTaskEdit(Boolean(isTaskEdit))
    setExpenseEdit(Boolean(isExpensesEdit))
    setBudgetEdit(Boolean(isBudgetEdit))
  }

  const closeEditProjectModal = useCallback(
    () => setEditProjectModalOpen(false),
    []
  )

  const modifyProjectData = (updatedData: any) => {
    setProjectData({ ...updatedData })
  }

  const onSaveChanges = () => {
    //console.log('Project data ===', projectData);
  }

  const getImageObject = (file: any, url: string, id: string) => {
    return {
      id: id,
      original: true,
      url: url,
      width: 50,
      height: 50
    }
  }
  // For geting project details
  useEffect(() => {
    if (window.location.search) {
      const projectId = window.location.search.split(':')
      setProjectId(projectId[1])
      props.getProjectDetails(props.userData.account, projectId[1])
      console.log(window.location, projectId)
    }
  }, [])

  // Fetched Project Details
  useEffect(() => {
    const { projectDetails } = props
    if (projectDetails) {
      setProjectData(projectDetails)
    }
  }, [props.projectDetails])

  useEffect(() => {
    if (window.location.search) {
      const projectId = window.location.search.split(':')
      setProjectId(projectId[1])
      props.getProjectDetails(props.userData.account, projectId[1])
      console.log(window.location, projectId)
    }
  }, [])

  // Fetched Project Details
  useEffect(() => {
    const { projectDetails } = props
    if (projectDetails) {
      setProjectData(projectDetails)
    }
  }, [props.projectDetails])

  const onImageUpload = async (file: any) => {
    if (projectData.images && !projectData.images.length) {
      setImageLoading(true)
    } else {
      setImageLoading(false)
    }
    const id = generateUid()
    await uploadMedia(id, file)
    const downloadUrl = await getUrl(id)
    // @ts-ignore
    projectData.images.push(getImageObject(file, downloadUrl, id))
    setProjectData(projectData)
  }

  const onVideoUpload = async (file: any) => {
    if (projectData.videos && !projectData.videos.length) {
      setVideoLoading(true)
    } else {
      setVideoLoading(false)
    }
    const id = generateUid()
    await uploadMedia(id, file)
    const downloadUrl = await getUrl(id)
    // @ts-ignore
    projectData.videos.push(getImageObject(file, downloadUrl, id))
    setProjectData(projectData)
  }

  const getUrl = async (id: string) => {
    const url = await getDownloadUrl(id)
    return url
  }

  const editProject = (projectData: any) => {
    modifyProjectData(projectData)
    closeEditProjectModal()
  }

  const renderHeader = () => {
    return (
      <div className={classes.headText}>
        <Typography> Status : {'In Progress'}</Typography>
        <ProjectStatusIndicator status={'In progress'} />
      </div>
    )
  }

  //submit project details update
  const handleUpdateProject = () => {
    console.log('>>>>>>>>>>>>>>>>>>>>>Project data', projectData)
    props.updateProjectDetails(props.userData.account, projectData)
  }

  const renderImageCarousel = () => {
    return (
      <>
        <Typography className={classes.textColor}>
          Upload Photo Content
        </Typography>
        <div style={{ display: FLEX }}>
          <div className={classes.imageCorouselContainer}>
            <ImageCarousel source={projectData.images} />
          </div>
          <div className={classes.generalMarginTop}>
            <DragAndDropUploader
              onSubmit={onImageUpload}
              isLoading={isImageLoading}
            />
          </div>
        </div>
        <div className={classes.button}>
          <GradiantButton
            onClick={() => handleUpdateProject()}
            width={135}
            height={40}>
            <Typography className={classes.buttonText} onClick={onSaveChanges}>
              {' '}
              Save Changes
            </Typography>
          </GradiantButton>
        </div>
      </>
    )
  }

  const renderVideoCarousel = () => {
    return (
      <div className={classes.uploadVideoContainer}>
        <Typography className={classes.textColor}>Upload Videos</Typography>
        <div style={{ display: FLEX }}>
          <div className={classes.videoCorouselContainer}>
            <ImageCarousel isVideo source={projectData.videos} />
          </div>
          <div className={classes.generalMarginTop}>
            <DragAndDropUploader
              isVideo
              onSubmit={onVideoUpload}
              isLoading={isVideoLoading}
            />
          </div>
        </div>
        {renderDevider({ editInfo: true })}
      </div>
    )
  }

  const renderProjectDetails = () => {
    return (
      <div>
        <RenderClientDetails
          projectData={projectData}
          editInfo
          onEdit={() => openEditProjectModal(1)}
        />
        <RenderProjectDetails
          projectData={projectData}
          editInfo
          onEdit={() => openEditProjectModal(2, false, true, false, false)}
        />
        {projectData.tasks.length > 0 &&
        projectData.tasks[0].title.trim() !== '' ? (
          <RenderTaskDetails
            projectData={projectData}
            editInfo
            onEdit={() => openEditProjectModal(2, true, false, false, false)}
          />
        ) : null}
        {projectData.expenses.length > 0 &&
        projectData.expenses[0].title.trim() !== '' ? (
          <RenderExpenseDetails
            projectData={projectData}
            editInfo
            onEdit={() => openEditProjectModal(3, false, false, true, false)}
          />
        ) : null}
        {projectData.milestones.length > 0 &&
        projectData.milestones[0].title.trim() !== '' ? (
          <RenderMilestonesDetails
            projectData={projectData}
            editInfo
            onEdit={() => openEditProjectModal(4)}
          />
        ) : null}
        <RenderBudgetDetails
          projectData={projectData}
          editInfo
          onEdit={() => openEditProjectModal(3, false, false, false, true)}
        />
      </div>
    )
  }

  const renderBody = () => {
    return (
      <div className={classes.detailsWrapper}>
        {renderProjectDetails()}
        {renderVideoCarousel()}
        {renderImageCarousel()}
      </div>
    )
  }

  const renderEditProjectModel = () => {
    return (
      <EditProjectModal
        open={editProjectModalOpen}
        currentStep={currentStep}
        onRequestClose={closeEditProjectModal}
        onSubmitClicked={editProject}
        isTaskEdit={isTaskEdit}
        isCampaignEdit={isCampaignEdit}
        isExpensesEdit={isExpenseEdit}
        isBudgetEdit={isBudgetEdit}
        projectData={projectData}
      />
    )
  }

  return (
    <div>
      <NewProjectModal
        open={newProjectModalOpen}
        onRequestClose={closeNewProjectModal}
        onSubmitClicked={createNewProject}
      />
      {renderEditProjectModel()}
      <div className={classes.dashboardContainer}>
        <div className={classes.wrapper}>
          {renderHeader()}
          {renderBody()}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  isLoggedIn: state.auth.isLoggedIn,
  newProjectData: state.project.projectData,
  projectDetails: state.project.projectDetails,
  userData: state.auth
})

const mapDispatchToProps = (dispatch: any) => ({
  createNewProject: (projectData: Types.Project, account: Account) => {
    return dispatch(createNewProjectRequest(projectData, account))
  },
  getProjectDetails: (account: Account, projectId: string | undefined) => {
    return dispatch(requestGetProjectDetails(account, projectId))
  },
  updateProjectDetails: (account: Account, projectData: Object | undefined) => {
    return dispatch(requestUpdateProjectDetails(account, projectData))
  }
})

const useStyles = makeStyles((theme) => ({
  dashboardContainer: {},
  generalMarginLeft: {
    marginLeft: 10,
    color: theme.palette.common.white
  },
  topCardsWrapper: {
    marginLeft: 10,
    marginTop: 20
  },
  textWrapper: {
    display: FLEX
  },
  wrapper: {
    backgroundColor: theme.palette.background.secondary,
    display: FLEX,
    flex: 1,
    flexGrow: 1,
    flexDirection: COLUMN,
    borderRadius: 20,
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5)
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
    marginTop: 20,
    marginRight: 210
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
    display: FLEX,
    justifyContent: 'flex-end',
    marginBottom: 20,
    marginRight: 20
  },
  buttonText: {
    fontSize: 8
  },
  videoCorouselContainer: {
    width: theme.spacing(50),
    height: theme.spacing(30),
    marginTop: 20,
    marginRight: 210
  },
  headText: {
    display: FLEX,
    justifyContent: FLEX_END,
    color: 'white',
    marginTop: 20,
    marginRight: 20
  },
  detailsWrapper: {
    marginTop: 30,
    marginLeft: 30
  },
  generalMarginTop: {
    marginTop: 40
  },
  uploadVideoContainer: {
    marginBottom: 40
  }
}))

export default connect(mapStateToProps, mapDispatchToProps)(EditProjectScreen)
