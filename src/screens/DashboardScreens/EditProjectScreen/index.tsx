/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useCallback,
  useState,
  useEffect,
  useContext,
  Fragment
} from 'react'
import { connect, TypedUseSelectorHook } from 'react-redux'
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
import { getDownloadUrl, uploadMedia } from '../../../apis/assets'
import { generateUid } from '../../../utils/index'
import { getImageObject } from 'utils/helpers'
import { ToastContext } from 'context/Toast'
import { renderImageCarousel, renderVideoCarousel } from './UploadMedia'
import '../../../App.css'
import { Project, ProjectAsset } from 'utils/Interface'
import ReactLoading from 'react-loading'

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
  showTostify: boolean
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
    projectId: '',
    showTostify: false
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
    console.log('In use Effect')

    const { projectDetails, isUpdatedSuccess, projectUpdateError } = props
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
    if (!isUpdatedSuccess && projectUpdateError) {
      toastContext.showToast({
        title: projectUpdateError,
        type: 'error',
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

  const onImageUpload = async (files: Array<File>) => {
    const { projectData } = state
    setState({ ...state, isImageLoading: true })
    for (let index = 0; index < files.length; index++) {
      let imageAssets: ProjectAsset = {
        type: 'image',
        files: [],
        fileName: '',
        id: ''
      }
      const file: File = files[index]
      const id = generateUid()
      await uploadMedia(id, file)
      const downloadUrl = await getDownloadUrl(id)
      // @ts-ignore
      imageAssets.files.push(getImageObject(file, downloadUrl, id))
      if (projectData.images && !projectData.images.length) {
        imageAssets.fileName = file.name
      } else {
        imageAssets.fileName =
          projectData.images && projectData.images.length
            ? projectData.images[0].fileName
            : ''
      }
      projectData.images.push(imageAssets)

      setState({
        ...state,
        projectData,
        isImageLoading: false
      })
    }
  }

  //Video File Upload
  const onVideoUpload = async (files: Array<File>) => {
    const { projectData } = state

    setState({ ...state, isVideoLoading: true })
    for (let index = 0; index < files.length; index++) {
      let videoAssets: ProjectAsset = {
        type: 'image',
        files: [],
        fileName: '',
        id: ''
      }
      const file: File = files[index]
      const id = generateUid()
      await uploadMedia(id, file)
      const downloadUrl = await getDownloadUrl(id)
      // @ts-ignore
      videoAssets.files.push(getImageObject(file, downloadUrl, id))
      if (projectData.videos && !projectData.videos.length) {
        videoAssets.fileName = file.name
      } else {
        videoAssets.fileName = projectData.videos[0].fileName
      }
      projectData.videos.push(videoAssets)

      setState({
        ...state,
        projectData,
        isVideoLoading: false
      })
    }
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
    props.updateProjectDetails(projectData)
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
        {state.projectData.tasks &&
        state.projectData.tasks.length > 0 &&
        state.projectData.tasks[0].title.trim() !== '' ? (
          <RenderTaskDetails
            projectData={state.projectData}
            editInfo
            onEdit={() => openEditProjectModal(2, true, false, false, false)}
          />
        ) : null}
        {state.projectData.expenses &&
        state.projectData.expenses.length > 0 &&
        state.projectData.expenses[0].title.trim() !== '' ? (
          <RenderExpenseDetails
            projectData={state.projectData}
            editInfo
            onEdit={() => openEditProjectModal(3, false, false, true, false)}
          />
        ) : null}
        {state.projectData.milestones &&
        state.projectData.milestones.length > 0 &&
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
        {!props.isProjectDetailsLoading ? (
          <Fragment>
            {renderProjectDetails()}
            {renderVideoCarousel({
              uploadVideoContainer: classes.uploadVideoContainer,
              textColor: classes.textColor,
              videoCorouselContainer: classes.videoCorouselContainer,
              onVideoUpload: onVideoUpload,
              video:
                state.projectData &&
                state.projectData.videos &&
                state.projectData.videos.length
                  ? state.projectData.videos
                  : [],
              isVideoLoading: state.isVideoLoading,
              generalMarginTop: classes.generalMarginTop
            })}
            {renderImageCarousel({
              textColor: classes.textColor,
              imageCorouselContainer: classes.imageCorouselContainer,
              image:
                state.projectData &&
                state.projectData.images &&
                state.projectData.images.length
                  ? state.projectData.images
                  : [],
              generalMarginTop: classes.generalMarginTop,
              onImageUpload: (file: Array<File>) => onImageUpload(file),
              isImageLoading: state.isImageLoading,
              button: classes.button,
              handleUpdateProject: handleUpdateProject,
              buttonText: classes.buttonText,
              updateDetails: props.updateDetails
            })}
          </Fragment>
        ) : (
          <ReactLoading
            type={'bubbles'}
            color={'#fff'}
            className={classes.loader}
          />
        )}
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
  userData: state.auth,
  updateDetails: state.project.updateDetails,
  isProjectDetailsLoading: state.project.isProjectDetailsLoading,
  projectUpdateError: state.project.projectUpdateError
})

const mapDispatchToProps = (dispatch: any) => ({
  getProjectDetails: (account: Account, projectId: string | undefined) => {
    return dispatch(requestGetProjectDetails(account, projectId))
  },
  updateProjectDetails: (projectData: Project) => {
    return dispatch(requestUpdateProjectDetails(projectData))
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
  },
  loader: {
    margin: '0 auto'
  }
}))

export default connect(mapStateToProps, mapDispatchToProps)(EditProjectScreen)
