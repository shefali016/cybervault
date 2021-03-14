import React, { useState, useEffect, useMemo, useContext } from 'react'
import { useStyles } from 'components/Portfolio/style'
import {
  Portfolio,
  Project,
  Account,
  User,
  PortfolioShare
} from 'utils/Interface'
import withWidth, { isWidthDown } from '@material-ui/core/withWidth'
import { connect } from 'react-redux'
import { PortfolioProjectDetails } from 'components/Portfolio/PortfolioDetails'
import { ProjectSelectBar } from 'components/Portfolio/ProjectSelectBar'
import { PortfolioTitle } from 'components/Portfolio/PortfolioTitle'
import { AppLoader } from 'components/Common/Core/AppLoader'
import { getTextColor } from 'utils/helpers'
import { ReduxState } from 'reducers/rootReducer'
import Header from 'components/Common/Header/header'
import {
  getPortfolioShare,
  getPortfolioRequest,
  updatePortfolioShare
} from 'apis/portfolioRequest'
import { ToastContext } from 'context/Toast'
import { getAccount } from 'apis/account'
import { FullScreenLoader } from 'components/Common/Loading/FullScreenLoader'

type StateProps = {
  account: Account
  portfolio: Portfolio
  portfolioProjects: Array<Project>
  user: User
}

type DispatchProps = {}

type Props = {
  account: Account
  portfolio: Portfolio
  portfolioProjects: Array<Project>
  width: any
  match: any
  history: any
} & StateProps &
  DispatchProps

type State = {
  shareNotFound: boolean
  portfolio: null | Portfolio
  senderAccount: null | Account
  portfolioProjects: Array<Project>
  loaded: boolean
  portfolioShare: null | PortfolioShare
}

const PortfolioShareScreen = ({
  account,
  width,
  match,
  user,
  history
}: Props) => {
  const classes = useStyles()
  const toastContext = useContext(ToastContext)

  const [state, setState] = useState<State>({
    shareNotFound: false,
    portfolio: null,
    senderAccount: null,
    portfolioProjects: [],
    loaded: false,
    portfolioShare: null
  })

  const { portfolio, portfolioProjects, senderAccount } = state

  const [selectedProjectId, setSelectedProjectId] = useState(
    portfolio && portfolio.id === match.params.id ? portfolio.projects[0] : null
  )

  // Handle loading of portfolio in match params
  useEffect(() => {
    const shareId = match.params.id
    loadPortfolio(shareId)
  }, [match])

  const loadPortfolio = async (shareId: string) => {
    try {
      if (state.shareNotFound) {
        setState((state) => ({ ...state, shareNotFound: false }))
      }
      const portfolioShare:
        | PortfolioShare
        | undefined = await getPortfolioShare(shareId)
      if (!portfolioShare) {
        return setState((state) => ({ ...state, shareNotFound: true }))
      }
      const { portfolioId, accountId, isViewed, createdAt } = portfolioShare

      const senderAccount = await getAccount(accountId)

      if (!senderAccount) {
        throw Error('Account does not exist')
      }

      const portfolioResponse = await getPortfolioRequest(
        portfolioId,
        accountId
      )

      if (
        !(
          portfolioResponse &&
          portfolioResponse.portfolio &&
          portfolioResponse.projectDataList
        )
      ) {
        throw Error('Failed to fetch portfolio')
      }

      if (
        !isViewed &&
        (!account || (account && senderAccount.id !== account.id))
      ) {
        await updatePortfolioShare({ ...portfolioShare, isViewed: true })
      }

      const { projectDataList, portfolio } = portfolioResponse

      setState((state: State) => ({
        ...state,
        loaded: true,
        senderAccount,
        portfolioProjects: projectDataList,
        portfolio,
        portfolioShare
      }))
    } catch (error) {
      console.log(error)
      toastContext.showToast({
        title: 'Failed to fetch portfolio. Please try again.'
      })
    }
  }

  // Set selected project id when portfolio is first loaded or projects change
  useEffect(() => {
    if (
      portfolio &&
      (!selectedProjectId || !portfolio.projects.includes(selectedProjectId))
    ) {
      setSelectedProjectId(portfolio.projects[0])
    }
  }, [portfolio])
  // Select project with selected id in state
  const selectedProjectData = useMemo(
    () => portfolioProjects.find((p) => p.id === selectedProjectId),
    [selectedProjectId, portfolioProjects]
  )

  const setProjectId = (project: Project) => {
    setSelectedProjectId(project.id)
  }

  const handleBack = () => {
    if (account) {
      history.push('/dashboard')
    }
  }

  const handleProfileNavigation = () => {
    if (user) {
      history.push('/profile')
    }
  }

  if (!(state.loaded && senderAccount)) {
    return <FullScreenLoader />
  }

  const {
    text: textColor,
    foregroundColor,
    backgroundColor,
    headerGradient1,
    headerGradient2
  } = senderAccount.branding.portfolio

  const color = getTextColor(headerGradient1)
  const foregroundStyle = getTextColor(foregroundColor)

  const renderHeader = () => {
    if (
      user &&
      account &&
      state.portfolioShare &&
      account.id === state.portfolioShare.accountId
    ) {
      return (
        <Header
          user={user}
          onProfileClick={handleProfileNavigation}
          renderAppIcon={true}
          onLogoClick={handleBack}
        />
      )
    }
    return null
  }

  return (
    <div
      className={classes.screen}
      style={{ backgroundColor, color: textColor }}>
      {renderHeader()}

      <ProjectSelectBar
        {...{
          projects: portfolioProjects,
          onSelect: setProjectId,
          selectedProject: selectedProjectData,
          barStyle: color,
          gradiant1: headerGradient1,
          gradiant2: headerGradient2,
          width
        }}
      />

      <div className={classes.contentHeader}>
        <PortfolioTitle
          className={classes.portfolioTitle}
          portfolio={portfolio}
          size={isWidthDown('sm', width) ? 38 : 50}
        />

        {!!senderAccount.settings.watermark && (
          <img
            src={senderAccount.settings.watermark}
            alt='company-logo'
            className={classes.contentHeaderLogo}
          />
        )}
      </div>

      <div
        className={classes.portfolioWrapper}
        style={{ backgroundColor: foregroundColor }}>
        {!selectedProjectData && (
          <AppLoader className={classes.loader} color={textColor} />
        )}

        <PortfolioProjectDetails
          project={selectedProjectData}
          account={senderAccount}
        />
      </div>
    </div>
  )
}

const mapStateToProps = (state: ReduxState): StateProps => {
  const { portfolioProjects, portfolio } = state.portfolio

  return {
    portfolio: portfolio as Portfolio,
    portfolioProjects: portfolioProjects as Array<Project>,
    account: state.auth.account as Account,
    user: state.auth.user as User
  }
}
const mapDispatchToProps = (dispatch: any): DispatchProps => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withWidth()(PortfolioShareScreen))
