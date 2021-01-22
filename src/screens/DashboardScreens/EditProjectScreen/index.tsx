/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState, useEffect, useContext } from 'react'
import { connect } from 'react-redux'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {
  COLUMN,
  FLEX,
  FLEX_END
} from '../../../utils/constants/stringConstants'
import { WHITE_COLOR } from '../../../utils/constants/colorsConstants'
import {
  requestGetProjectDetails,
  requestUpdateProjectDetails
} from '../../../actions/projectActions'
import { RenderClientDetails } from '../../../components/Common/Widget/ClientDetailsWidget'
import { RenderTaskDetails } from '../../../components/Common/Widget/TaskDetailsWidget'
import { RenderProjectDetails } from '../../../components/Common/Widget/ProjectDetailWidget'
import { RenderExpenseDetails } from '../../../components/Common/Widget/ExpenseDetailsWidget'
import { RenderMilestonesDetails } from '../../../components/Common/Widget/MilestonesDetailWidget'
import { RenderBudgetDetails } from '../../../components/Common/Widget/BudgetDetailsWidget'
import EditProjectModal from 'components/EditProjectModel'
import ProjectStatusIndicator from '../../../components/Common/ProjectStatusIndicator'
import {
  getDownloadUrl,
  updateProjectAssets,
  uploadMedia
} from '../../../apis/assets'
import { generateUid } from '../../../utils/index'
import { getImageObject } from 'utils/helpers'
import { ToastContext } from 'context/Toast'
import { renderImageCarousel, renderVideoCarousel } from './UploadMedia'
import '../../../App.css'

type EditProjectStates = {
  projectData: Object | any
  editProjectModalOpen: boolean
  currentStep: number
  isExpensesEdit: boolean | undefined
  isCampaignEdit: boolean | undefined
  isTaskEdit: boolean | undefined
  isBudgetEdit: boolean | undefined
  isImageLoading: boolean | undefined
  isVideoLoading: boolean | undefined
  projectId: string
}

const EditProjectScreen = (props: any) => {
  const classes = useStyles()
  const toastContext = useContext(ToastContext)

  const [state, setState] = useState<EditProjectStates>({
    projectData: props.projectDetails,
    editProjectModalOpen: false,
    currentStep: 0,
    isExpensesEdit: false,
    isCampaignEdit: false,
    isTaskEdit: false,
    isBudgetEdit: false,
    isImageLoading: false,
    isVideoLoading: false,
    projectId: ''
  })

  const openEditProjectModal = (
    currentStep: number,
    isTaskEdit?: boolean,
    isCampaignEdit?: boolean,
    isExpensesEdit?: boolean,
    isBudgetEdit?: boolean
  ) => {
    setState({
      ...state,
      editProjectModalOpen: true,
      currentStep,
      isCampaignEdit,
      isTaskEdit,
      isExpensesEdit,
      isBudgetEdit
    })
  }

  const closeEditProjectModal = useCallback(
    () => setState({ ...state, editProjectModalOpen: false }),
    []
  )

  // Fetched Project Details
  useEffect(() => {
    const { projectDetails, isUpdatedSuccess } = props
    if (projectDetails) {
      setState({
        ...state,
        projectData: projectDetails
      })
    }
    if (isUpdatedSuccess) {
      toastContext.showToast({
        title: 'Project data updated successfully!',
        type: 'success',
        duration: 3000
      })
    }
  }, [props.projectDetails, props.isUpdatedSuccess])

  useEffect(() => {
    const { location, userData, getProjectDetails } = props
    if (location.search) {
      const projectId = location.search.split(':')
      setState({ ...state, projectId: projectId[1] })
      getProjectDetails(userData.account, projectId[1])
    }
  }, [])

  const onImageUpload = async (file: File) => {
    const { projectData } = state
    if (projectData.image && !projectData.image.length) {
      setState({ ...state, isImageLoading: true })
    } else {
      setState({ ...state, isImageLoading: false })
    }
    const id = generateUid()
    await uploadMedia(id, file)
    const downloadUrl = await getDownloadUrl(id)
    // @ts-ignore
    projectData.image.push(getImageObject(file, downloadUrl, id))
    setState({
      ...state,
      projectData: projectData
    })
  }

  const onVideoUpload = async (file: any) => {
    const { projectData } = state
    if (projectData.video && !projectData.video.length) {
      setState({ ...state, isVideoLoading: true })
    } else {
      setState({ ...state, isVideoLoading: false })
    }
    const id = generateUid()
    await uploadMedia(id, file)
    const downloadUrl = await getDownloadUrl(id)
    // @ts-ignore
    projectData.video.push(getImageObject(file, downloadUrl, id))
    setState({
      ...state,
      projectData: projectData
    })
  }

  const editProject = (projectData: any) => {
    setState({
      ...state,
      projectData: projectData,
      editProjectModalOpen: false
    })
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
  const handleUpdateProject = async () => {
    const { projectData } = state
    const { userData } = props
    if (projectData.image && projectData.image.length) {
      await updateProjectAssets(
        userData.account,
        projectData.image,
        'image',
        projectData.campaignName,
        generateUid()
      )
    }
    props.updateProjectDetails(props.userData.account, state.projectData)
  }

  const renderProjectDetails = () => {
    return (
      <div>
        <RenderClientDetails
          projectData={state.projectData}
          editInfo
          onEdit={() => openEditProjectModal(1)}
        />
        <RenderProjectDetails
          projectData={state.projectData}
          editInfo
          onEdit={() => openEditProjectModal(2, false, true, false, false)}
        />
        {state.projectData.tasks.length > 0 &&
        state.projectData.tasks[0].title.trim() !== '' ? (
          <RenderTaskDetails
            projectData={state.projectData}
            editInfo
            onEdit={() => openEditProjectModal(2, true, false, false, false)}
          />
        ) : null}
        {state.projectData.expenses.length > 0 &&
        state.projectData.expenses[0].title.trim() !== '' ? (
          <RenderExpenseDetails
            projectData={state.projectData}
            editInfo
            onEdit={() => openEditProjectModal(3, false, false, true, false)}
          />
        ) : null}
        {state.projectData.milestones.length > 0 &&
        state.projectData.milestones[0].title.trim() !== '' ? (
          <RenderMilestonesDetails
            projectData={state.projectData}
            editInfo
            onEdit={() => openEditProjectModal(4)}
          />
        ) : null}
        <RenderBudgetDetails
          projectData={state.projectData}
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
        {renderVideoCarousel({
          uploadVideoContainer: classes.uploadVideoContainer,
          textColor: classes.textColor,
          videoCorouselContainer: classes.videoCorouselContainer,
          onVideoUpload: onVideoUpload,
          video: state.projectData.video,
          isVideoLoading: state.isVideoLoading,
          generalMarginTop: classes.generalMarginTop
        })}
        {renderImageCarousel({
          textColor: classes.textColor,
          imageCorouselContainer: classes.imageCorouselContainer,
          image: state.projectData.image,
          generalMarginTop: classes.generalMarginTop,
          onImageUpload: (file: File) => onImageUpload(file),
          isImageLoading: state.isImageLoading,
          button: classes.button,
          handleUpdateProject: handleUpdateProject,
          buttonText: classes.buttonText
        })}
      </div>
    )
  }

  const renderEditProjectModel = () => {
    return (
      <EditProjectModal
        open={state.editProjectModalOpen}
        currentStep={state.currentStep}
        onRequestClose={closeEditProjectModal}
        onSubmitClicked={editProject}
        isTaskEdit={state.isTaskEdit}
        isCampaignEdit={state.isCampaignEdit}
        isExpensesEdit={state.isExpensesEdit}
        isBudgetEdit={state.isBudgetEdit}
        projectData={state.projectData}
      />
    )
  }

  return (
    <div>
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
  isUpdatedSuccess: state.project.isUpdatedSuccess,
  userData: state.auth
})

const mapDispatchToProps = (dispatch: any) => ({
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
