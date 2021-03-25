import {
  getPortfolioRequest,
  requestSharePortfolio
} from 'actions/portfolioActions'
import React, { useEffect, useState, useMemo } from 'react'
import { connect } from 'react-redux'
import { ReduxState } from 'reducers/rootReducer'
import { Portfolio, Project, Account, User, Client } from 'utils/Interface'
import { useStyles } from 'components/Portfolio/style'
import { getTextColor } from 'utils/helpers'
import Header from '../../../components/Common/Header/header'
import { AccountTabIds } from 'screens/MainScreen'
import { AppLoader } from 'components/Common/Core/AppLoader'
import withWidth, { isWidthDown } from '@material-ui/core/withWidth'
import { MenuItem } from 'components/Common/Popover/PopoverButton'
import ProjectIcon from '@material-ui/icons/Collections'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { PortfolioModal } from 'components/Portfolio/PortfolioModal'
import { updatePortfolioRequest } from 'actions/portfolioActions'
import { PortfolioShareModal } from 'components/Portfolio/PortfolioShareModal'
import { PortfolioTitle } from 'components/Portfolio/PortfolioTitle'
import { ProjectSelectBar } from 'components/Portfolio/ProjectSelectBar'
import { PortfolioProjectDetails } from 'components/Portfolio/PortfolioDetails'
import clsx from 'clsx'
import { EmptyIcon } from 'components/EmptyIcon'

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
  sharePortfolioSuccess: boolean
  sharePortfolioLoading: boolean
}

type DispatchProps = {
  updatePortfolio: (portfolio: Portfolio) => void
  getPortfolio: (portfolioId: string) => void
  sharePortfolio: (
    portfolio: Portfolio,
    contentDesc: string,
    email: string
  ) => void
}

type initialState = {
  selectedProjectId: string | null
}
type Props = {
  match: any
  history: any
  width: any
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
  updatePortfolio,
  sharePortfolio,
  sharePortfolioSuccess,
  sharePortfolioLoading
}: Props) => {
  const classes = useStyles()

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

  // Handle loading of portfolio in match params
  useEffect(() => {
    const id = match.params.id
    if (id) {
      getPortfolio(id)
    }
  }, [match])
  // Set selected project id when portfolio is first loaded or projects change
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
  // Select project with selected id in state
  const selectedProjectData = useMemo(
    () => portfolioProjects.find((p) => p.id === state.selectedProjectId),
    [state.selectedProjectId, portfolioProjects]
  )

  const setProjectId = (project: Project) => {
    setState({
      ...state,
      selectedProjectId: project.id
    })
  }

  const [modalState, setModalState] = useState({
    open: false,
    editingProjects: false
  })

  const [shareModalOpen, setShareModalOpen] = useState(false)

  const handleChangeProjects = () => {
    setModalState({ open: true, editingProjects: true })
  }

  const handleEdit = () => {
    setModalState({ open: true, editingProjects: false })
  }

  const handleDelete = () => {}

  const prepareShare = () => {
    setShareModalOpen(true)
  }

  const handleShare = (email: string, contentDesc: string) => {
    sharePortfolio(portfolio, contentDesc, email)
  }

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

  const handleProfileNavigation = () =>
    history.replace(`/${AccountTabIds.profile}`)

  const handleBack = () => {
    console.log(history)
    history.push('/portfolio')
  }

  const getDefaultMessage = () => {
    let imageCount = 0
    let videoCount = 0

    portfolioProjects.map((p: Project) => {
      videoCount = videoCount + p.videos.length
      imageCount = imageCount + p.images.length
    })

    return `${portfolioProjects.length} project${
      portfolioProjects.length > 1 ? 's' : ''
    } with ${!!imageCount ? imageCount + ' Images' : ''}${
      !!imageCount && !!videoCount && ' and '
    }${!!videoCount ? videoCount + ' Videos' : ''}`
  }

  return (
    <div
      className={clsx('screenContainer', 'fullHeight')}
      style={{ backgroundColor, color: textColor }}>
      <Header
        user={user}
        onProfileClick={handleProfileNavigation}
        renderAppIcon={true}
        onLogoClick={handleBack}
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
          popoverMenuItems,
          onShare: prepareShare
        }}
      />

      <div className={clsx('screenInner', 'col', 'flex')}>
        <div className={clsx('responsivePadding', 'col', 'flex')}>
          <div className={classes.contentHeader}>
            <PortfolioTitle
              className={classes.portfolioTitle}
              portfolio={portfolio}
              size={isWidthDown('sm', width) ? 38 : 50}
            />

            {!!account.settings.watermark && (
              <img
                src={account.settings.watermark}
                alt='company-logo'
                className={classes.contentHeaderLogo}
              />
            )}
          </div>
          <div
            className={clsx('screenChild', 'flex')}
            style={{ backgroundColor: foregroundColor }}>
            {(!portfolio.projects || portfolio.projects.length === 0) && (
              <EmptyIcon
                Icon={ProjectIcon}
                title='No projects added'
                className={'flex center'}
              />
            )}
            {portfolio.projects &&
              portfolio.projects.length > 0 &&
              !selectedProjectData && (
                <AppLoader className={classes.loader} color={textColor} />
              )}

            <PortfolioProjectDetails
              project={selectedProjectData}
              account={account}
            />
          </div>
        </div>
      </div>

      <PortfolioModal
        folderId={portfolio?.folderId}
        open={!!modalState.open}
        onRequestClose={() =>
          setModalState({ open: false, editingProjects: false })
        }
        onSubmit={(portfolio: Portfolio) => updatePortfolio(portfolio)}
        projects={projects}
        loading={updatePortfolioLoading}
        error={updatePortfolioError}
        success={updatePortfolioSuccess}
        clients={clients}
        portfolio={portfolio}
        isEditingProject={modalState.editingProjects}
      />

      <PortfolioShareModal
        open={shareModalOpen}
        onRequestClose={() => setShareModalOpen(false)}
        onShare={handleShare}
        success={sharePortfolioSuccess}
        loading={sharePortfolioLoading}
        defaultMessage={getDefaultMessage()}
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
    portfolio,
    sharePortfolioSuccess,
    sharePortfolioLoading
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
    clients: state.clients.clientsData,
    sharePortfolioSuccess,
    sharePortfolioLoading
  }
}
const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  getPortfolio: (portfolioId: string) => {
    return dispatch(getPortfolioRequest(portfolioId))
  },
  updatePortfolio: (portfolio: Portfolio) =>
    dispatch(updatePortfolioRequest(portfolio)),
  sharePortfolio: (portfolio: Portfolio, contentDesc: string, email: string) =>
    dispatch(requestSharePortfolio(portfolio, contentDesc, email))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withWidth()(PortfolioSingleScreen))
