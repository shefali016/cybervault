import { Portfolio, PortfolioFolder } from '../../../utils/types'
import { ReduxState } from 'reducers/rootReducer'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
  CENTER,
  FLEX,
  POSITION_ABSOLUTE,
  POSITION_RELATIVE,
  ROW
} from 'utils/constants/stringConstants'
import AddIcon from '@material-ui/icons/Add'
import Portfolios from './portfolios'
import { PortfolioModal } from 'components/Portfolio/PortfolioModal'
import { useState } from 'react'
import { GREY_COLOR, TRANSPARENT } from 'utils/constants/colorsConstants'

type StateProps = {
  folderList: Array<PortfolioFolder>
  loading: boolean
  updatingFolder: boolean
}

type InitialStates = {
  isModalOpen: boolean
  portfolio: Portfolio
  isError: boolean
}

type Props = {} & StateProps

const PortfoliosScreen = ({}: Props) => {
  const classes = useStyles()

  /* Initial State Data */
  const [state, setState] = useState<InitialStates>({
    isModalOpen: false,
    portfolio: {
      id: '',
      name: '',
      description: '',
      icon: '',
      projects: []
    },
    isError: false
  })

  const handleModalRequest = () => {
    setState({
      ...state,
      isModalOpen: !state.isModalOpen,
      isError: false
    })
  }

  const handleSubmit = () => {}

  const handleInputChange = (e: any, key: string) => {
    const { value } = e.target
    setState({
      ...state,
      portfolio: {
        ...state.portfolio,
        [key]: value
      }
    })
  }

  const handleImageChange = async (event: any) => {
    if (event.target && event.target.files && event.target.files.length > 0) {
      setState({
        ...state,
        portfolio: {
          ...state.portfolio,
          icon: URL.createObjectURL(event.target.files[0])
        }
      })
    }
  }

  const renderPortfolioModal = () => {
    return (
      <PortfolioModal
        open={state.isModalOpen}
        onRequestClose={() => handleModalRequest()}
        portfolio={state.portfolio}
        onSubmit={() => handleSubmit()}
        handleInputChange={(e: any, key: string) => handleInputChange(e, key)}
        portfolioModal={classes.portfolioModal}
        portfolioModalBtn={classes.portfolioModalBtn}
        portfolioModalHead={classes.portfolioModalHead}
        handleChange={(event: any) => handleImageChange(event)}
        portfolioLogo={classes.portfolioLogo}
        portfolioLogoImg={classes.portfolioLogoImg}
        addLogoText={classes.addLogoText}
        portfolioLogoContainer={classes.portfolioLogoContainer}
      />
    )
  }

  return (
    <div>
      <div className={classes.portfolioBoxMainWrap}>
        <div
          onClick={() => handleModalRequest()}
          className={classes.portfolioBoxWrap}>
          <div className={classes.portfolioBox}>
            <AddIcon className={classes.buttonIcon} />
            <h5>Add Portfolio</h5>
          </div>
        </div>
        <div className={ROW}>
          <Portfolios />
        </div>
      </div>
      {renderPortfolioModal()}
    </div>
  )
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  folderList: state.portfolio.folders as Array<PortfolioFolder>,
  loading: state.portfolio.loading as boolean,
  updatingFolder: state.portfolio.updatingFolder as boolean
})
const mapDispatchToProps = (dispatch: any) => ({})

const useStyles = makeStyles((theme) => ({
  portfolioBoxMainWrap: {
    width: '25%',
    margin: '16px',
    display: 'block'
  },
  buttonIcon: {
    marginRight: 4,
    marginLeft: -28,
    color: '#5389fc',
    fontSize: 30,
    marginTop: '22px'
  },
  portfolioBox: {
    display: FLEX,
    justifyContent: CENTER
  },
  portfolioBoxWrap: {
    cursor: 'pointer',
    padding: '0px',
    textAlign: CENTER,
    borderRadius: '20px',
    marginBottom: '30px',
    background: '#fff',
    color: '#5389fc',
    fontSize: '20px'
  },
  portfolioModalHead: {
    margin: 0
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
  portfolioModalBtn: {
    width: '200px',
    margin: '50px auto 0'
  },
  loader: {
    textAlign: CENTER,
    margin: '0 auto'
  },
  portfolioLogo: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: TRANSPARENT,
    marginBottom: 5,
    overflow: 'hidden'
  },
  portfolioLogoContainer: {
    display: FLEX,
    marginTop: 3,
    alignItems: CENTER,
    justifyContent: CENTER
  },
  portfolioLogoImg: {
    height: 80,
    borderRadius: 40,
    position: POSITION_ABSOLUTE
  },
  addLogoText: {
    fontSize: 10,
    color: GREY_COLOR
  },
  image: {}
}))
export default connect(mapStateToProps, mapDispatchToProps)(PortfoliosScreen)
