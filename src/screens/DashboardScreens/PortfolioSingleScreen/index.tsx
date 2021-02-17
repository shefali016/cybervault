import { getPortfolioRequest } from 'actions/portfolioActions'
import { Fragment, useEffect, useState, useMemo } from 'react'
import { connect } from 'react-redux'
import { ReduxState } from 'reducers/rootReducer'
import { Portfolio, Project, Account, User } from 'utils/Interface'
import { Box, Container, Typography } from '@material-ui/core'
import { useStyles } from './style'
import { RenderProjectDetails } from 'components/Common/Widget/ProjectDetailWidget'
import { RenderCampaignDetails } from 'components/Common/Widget/CampaignDetailsWidget'
import { AssetUploadDisplay } from 'components/Assets/UploadMedia'
import { FeatureAssetUpload } from 'components/Assets/FeatureAssetUpload'
import { getTextColor } from 'utils/helpers'
import Header from '../../../components/Common/Header/header'
import { AccountTabIds } from 'screens/MainScreen'
import { useTheme } from '@material-ui/core/styles'
import { AppDivider } from 'components/Common/Core/AppDivider'
import { AppLoader } from 'components/Common/Core/AppLoader'

type StateProps = {
  portfolio: Portfolio
  portfolioProjects: Array<Project>
  account: Account
  user: User
}
type initialState = {
  selectedProjectId: string
}
type Props = {
  match: any
  history: any
  getPortfolio: (portfolioId: string) => void
} & StateProps

const PortfolioSingleScreen = ({
  getPortfolio,
  account,
  portfolioProjects,
  user,
  history,
  match,
  portfolio
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
    selectedProjectId: portfolio.projects[0]
  })

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

  useEffect(() => {
    const id = match.params.id
    handlePortfolioAction(id)
  }, [match])

  const setProjectId = (project: Project) => {
    setState({
      ...state,
      selectedProjectId: project.id
    })
  }

  const handleProfileNavigation = () =>
    history.replace(`/${AccountTabIds.profile}`)

  const handleBack = () => history.goBack()

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
          <Typography variant={'h4'}>
            {selectedProjectData?.campaignName}
          </Typography>
        </div>

        <RenderCampaignDetails projectData={selectedProjectData} />

        <RenderProjectDetails
          projectData={selectedProjectData}
          hideBorder={!hasAssets}
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

              <AppDivider spacing={6} />

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

    return
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
      />
      <div
        style={{
          background: `linear-gradient(to right ,${headerGradient1}, ${headerGradient2})`
        }}>
        <ul
          className={`${classes.portfoloTabsList} ${
            color === 'dark' ? classes.portfoloDarkTabsList : ''
          }`}>
          {portfolioProjects && portfolioProjects.length
            ? portfolioProjects.map((project: Project | any, index: number) => {
                return (
                  <li
                    onClick={() => setProjectId(project)}
                    key={index}
                    className={
                      state.selectedProjectId === project.id ? 'active' : ''
                    }>
                    <Typography variant={'subtitle2'}>
                      {project.campaignName}
                    </Typography>
                  </li>
                )
              })
            : null}
        </ul>
      </div>

      <div
        className={classes.portfolioWrapper}
        style={{ backgroundColor: foregroundColor }}>
        {renderLoading()}

        {renderProjectDetails()}
      </div>
    </div>
  )
}
const mapStateToProps = (state: ReduxState): StateProps => ({
  portfolio: state.portfolio.portfolio as Portfolio,
  portfolioProjects: state.portfolio.portfolioProjects as Array<Project>,
  account: state.auth.account as Account,
  user: state.auth.user as User
})
const mapDispatchToProps = (dispatch: any) => ({
  getPortfolio: (portfolioId: string) => {
    return dispatch(getPortfolioRequest(portfolioId))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioSingleScreen)
