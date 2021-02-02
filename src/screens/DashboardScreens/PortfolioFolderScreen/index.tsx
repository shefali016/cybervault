import { PortfolioFolder } from '../../../utils/Interface'
import { ReduxState } from 'reducers/rootReducer'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
  CENTER,
  FLEX,
  POSITION_RELATIVE
} from 'utils/constants/stringConstants'

type StateProps = {
  folderList: Array<PortfolioFolder>
  loading: boolean
  updatingFolder: boolean
}
type Props = {} & StateProps

const PortfoliosScreen = ({}: Props) => {
  const classes = useStyles()

  return <div>Portfolio Folder works!!</div>
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  folderList: state.portfolio.folders as Array<PortfolioFolder>,
  loading: state.portfolio.loading as boolean,
  updatingFolder: state.portfolio.updatingFolder as boolean
})
const mapDispatchToProps = (dispatch: any) => ({})

const useStyles = makeStyles((theme) => ({
  portfolioBoxMainWrap: {
    width: '95%',
    display: 'block',
    margin: '0 auto',
    color: '#9ea0a28c'
  },
  portfolioFolder: {
    width: '200px',
    height: '200px',
    display: 'flex',
    position: 'relative',
    borderRadius: '15px',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '10px'
  },
  portfolioBox: {},
  portfolioModalBtn: {
    width: '200px',
    margin: '50px auto 0'
  },
  portfolioModal: {
    color: '#24262b',
    display: FLEX,
    outline: 'none',
    padding: '52px 54px',
    position: POSITION_RELATIVE,
    maxHeight: '80vh',
    overflowY: 'scroll',
    borderRadius: '42px',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    width: '100%',
    maxWidth: '500px'
  },
  portfolioBoxWrap: {
    borderRadius: '18px',
    border: '4px dashed #9ea0a28c',
    textAlign: 'center',
    marginBottom: '30px',
    padding: '40px',
    cursor: 'pointer'
  },
  portfolioModalHead: {
    margin: 0
  },
  loader: {
    textAlign: CENTER,
    margin: '0 auto'
  },
  image: {}
}))
export default connect(mapStateToProps, mapDispatchToProps)(PortfoliosScreen)
