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
import { COLUMN, FLEX } from '../../utils/constants/stringConstants'
import {
  requestGetProjectDetails,
  requestUpdateProjectDetails
} from '../../actions/projectActions'
import { ClientDetails } from '../../components/Common/Widget/ClientDetailsWidget'
import { RenderTaskDetails } from '../../components/Common/Widget/TaskDetailsWidget'
import { RenderProjectDetails } from '../../components/Common/Widget/ProjectDetailWidget'
import { RenderExpenseDetails } from '../../components/Common/Widget/ExpenseDetailsWidget'
import { RenderMilestonesDetails } from '../../components/Common/Widget/MilestonesDetailWidget'
import { RenderBudgetDetails } from '../../components/Common/Widget/BudgetDetailsWidget'
import ProjectModal from 'components/Projects/NewProjectModal'
import ProjectStatusIndicator from '../../components/Common/ProjectStatusIndicator'
import { AssetUploadDisplay } from '../../components/Assets/UploadMedia'
import { Asset, Project } from 'utils/Interface'
import { useGetClient, useOnChange } from 'utils/hooks'
import { FeatureAssetUpload } from '../../components/Assets/FeatureAssetUpload'
import { AppDivider } from '../../components/Common/Core/AppDivider'
import * as Types from '../../utils/Interface'
import Header from 'components/Common/Header/header'
import clsx from 'clsx'
import { AppLoader } from 'components/Common/Core/AppLoader'
import { AssetUploadContext } from 'context/AssetUpload'
import { ConfirmationDialog } from 'components/Common/Dialog/ConfirmationDialog'
import {
  MenuItem,
  PopoverButton
} from 'components/Common/Popover/PopoverButton'
import { AppButton } from 'components/Common/Core/AppButton'
import { ProjectStatuses } from 'utils/enums'
import { getToggledArchiveStatus } from 'utils/projects'
import { getSubscriptionDetails } from 'utils/subscription'
import { bytesToGB } from 'utils/helpers'
import { ToastContext, ToastTypes } from 'context/Toast'

type EditProjectStates = {
  projectData: Object | any
  editProjectModalOpen: boolean
  currentStep: number
  isExpensesEdit: boolean | undefined
  isCampaignEdit: boolean | undefined
  isTaskEdit: boolean | undefined
  isBudgetEdit: boolean | undefined
}

const EditProjectScreen = (props: any) => {
  const classes = useStyles()
  const assetUploadContext = useContext(AssetUploadContext)
  const toastContext = useContext(ToastContext)

  const [state, setState] = useState<EditProjectStates>({
    projectData: props.projectCache[props.match.params.id],
    editProjectModalOpen: false,
    currentStep: 0,
    isExpensesEdit: false,
    isCampaignEdit: false,
    isTaskEdit: false,
    isBudgetEdit: false
  })
  const { projectData } = state

  const [confirmDeleteAsset, setConfirmDeleteAsset] = useState<Asset | null>(
    null
  )

  const client = useGetClient(props.clients, state.projectData)

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
    () => setState((state) => ({ ...state, editProjectModalOpen: false })),
    []
  )

  useOnChange(props.projectCache, (projectCache: { [id: string]: Project }) => {
    const project = projectCache[props.match.params.id]
    if (project) {
      setState((state) => ({ ...state, projectData: project }))
    }
  })

  useEffect(() => {
    const { getProjectDetails, match, account } = props
    if (match.params && match.params.id) {
      getProjectDetails(account.id, match.params.id)
    }
  }, [])

  const getTotalStorage = () => {
    const extraStorage =
      typeof props.storageSubscription?.metadata?.extraStorage === 'string'
        ? parseInt(props.storageSubscription?.metadata?.extraStorage)
        : 0
    const { storage } = getSubscriptionDetails(
      props.accountSubscription?.metadata?.type
    )
    return storage + extraStorage
  }

  const uploadFiles = (type: 'image' | 'video') => async (files: File[]) => {
    const totalStorage = getTotalStorage()
    const usedStorage = props.usedStorage
    const availableStorage = totalStorage - bytesToGB(usedStorage)

    const uploadBytes = files.reduce((acc, file) => acc + file.size, 0)
    const uploadGb = bytesToGB(uploadBytes)

    if (availableStorage >= uploadGb) {
      assetUploadContext.uploadFiles(files, type, addAssetToProject)
    } else {
      toastContext.showToast({
        title: 'Purchace extra storage to add more asset data',
        type: ToastTypes.warning
      })
    }
  }

  const addAssetToProject = async (asset: Asset) => {
    const project = Object.assign(
      state.projectData,
      asset.type === 'image'
        ? { images: [...state.projectData.images, asset.id] }
        : { videos: [...state.projectData.videos, asset.id] }
    )

    setState((state) => ({ ...state, projectData: project }))

    props.updateProjectDetails(project)
  }

  const confirmAssetDelete = (asset: Asset) => {
    setConfirmDeleteAsset(asset)
  }

  const handleAssetDelete = async (asset: Asset) => {
    setConfirmDeleteAsset(null)
    try {
    } catch (error) {}
  }

  const handleToggleArchived = () => {
    props.updateProjectDetails({
      ...projectData,
      status: getToggledArchiveStatus(projectData)
    })
  }

  const renderHeader = () => {
    if (!projectData) {
      return (
        <div className={clsx('row', 'center')}>
          <AppLoader />
        </div>
      )
    }

    const isProjectArchived = projectData.status === ProjectStatuses.ARCHIVED

    const popoverMenuItems: Array<MenuItem> = [
      {
        title: isProjectArchived ? 'Activate' : 'Archive',
        onClick: handleToggleArchived
      }
    ]

    return (
      <div className={clsx('row', 'headerContainer')}>
        <Typography variant={'h4'} className={clsx('bold', 'h4', 'flex')}>
          {projectData.campaignName}
        </Typography>
        <PopoverButton
          menuItems={popoverMenuItems}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}>
          {({
            onClick,
            id
          }: {
            onClick: (e: any) => void
            id: string | undefined
          }) => (
            <AppButton onClick={onClick} aria-owns={id}>
              <div className={classes.projectStatus}>
                <Typography className={classes.statusText}>
                  Status: {projectData.status}
                </Typography>
                <ProjectStatusIndicator status={projectData.status} />
              </div>
            </AppButton>
          )}
        </PopoverButton>
      </div>
    )
  }

  const handleFeaturedImageSelect = (id: string) => {
    if (id === state.projectData.featuredImage) {
      return
    }

    const updatedProject = { ...state.projectData, featuredImage: id }
    setState({ ...state, projectData: updatedProject })
    props.updateProjectDetails(updatedProject)
  }

  //submit project details update
  const handleUpdateProject = async (projectData: Project) => {
    setState({
      ...state,
      projectData,
      editProjectModalOpen: false
    })
    props.updateProjectDetails(projectData)
  }

  const renderProjectDetails = () => {
    return (
      <div>
        <ClientDetails
          clientData={client}
          editInfo
          onEdit={() => openEditProjectModal(1)}
          hideInfo={true}
        />

        <RenderProjectDetails
          projectData={state.projectData}
          editInfo
          onEdit={() => openEditProjectModal(2, false, true, false, false)}
        />

        <RenderTaskDetails
          projectData={state.projectData}
          editInfo
          onEdit={() => openEditProjectModal(2, true, false, false, false)}
        />

        <RenderExpenseDetails
          projectData={state.projectData}
          editInfo
          onEdit={() => openEditProjectModal(3, false, false, true, false)}
        />

        <RenderMilestonesDetails
          projectData={state.projectData}
          editInfo
          onEdit={() => openEditProjectModal(4)}
        />

        <RenderBudgetDetails
          projectData={state.projectData}
          editInfo
          onEdit={() => openEditProjectModal(3, false, false, false, true)}
        />
      </div>
    )
  }

  const renderBody = () => {
    if (!state.projectData) {
      return null
    }
    return (
      <div className={classes.detailsWrapper}>
        <Fragment>
          {renderProjectDetails()}
          <AppDivider spacing={6} />
          <AssetUploadDisplay
            {...{
              containerClassName: classes.uploadVideoContainer,
              onUpload: uploadFiles('video'),
              assetIds: state.projectData.videos,
              accountId: props.account.id,
              title: 'Upload Video Content',
              isVideo: true,
              onDeleteAsset: confirmAssetDelete
            }}
          />
          <AppDivider spacing={6} />
          <FeatureAssetUpload
            {...{
              containerClassName: classes.uploadImageContainer,
              onUpload: uploadFiles('image'),
              assetIds: state.projectData.images,
              accountId: props.account.id,
              title: 'Upload Image Content',
              onFeatureSelect: handleFeaturedImageSelect,
              featuredAsset: state.projectData.featuredImage,
              onDeleteAsset: confirmAssetDelete
            }}
          />
        </Fragment>
      </div>
    )
  }

  const renderEditProjectModel = () => {
    return (
      <ProjectModal
        open={state.editProjectModalOpen}
        initialStep={state.currentStep}
        onRequestClose={closeEditProjectModal}
        onUpdate={handleUpdateProject}
        editTask={state.isTaskEdit}
        editCampaign={state.isCampaignEdit}
        editExpenses={state.isExpensesEdit}
        editBudget={state.isBudgetEdit}
        project={state.projectData}
      />
    )
  }

  const handleBack = () => props.history.goBack()

  return (
    <div className={clsx('screenContainer', 'fullHeight')}>
      <Header
        user={props.user}
        renderAppIcon={true}
        onLogoClick={handleBack}
        history={props.history}
        style={{ position: 'fixed', top: 0 }}
      />

      <div className={'screenInner'}>
        <div
          className={clsx('responsivePadding', 'fixedHeaderScreenTopPadding')}>
          <div className={clsx('screenChild', 'shadowLight')}>
            {renderHeader()}
            {renderBody()}
            {renderEditProjectModel()}
            <ConfirmationDialog
              title={'Delete Project Asset'}
              message={
                'Are you sure you want to remove this asset from the project? This cannot be undone'
              }
              isOpen={!!confirmDeleteAsset}
              onYes={() =>
                confirmDeleteAsset && handleAssetDelete(confirmDeleteAsset)
              }
              onNo={() => setConfirmDeleteAsset(null)}
              onClose={() => setConfirmDeleteAsset(null)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  user: state.auth.user as Types.User,
  isLoggedIn: state.auth.isLoggedIn,
  newProjectData: state.project.projectData,
  projectDetails: state.project.projectDetails,
  projectCache: state.project.projectCache,
  isProjectDetailsLoading: state.project.isProjectDetailsLoading,
  account: state.auth.account,
  clients: state.clients.clientsData,
  usedStorage: state.auth.usedStorage,
  accountSubscription: state.stripe.accountSubscription,
  storageSubscription: state.stripe.storageSubscription
})

const mapDispatchToProps = (dispatch: any) => ({
  getProjectDetails: (accountId: string, projectId: string) => {
    return dispatch(requestGetProjectDetails(accountId, projectId))
  },
  updateProjectDetails: (projectData: Project) => {
    return dispatch(requestUpdateProjectDetails(projectData))
  }
})

const useStyles = makeStyles((theme) => ({
  statusText: { color: theme.palette.text.background },
  projectStatus: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(1)
    }
  },
  divider: {
    backgroundColor: theme.palette.background.surfaceHighlight,
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6)
  },
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
  header: {},
  detailsWrapper: {
    color: theme.palette.text.background,
    marginTop: 30
  },
  uploadVideoContainer: {},
  uploadImageContainer: {},
  loader: {
    margin: '0 auto'
  },
  video: {
    // display:"none"
  }
}))

export default connect(mapStateToProps, mapDispatchToProps)(EditProjectScreen)
