import { Account } from '../../utils/types'
import { ReduxState } from 'reducers/rootReducer'
import { connect } from 'react-redux'
import { useTheme } from '@material-ui/core/styles'

type StateProps = {}
type Props = {} & StateProps

const InvoicesScreen = ({}: Props) => {
  const theme = useTheme()

  return <div className={'screenContainer'}></div>
}

const mapState = (state: ReduxState): StateProps => ({
  account: state.auth.account as Account
})

export default connect(mapState)(InvoicesScreen)
