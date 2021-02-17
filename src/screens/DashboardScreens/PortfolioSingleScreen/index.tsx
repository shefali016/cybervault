import { getPortfolioRequest } from 'actions/portfolioActions'
import { Fragment, useEffect, useState } from 'react'
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
import clsx from 'clsx'

type StateProps = {
  portfolio: Portfolio
  portfolioProjects: Array<Project>
  account: Account
  user: User
}
type initialState = {
  selectedProjectData: Object | any
}
type Props = {
  match: any
  history: any
  getPortfolioFolders: (portfolioId: string) => void
} & StateProps

const PortfolioSingleScreen = ({
  getPortfolioFolders,
  account,
  portfolioProjects,
  user,
  history,
  match
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

  const [state, setState] = useState<initialState>({
    selectedProjectData:
      portfolioProjects && portfolioProjects.length ? portfolioProjects[0] : {}
  })

  const handlePortfolioAction = (portfolioId: string) => {
    getPortfolioFolders(portfolioId)
  }

  useEffect(() => {
    const id = match.params.id
    handlePortfolioAction(id)
  }, [match])

  const setProjectData = (project: Project) => {
    setState({
      ...state,
      selectedProjectData: project
    })
  }

  const handleProfileNavigation = () =>
    history.replace(`/${AccountTabIds.profile}`)

  const handleBack = () => history.pop()

  return (
    <div
      className={classes.screen}
      style={{ backgroundColor, color: textColor }}>
      <Header
        user={user}
        onProfileClick={handleProfileNavigation}
        onBack={handleBack}
        renderAppIcon={true}
      />
      <div
        style={{
          backgroundImage: `linear-gradient(to right ,${headerGradient1}, ${headerGradient2})`
        }}>
        <ul
          className={`${classes.portfoloTabsList} ${
            color === 'light' ? classes.portfoloDarkTabsList : ''
          }`}>
          {portfolioProjects && portfolioProjects.length
            ? portfolioProjects.map((project: Project | any, index: number) => {
                return (
                  <li
                    onClick={() => setProjectData(project)}
                    key={index}
                    className={
                      state.selectedProjectData.id === project.id
                        ? 'active'
                        : ''
                    }>
                    {project.campaignName}
                  </li>
                )
              })
            : null}
        </ul>
      </div>

      <div
        className={classes.portfolioWrapper}
        style={{ backgroundColor: foregroundColor }}>
        <div style={{ marginBottom: theme.spacing(4) }}>
          <Typography variant={'h4'}>
            {state.selectedProjectData.campaignName}
          </Typography>
        </div>
        <RenderCampaignDetails projectData={state.selectedProjectData} />
        <RenderProjectDetails projectData={state.selectedProjectData} />
        {!!state.selectedProjectData.videos.length ||
          (!!state.selectedProjectData.images.length && (
            <div className={classes.assetsOuter}>
              <div className={classes.assetsInner}>
                {!!state.selectedProjectData.videos.length && (
                  <AssetUploadDisplay
                    {...{
                      assetIds: state.selectedProjectData.videos,
                      accountId: account ? account.id : '',
                      isVideo: true,
                      disableUpload: true
                    }}
                  />
                )}
                <FeatureAssetUpload
                  {...{
                    assetIds: state.selectedProjectData.images,
                    accountId: account ? account.id : '',
                    featuredAsset: state.selectedProjectData.featuredImage,
                    disableUpload: true
                  }}
                />
              </div>
            </div>
          ))}
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
  getPortfolioFolders: (portfolioId: string) => {
    return dispatch(getPortfolioRequest(portfolioId))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioSingleScreen)
