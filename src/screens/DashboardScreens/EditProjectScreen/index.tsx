import React, {
  useCallback,
  useState,
  useEffect,
  useContext,
  Fragment
} from 'react'
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
import { addProjectAssets, setMedia } from '../../../apis/assets'
import { generateUid } from '../../../utils/index'
import { getImageObject } from 'utils/helpers'
import { ToastContext } from 'context/Toast'
import { AssetUploadDisplay } from './UploadMedia'
import '../../../App.css'
import { Project, ProjectAsset } from 'utils/Interface'
import ReactLoading from 'react-loading'
import { useOnChange } from 'utils/hooks'

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

  useOnChange(props.isUpdatedSuccess, (success) => {
    if (success) {
      toastContext.showToast({
        title: 'Project data updated successfully!',
        type: 'success'
      })
    }
  })

  useOnChange(props.projectUpdateError, (error) => {
    if (error) {
      toastContext.showToast({
        title: 'Failed to update project'
      })
    }
  })

  useEffect(() => {
    const { location, getProjectDetails } = props
    if (location.search) {
      const projectId = location.search.split(':')
      getProjectDetails(projectId[1])
    }
  }, [])

  const onAssetUpload = (type: 'image' | 'video') => async (file: File) => {
    try {
      const { account } = props

      setState({
        ...state,
        [type === 'image' ? 'isImageLoading' : 'isVideoLoading']: true
      })

      console.log(file)

      const asset: ProjectAsset = {
        type,
        files: [],
        fileName: file.name,
        id: generateUid()
      }
      const downloadUrl = await setMedia(asset.id, file)

      if (typeof downloadUrl === 'string') {
        asset.files.push(getImageObject(file, downloadUrl, asset.id))
        await addProjectAssets(account.id, asset)

        const project = Object.assign(
          state.projectData,
          type === 'image'
            ? { images: [...state.projectData.images, asset.id] }
            : { videos: [...state.projectData.videos, asset.id] }
        )

        setState({
          ...state,
          projectData: project,
          isVideoLoading: false
        })

        props.updateProjectDetails(project)
      } else {
        throw Error('Download url is not a string')
      }
    } catch (error) {
      console.log('Asset upload failed.', error)
      toastContext.showToast({ title: `Failed to upload ${type}` })
    }
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
  const handleUpdateProject = async (projectData: Project) => {
    setState({
      ...state,
      editProjectModalOpen: false
    })
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
        {state.projectData &&
        state.projectData.tasks &&
        state.projectData.tasks.length > 0 &&
        state.projectData.tasks[0].title.trim() !== '' ? (
          <RenderTaskDetails
            projectData={state.projectData}
            editInfo
            onEdit={() => openEditProjectModal(2, true, false, false, false)}
          />
        ) : null}
        {state.projectData &&
        state.projectData.expenses &&
        state.projectData.expenses.length > 0 &&
        state.projectData.expenses[0].title.trim() !== '' ? (
          <RenderExpenseDetails
            projectData={state.projectData}
            editInfo
            onEdit={() => openEditProjectModal(3, false, false, true, false)}
          />
        ) : null}
        {state.projectData &&
        state.projectData.milestones &&
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
            <AssetUploadDisplay
              {...{
                containerClassName: classes.uploadVideoContainer,
                onUpload: onAssetUpload('video'),
                assetIds: state.projectData.videos,
                accountId: props.account.id,
                isLoading: state.isVideoLoading,
                title: 'Videos',
                isVideo: true
              }}
            />
            <AssetUploadDisplay
              {...{
                containerClassName: classes.uploadVideoContainer,
                onUpload: onAssetUpload('image'),
                assetIds: state.projectData.images,
                accountId: props.account.id,
                isLoading: state.isVideoLoading,
                title: 'Images'
              }}
            />
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
        onSubmitClicked={handleUpdateProject}
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
  updateDetails: state.project.updateDetails,
  isProjectDetailsLoading: state.project.isProjectDetailsLoading,
  projectUpdateError: state.project.projectUpdateError,
  account: state.auth.account
})

const mapDispatchToProps = (dispatch: any) => ({
  getProjectDetails: (projectId: string) => {
    return dispatch(requestGetProjectDetails(projectId))
  },
  updateProjectDetails: (projectData: Project) => {
    return dispatch(requestUpdateProjectDetails(projectData))
  }
})

const useStyles = makeStyles((theme) => ({
  dashboardContainer: {},
  wrapper: {
    backgroundColor: theme.palette.background.secondary,
    display: FLEX,
    flex: 1,
    flexGrow: 1,
    flexDirection: COLUMN,
    borderRadius: 20,
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
    padding: theme.spacing(6),
    marginBottom: theme.spacing(5)
  },
  headText: {
    display: FLEX,
    justifyContent: FLEX_END,
    color: 'white'
  },
  detailsWrapper: {
    marginTop: 30
  },
  uploadVideoContainer: {},
  loader: {
    margin: '0 auto'
  }
}))

export default connect(mapStateToProps, mapDispatchToProps)(EditProjectScreen)
