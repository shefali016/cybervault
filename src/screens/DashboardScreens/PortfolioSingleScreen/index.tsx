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
  location: any
  history: any
  getPortfolioFolders: (portfolioId: string) => void
} & StateProps

const PortfolioSingleScreen = ({
  location,
  getPortfolioFolders,
  account,
  portfolioProjects,
  user,
  history
}: Props) => {
  const classes = useStyles()

  const {
    text: textColor,
    foregroundColor,
    backgroundColor,
    headerGradient1,
    headerGradient2
  } = account.branding.portfolio

  const portfolioHeaderGradient1 = account
    ? account.branding.portfolio.headerGradient1
    : ''

  const color = getTextColor(portfolioHeaderGradient1)

  const [state, setState] = useState<initialState>({
    selectedProjectData:
      portfolioProjects && portfolioProjects.length ? portfolioProjects[0] : {}
  })

  const handlePortfolioAction = (portfolioId: string) => {
    getPortfolioFolders(portfolioId)
  }

  useEffect(() => {
    const paths = location.pathname.split('/')
    handlePortfolioAction(paths[2])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

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
    <div className={'col'} style={{ backgroundColor }}>
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

      <Container maxWidth='lg'>
        <div
          className={classes.portfolioWrapper}
          style={{ backgroundColor: foregroundColor }}>
          <div style={{ color: textColor, marginBottom: '50px' }}>
            <Typography variant={'h4'}>
              {state.selectedProjectData.clientName}
            </Typography>
          </div>
          <RenderCampaignDetails projectData={state.selectedProjectData} />
          <br />
          <RenderProjectDetails projectData={state.selectedProjectData} />
          <div className={classes.corosalWrapper}>
            <AssetUploadDisplay
              {...{
                assetIds: state.selectedProjectData.videos,
                accountId: account ? account.id : '',
                isVideo: true,
                disableUpload: true
              }}
            />
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
      </Container>
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
