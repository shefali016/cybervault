import { Portfolio, PortfolioFolder } from '../../../utils/types'
import { ReduxState } from 'reducers/rootReducer'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import iconFolderUpload from '../../../assets/iconFolderUpload.png'
import PortfolioFolders from './portfolioFolders'
import { PortfolioFolderModal } from 'components/Portfolio/PortfolioFolderModal'
import { useEffect, useState } from 'react'
import {
  deletePortfolioFolderRequest,
  getPortfolioFolderRequest,
  updatePortfolioFolderRequest
} from 'actions/portfolioActions'
import {
  CENTER,
  FLEX,
  POSITION_ABSOLUTE,
  POSITION_RELATIVE
} from 'utils/constants/stringConstants'
import { GREY_COLOR, TRANSPARENT } from 'utils/constants/colorsConstants'

type StateProps = {
  folderList: Array<PortfolioFolder>
  loading: boolean
  updatingFolder: boolean
}

type PortfolioStates = {
  isModalOpen: boolean
  folder: PortfolioFolder
  isError: boolean
  portfolio: Portfolio
  isPortfolioModalOpen: boolean
}
type Props = {
  updatePortfolioFolder: (folder: PortfolioFolder) => void
  getPortfolioFolders: () => void
  deletePortfolioFolder: (folderId: string) => void
  history: any
} & StateProps

const PortfoliosScreen = ({
  updatePortfolioFolder,
  getPortfolioFolders,
  folderList,
  loading,
  updatingFolder,
  deletePortfolioFolder,
  history
}: Props) => {
  const classes = useStyles()

  useEffect(() => {
    getPortfolioFolders()
  }, [])

  /* Initial State Data */
  const [state, setState] = useState<PortfolioStates>({
    isModalOpen: false,
    folder: {
      id: '',
      name: '',
      description: '',
      portfolios: []
    },
    portfolio: {
      id: '',
      name: '',
      description: '',
      icon: '',
      projects: []
    },
    isError: false,
    isPortfolioModalOpen: false
  })

  const resetStateData = () => {
    setState({
      ...state,
      folder: {
        id: '',
        name: '',
        description: '',
        portfolios: []
      },
      isModalOpen: !state.isModalOpen,
      isError: false
    })
  }

  const handleModalRequest = () => {
    setState({
      ...state,
      isModalOpen: !state.isModalOpen,
      isError: false
    })
  }

  const handlePortfolioModalRequest = () => {
    setState({
      ...state,
      isPortfolioModalOpen: !state.isPortfolioModalOpen
    })
  }

  const handleInputChange = (e: any, key: string) => {
    const { value } = e.target
    setState({
      ...state,
      folder: {
        ...state.folder,
        [key]: value
      }
    })
  }

  const handlePortfolioInputchange = (e: any, key: string) => {
    const { value } = e.target
    setState({
      ...state,
      portfolio: {
        ...state.portfolio,
        [key]: value
      }
    })
  }

  const handleEditFolderDetail = (folder: PortfolioFolder) => {
    setState({
      ...state,
      folder,
      isModalOpen: true
    })
  }

  const handleSubmit = () => {
    const { folder } = state
    if (folder && folder.name) {
      updatePortfolioFolder(folder)
      resetStateData()
    } else {
      setState({
        ...state,
        isError: true
      })
    }
  }

  const handlePortfolioSubmit = () => {}

  const handleDeleteFolder = (folderId: string) => {
    try {
      deletePortfolioFolder(folderId)
    } catch (error) {
      return error
    }
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

  const renderPortfolioFolderModal = () => {
    return (
      <PortfolioFolderModal
        open={state.isModalOpen}
        onRequestClose={() => handleModalRequest()}
        folder={state.folder}
        onSubmit={() => handleSubmit()}
        handleInputChange={(e: any, key: string) => handleInputChange(e, key)}
        portfolioModal={classes.portfolioModal}
        portfolioModalBtn={classes.portfolioModalBtn}
        portfolioModalHead={classes.portfolioModalHead}
        updatingFolder={updatingFolder}
        isError={state.isError}
      />
    )
  }

  return (
    <div>
      <div className={classes.portfolioBoxMainWrap}>
        <div>
          <PortfolioFolders
            portfolioFolder={classes.portfolioFolder}
            folderList={folderList}
            loading={loading}
            loader={classes.loader}
            handleEditFolderDetail={(folder: PortfolioFolder) =>
              handleEditFolderDetail(folder)
            }
            deletefolder={(folderId: string) => handleDeleteFolder(folderId)}
            portfoliosCard={classes.portfoliosCard}
            portfolioFolderTitle={classes.portfolioFolderTitle}
            buttonIcon={classes.buttonIcon}
            logoCOntent={classes.logoCOntent}
            cardLogo={classes.cardLogo}
            portfolio={state.portfolio}
            isModalOpen={state.isPortfolioModalOpen}
            handleModalRequest={handlePortfolioModalRequest}
            handleSubmit={handlePortfolioSubmit}
            handleInputChange={handlePortfolioInputchange}
            portfolioModal={classes.portfolioModal}
            portfolioModalBtn={classes.portfolioModalBtn}
            portfolioModalHead={classes.portfolioModalHead}
            handleImageChange={handleImageChange}
            portfolioLogo={classes.portfolioLogo}
            portfolioLogoImg={classes.portfolioLogoImg}
            addLogoText={classes.addLogoText}
            portfolioLogoContainer={classes.portfolioLogoContainer}
          />
        </div>
        <div
          onClick={() => handleModalRequest()}
          className={classes.portfolioBoxWrap}>
          <div className={classes.portfolioBox}>
            <img src={iconFolderUpload} alt='icon' className={classes.image} />
            <h5>Create Folder</h5>
          </div>
        </div>
      </div>
      {renderPortfolioFolderModal()}
    </div>
  )
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  folderList: state.portfolio.folders as Array<PortfolioFolder>,
  loading: state.portfolio.loading as boolean,
  updatingFolder: state.portfolio.updatingFolder as boolean
})
const mapDispatchToProps = (dispatch: any) => ({
  updatePortfolioFolder: (folder: PortfolioFolder) => {
    return dispatch(updatePortfolioFolderRequest(folder))
  },
  getPortfolioFolders: () => {
    return dispatch(getPortfolioFolderRequest())
  },
  deletePortfolioFolder: (folderId: string) => {
    return dispatch(deletePortfolioFolderRequest(folderId))
  }
})

const useStyles = makeStyles((theme) => ({
  portfolioBoxMainWrap: {
    width: '95%',
    display: 'block',
    margin: '0 auto',
    color: '#9ea0a28c'
  },
  portfolioFolder: {
    color: '#fff',
    marginBottom: '20px'
  },
  buttonIcon: {
    marginRight: 5,
    marginLeft: -30,
    fontSize: 30
  },
  portfoliosCard: {
    display: 'flex',
    borderRadius: '15px',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#5ea5fc',
    fontWeight: 600,
    cursor: 'pointer',
    padding: '15px 4px 15px 15px',
    height: '100%',
    boxSizing: 'border-box'
  },
  portfolioFolderTitle: {
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    '& span': {
      marginLeft: 10,
      cursor: 'pointer',
      '& svg': {
        width: 18
      }
    }
  },
  portfolioLogo: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: TRANSPARENT,
    marginBottom: 5,
    overflow: 'hidden'
  },
  logoCOntent: {
    width: 'calc(100% - 108px)',
    padding: '0 0px 0 15px',

    '& h5': {
      color: '#353535',
      fontSize: '14px',
      margin: '0 0 5px 0',
      fontWeight: 500,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    '& p ': {
      fontSize: '10px',
      color: '#000',
      fontWeight: 300,
      margin: 0,
      textAlign: 'right'
    }
  },
  cardLogo: {
    width: 60,
    '& img': {
      maxWidth: '100%'
    }
  },
  portfolioBox: {},
  portfolioLogoImg: {
    height: 80,
    borderRadius: 40,
    position: POSITION_ABSOLUTE
  },
  addLogoText: {
    fontSize: 10,
    color: GREY_COLOR
  },
  portfolioLogoContainer: {
    display: FLEX,
    marginTop: 3,
    alignItems: CENTER,
    justifyContent: CENTER
  },
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
    marginTop: '30px',
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
