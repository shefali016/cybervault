import { getPortfolioRequest } from 'actions/portfolioActions'
import { Fragment, useEffect, useState, useMemo } from 'react'
import { connect } from 'react-redux'
import { ReduxState } from 'reducers/rootReducer'
import { Portfolio, Project, Account, User, Client } from 'utils/Interface'
import { Typography } from '@material-ui/core'
import { useStyles } from './style'
import { RenderCampaignDetails } from 'components/Common/Widget/CampaignDetailsWidget'
import { AssetUploadDisplay } from 'components/Assets/UploadMedia'
import { FeatureAssetUpload } from 'components/Assets/FeatureAssetUpload'
import { getTextColor } from 'utils/helpers'
import Header from '../../../components/Common/Header/header'
import { AccountTabIds } from 'screens/MainScreen'
import { useTheme } from '@material-ui/core/styles'
import { AppDivider } from 'components/Common/Core/AppDivider'
import { AppLoader } from 'components/Common/Core/AppLoader'
import { Details } from 'components/ProjectInfoDisplay/Details'
import clsx from 'clsx'
import { AppButton } from 'components/Common/Core/AppButton'
import { Dot } from 'components/Common/Dot'
import withWidth, { isWidthDown } from '@material-ui/core/withWidth'
import { useOnChange } from 'utils/hooks'
import { IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { MenuItem, PopoverButton } from 'components/Common/PopoverButton'
import ProjectIcon from '@material-ui/icons/Collections'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { PortfolioModal } from 'components/Portfolio/PortfolioModal'
import { updatePortfolioRequest } from 'actions/portfolioActions'

type StateProps = {
  portfolio: Portfolio
  portfolioProjects: Array<Project>
  account: Account
  user: User
  updatePortfolioLoading: boolean
  updatePortfolioError: null | string
  updatePortfolioSuccess: boolean
  clients: Array<Client>
  projects: Array<Project>
}

type DispatchProps = {
  updatePortfolio: (portfolio: Portfolio) => void
  getPortfolio: (portfolioId: string) => void
}

type initialState = {
  selectedProjectId: string | null
}
type Props = {
  match: any
  history: any
  width: string
} & StateProps &
  DispatchProps

const PortfolioSingleScreen = ({
  getPortfolio,
  account,
  portfolioProjects,
  user,
  history,
  match,
  portfolio,
  width,
  clients,
  projects,
  updatePortfolioLoading,
  updatePortfolioError,
  updatePortfolioSuccess,
  updatePortfolio
}: Props) => {
  const classes = useStyles()
  const theme = useTheme()

  const {
    text: textColor,
    foregroundColor,
    backgroundColor,
    headerGradient1,
    headerGradient2
  } = account.branding.portfolio

  const color = getTextColor(headerGradient1)
  const foregroundStyle = getTextColor(foregroundColor)

  const [state, setState] = useState<initialState>({
    selectedProjectId:
      portfolio?.id === match.params.id ? portfolio.projects[0] : null
  })

  const [modalState, setModalState] = useState({
    open: false,
    editingProjects: false
  })

  const handleChangeProjects = () => {
    setModalState({ open: true, editingProjects: true })
  }

  const handleEdit = () => {
    setModalState({ open: true, editingProjects: false })
  }

  const handleDelete = () => {}

  const popoverMenuItems: Array<MenuItem> = [
    {
      title: 'Change projects',
      Icon: ProjectIcon,
      onClick: handleChangeProjects
    },
    { title: 'Edit portfolio', Icon: EditIcon, onClick: handleEdit },
    {
      title: 'Delete portfolio',
      Icon: DeleteIcon,
      onClick: handleDelete,
      desctructive: true
    }
  ]

  useEffect(() => {
    const id = match.params.id
    handlePortfolioAction(id)
  }, [match])

  useEffect(() => {
    if (
      portfolio?.id === match.params.id &&
      (!state.selectedProjectId ||
        !portfolio.projects.includes(state.selectedProjectId))
    ) {
      setState((state) => ({
        ...state,
        selectedProjectId: portfolio.projects[0]
      }))
    }
  }, [portfolio])

  const selectedProjectData = useMemo(
    () => portfolioProjects.find((p) => p.id === state.selectedProjectId),
    [state.selectedProjectId, portfolioProjects]
  )

  const { videos, images } = selectedProjectData || {
    videos: [] as any,
    images: [] as any
  }

  const hasAssets = !!videos.length || !!images.length

  const handlePortfolioAction = (portfolioId: string) => {
    getPortfolio(portfolioId)
  }

  const setProjectId = (project: Project) => {
    setState({
      ...state,
      selectedProjectId: project.id
    })
  }

  const handleProfileNavigation = () =>
    history.replace(`/${AccountTabIds.profile}`)

  const handleBack = () => history.push('/portfolio')

  const renderLoading = () => {
    if (selectedProjectData) return null

    return (
      <AppLoader
        className={classes.loader}
        color={foregroundStyle === 'light' ? 'black' : 'white'}
      />
    )
  }

  const renderProjectDetails = () => {
    if (!selectedProjectData) return null

    return (
      <Fragment>
        <div style={{ marginBottom: theme.spacing(4) }}>
          <Typography variant={'h4'} className='bold'>
            {selectedProjectData?.campaignName}
          </Typography>
        </div>

        <RenderCampaignDetails projectData={selectedProjectData} />

        <Typography variant={'h5'}>Project Details</Typography>

        <Details
          label={'Campaign Objective:'}
          value={selectedProjectData.campaignObjective}
        />
        <Details
          label={'Project Summary:'}
          value={selectedProjectData.description}
        />

        {hasAssets && (
          <div className={classes.assetsOuter}>
            <div className={classes.assetsInner}>
              {!!videos.length && (
                <AssetUploadDisplay
                  {...{
                    assetIds: videos,
                    accountId: account ? account.id : '',
                    isVideo: true,
                    disableUpload: true
                  }}
                />
              )}

              <AppDivider className={classes.assetDivider} />

              {!!images.length && (
                <FeatureAssetUpload
                  {...{
                    assetIds: images,
                    accountId: account ? account.id : '',
                    featuredAsset: selectedProjectData.featuredImage,
                    disableUpload: true
                  }}
                />
              )}
            </div>
          </div>
        )}
      </Fragment>
    )
  }

  const renderHeaderContent = () => {
    const iconSize = 35
    return (
      <div className='row'>
        <div
          className='circleImage'
          style={{
            height: iconSize,
            minWidth: iconSize,
            borderRadius: iconSize / 2,
            marginRight: theme.spacing(1.5),
            marginLeft: theme.spacing(3)
          }}>
          {!!portfolio.icon && (
            <img src={portfolio.icon} alt='portfolio-icon' />
          )}
        </div>
        <Typography variant='h6' className='backgroundText'>
          {portfolio.name}
        </Typography>
      </div>
    )
  }

  return (
    <div
      className={classes.screen}
      style={{ backgroundColor, color: textColor }}>
      <Header
        user={user}
        onProfileClick={handleProfileNavigation}
        renderAppIcon={true}
        onLogoClick={handleBack}
        renderHeaderContent={renderHeaderContent}
      />

      <ProjectSelectBar
        {...{
          projects: portfolioProjects,
          onSelect: setProjectId,
          selectedProject: selectedProjectData,
          barStyle: color,
          gradiant1: headerGradient1,
          gradiant2: headerGradient2,
          width,
          popoverMenuItems
        }}
      />

      <div
        className={classes.portfolioWrapper}
        style={{ backgroundColor: foregroundColor }}>
        {renderLoading()}

        {renderProjectDetails()}
      </div>

      <PortfolioModal
        folderId={portfolio?.folderId}
        open={!!modalState.open}
        onRequestClose={() =>
          setModalState({ open: false, editingProjects: false })
        }
        onSubmit={(portfolio: Portfolio) => updatePortfolio(portfolio)}
        projectList={projects}
        loading={updatePortfolioLoading}
        error={updatePortfolioError}
        success={updatePortfolioSuccess}
        clients={clients}
        portfolio={portfolio}
        isEditingProject={modalState.editingProjects}
      />
    </div>
  )
}
const mapStateToProps = (state: ReduxState): StateProps => {
  const {
    updatePortfolioLoading,
    updatePortfolioError,
    updatePortfolioSuccess,
    portfolioProjects,
    portfolio
  } = state.portfolio

  return {
    portfolio: portfolio as Portfolio,
    portfolioProjects: portfolioProjects as Array<Project>,
    account: state.auth.account as Account,
    user: state.auth.user as User,
    updatePortfolioLoading,
    updatePortfolioError,
    updatePortfolioSuccess,
    projects: state.project.allProjectsData,
    clients: state.clients.clientsData
  }
}
const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  getPortfolio: (portfolioId: string) => {
    return dispatch(getPortfolioRequest(portfolioId))
  },
  updatePortfolio: (portfolio: Portfolio) =>
    dispatch(updatePortfolioRequest(portfolio))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withWidth()(PortfolioSingleScreen))

type ProjectSelectBarProps = {
  projects: Array<Project>
  onSelect: (project: Project) => void
  selectedProject: Project | undefined
  barStyle: 'light' | 'dark'
  gradiant1: string
  gradiant2: string
  width: any
  popoverMenuItems?: Array<MenuItem>
}

const ProjectSelectBar = ({
  projects,
  onSelect,
  selectedProject,
  barStyle,
  gradiant1,
  gradiant2,
  width,
  popoverMenuItems
}: ProjectSelectBarProps) => {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = useState(false)

  useOnChange(width, (width: any) => {
    if (!isWidthDown('sm', width) && open) {
      setOpen(false)
    }
  })

  const renderProjectButtons = ({
    showActive = true,
    style = {}
  }: {
    showActive?: boolean
    style?: {}
  }) => {
    if (!(projects && projects.length)) {
      return null
    }

    return projects.map((project: Project | any, index: number) => {
      const isSelected = selectedProject?.id === project.id
      return (
        <AppButton
          onClick={() => {
            if (open) {
              setOpen(false)
            }
            onSelect(project)
          }}
          key={index}
          className={classes.projectButton}
          style={style}>
          <Typography variant={'inherit'}>{project.campaignName}</Typography>

          {isSelected && showActive && (
            <Dot
              className={classes.activeDot}
              size={7}
              color={barStyle === 'dark' ? '#ffffff55' : '#00000055'}
            />
          )}
        </AppButton>
      )
    })
  }

  const renderPopover = ({ style = {} }: { style?: {} }) => {
    return (
      !!popoverMenuItems &&
      !!popoverMenuItems.length && (
        <PopoverButton
          menuItems={popoverMenuItems}
          style={style}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        />
      )
    )
  }

  return (
    <div>
      <div
        className={classes.projectBarContainer}
        style={{
          background: `linear-gradient(to right ,${gradiant1}, ${gradiant2})`
        }}>
        <div
          className={clsx(
            classes.portfoloTabsList,
            barStyle === 'dark' ? classes.portfoloDarkTabsList : '',
            'hiddenSmDown'
          )}>
          {renderProjectButtons({ showActive: true })}
        </div>
        <div
          className={clsx(
            classes.portfoloTabsList,
            barStyle === 'dark' ? classes.portfoloDarkTabsList : '',
            'hiddenMdUp'
          )}>
          {!!selectedProject && (
            <AppButton
              onClick={() => setOpen(!open)}
              className={clsx(classes.projectButton, 'alignLeftButton')}>
              <div className='row'>
                <Typography variant={'inherit'}>
                  {selectedProject.campaignName}
                </Typography>
              </div>
            </AppButton>
          )}
        </div>

        <IconButton className={'hiddenMdUp'} onClick={() => setOpen(!open)}>
          <MenuIcon
            className={barStyle === 'dark' ? 'whiteIconLg' : 'blackIconLg'}
          />
        </IconButton>

        <div className={clsx('row', 'hiddenSmDown')}>
          {renderPopover({ style: { marginRight: theme.spacing(2) } })}
          <AppButton className={classes.shareButton}>Share</AppButton>
        </div>
      </div>

      <div
        className={clsx(classes.projectBarCollapsed)}
        style={{
          height: open ? projects.length * 75 + 50 : 0,
          paddingTop: open ? undefined : 0,
          background: `linear-gradient(to right ,${gradiant1}, ${gradiant2})`
        }}>
        {renderProjectButtons({
          showActive: false,
          style: { marginBottom: theme.spacing(1) }
        })}
        <div
          className='row'
          style={{
            position: 'relative',
            width: '100%',
            justifyContent: 'center',
            marginTop: theme.spacing(2)
          }}>
          <AppButton className={classes.shareButton}>Share</AppButton>
          {renderPopover({
            style: { position: 'absolute', right: theme.spacing(2) }
          })}
        </div>
      </div>
    </div>
  )
}
