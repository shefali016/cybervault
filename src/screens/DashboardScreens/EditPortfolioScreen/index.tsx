import { getPortfolioRequest } from 'actions/portfolioActions'
import { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { ReduxState } from 'reducers/rootReducer'
import { Portfolio } from 'utils/Interface'

type StateProps = {}
type initialState = {
  portfolio: Portfolio
}
type Props = {
  location: any
  getPortfolioFolders: (portfolioId: string) => void
} & StateProps
const EditPortfolioScreen = ({ location, getPortfolioFolders }: Props) => {
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

  return <Fragment>Edit Portfolio Works!!</Fragment>
}
const mapStateToProps = (state: ReduxState): StateProps => ({})
const mapDispatchToProps = (dispatch: any) => ({
  getPortfolioFolders: (portfolioId: string) => {
    return dispatch(getPortfolioRequest(portfolioId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditPortfolioScreen)
