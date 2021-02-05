import { getPortfolioRequest } from 'actions/portfolioActions'
import { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { ReduxState } from 'reducers/rootReducer'
import { Portfolio, Project } from 'utils/Interface'
import { Box, Container, Typography } from '@material-ui/core'
import { useStyles } from './style'
import EditProjectScreen from '../ProjectSingleScreen'
import { useOnChange } from 'utils/hooks'
import { RenderProjectDetails } from 'components/Common/Widget/ProjectDetailWidget'
import { RenderCampaignDetails } from 'components/Common/Widget/CampaignDetailsWidget'
import { AssetUploadDisplay } from 'components/Assets/UploadMedia'
import { AppDivider } from 'components/Common/Core/AppDivider'
import { FeatureAssetUpload } from 'components/Assets/FeatureAssetUpload'

type StateProps = {
  portfolio: Portfolio
  portfolioProjects: Array<Project>
  account: Account | null | any
}
type initialState = {
  selectedProjectData: Object | any
}
type Props = {
  location: any
  getPortfolioFolders: (portfolioId: string) => void
} & StateProps

const PortfolioSingleScreen = ({
  location,
  getPortfolioFolders,
  account,
  portfolioProjects
}: Props) => {
  const classes = useStyles()

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

  const portfolioForeGroundColor = account
    ? account.branding.portfolio.foregroundColor
    : ''
  const portfolioTestColor = account ? account.branding.portfolio.text : ''
  const portfolioHeaderGradient1 = account
    ? account.branding.portfolio.headerGradient1
    : ''
  const portfolioHeaderGradient2 = account
    ? account.branding.portfolio.headerGradient2
    : ''

  return (
    <Fragment>
      <Box
        className={classes.portfolioTabsWrap}
        style={{
          backgroundImage: `linear-gradient(to right ,${portfolioHeaderGradient1}, ${portfolioHeaderGradient2})`
        }}>
        <Container maxWidth='lg'>
          <ul className={classes.portfoloTabsList}>
            {portfolioProjects && portfolioProjects.length
              ? portfolioProjects.map(
                  (project: Project | any, index: number) => {
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
                  }
                )
              : null}
          </ul>
        </Container>
      </Box>

      <Container maxWidth='lg'>
        <div
          className={classes.portfolioWrapper}
          style={{ backgroundColor: portfolioForeGroundColor }}>
          <div style={{ color: portfolioTestColor, marginBottom: '50px' }}>
            <Typography variant={'h4'}>
              {state.selectedProjectData.clientName}
            </Typography>
          </div>
          <RenderCampaignDetails
            projectData={state.selectedProjectData}
            isPortfolioScreen={true}
            portfolioTestColor={portfolioTestColor}
          />
          <br />
          <RenderProjectDetails
            projectData={state.selectedProjectData}
            isPortfolioScreen={true}
            portfolioTestColor={portfolioTestColor}
          />
          <div className={classes.corosalWrapper}>
            <AssetUploadDisplay
              {...{
                assetIds: state.selectedProjectData.videos,
                accountId: account ? account.id : '',
                isVideo: true,
                isPortfolioScreen: true
              }}
            />
            <FeatureAssetUpload
              {...{
                assetIds: state.selectedProjectData.images,
                accountId: account ? account.id : '',
                featuredAsset: state.selectedProjectData.featuredImage,
                isPortfolioScreen: true
              }}
            />
          </div>
        </div>
      </Container>
    </Fragment>
  )
}
const mapStateToProps = (state: ReduxState): StateProps => ({
  portfolio: state.portfolio.portfolio as Portfolio,
  portfolioProjects: state.portfolio.portfolioProjects as Array<Project>,
  account: state.auth.account as Account | null
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
