import { getPortfolioRequest } from 'actions/portfolioActions'
import { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { ReduxState } from 'reducers/rootReducer'
import { Portfolio, Project } from 'utils/Interface'
import { Box, Container } from '@material-ui/core'
import { useStyles } from './style'

type StateProps = {
  portfolio: Portfolio
  portfolioProjects: Array<Project>
}
type initialState = {
  portfolio: Portfolio
}
type Props = {
  location: any
  getPortfolioFolders: (portfolioId: string) => void
} & StateProps

const EditPortfolioScreen = ({
  location,
  getPortfolioFolders,
  portfolio,
  portfolioProjects
}: Props) => {
  const classes = useStyles()

  const [state, setState] = useState<initialState>({
    portfolio: {
      id: '',
      name: '',
      description: '',
      icon: '',
      projects: []
    }
  })

  useEffect(() => {
    if (portfolio) {
      setState({
        ...state,
        portfolio
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portfolio])

  useEffect(() => {
    const paths = location.pathname.split('/')
    if (paths[1] === 'portfolio' && paths.length > 2) {
      handlePortfolioAction(paths[2])
      setState({
        ...state,
        portfolio: {
          ...state.portfolio,
          id: paths[2]
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  const handlePortfolioAction = (portfolioId: string) => {
    getPortfolioFolders(portfolioId)
  }

  return (
    <Fragment>
      <Box className={classes.portfolioTabsWrap}>
        <Container maxWidth='lg'>
          <ul className={classes.portfoloTabsList}>
            {portfolioProjects && portfolioProjects.length
              ? portfolioProjects.map(
                  (project: Project | any, index: number) => {
                    return (
                      <li key={index} className='active'>
                        {project.campaignName}
                      </li>
                    )
                  }
                )
              : null}
          </ul>
        </Container>
      </Box>
    </Fragment>
  )
}
const mapStateToProps = (state: ReduxState): StateProps => ({
  portfolio: state.portfolio.portfolio as Portfolio,
  portfolioProjects: state.portfolio.portfolioProjects as Array<Project>
})
const mapDispatchToProps = (dispatch: any) => ({
  getPortfolioFolders: (portfolioId: string) => {
    return dispatch(getPortfolioRequest(portfolioId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditPortfolioScreen)
