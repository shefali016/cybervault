import { PortfolioFolder } from '../../../utils/types'
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
  POSITION_RELATIVE
} from 'utils/constants/stringConstants'

type StateProps = {
  folderList: Array<PortfolioFolder>
  loading: boolean
  updatingFolder: boolean
}

type PortfolioStates = {
  isModalOpen: boolean
  folder: PortfolioFolder
  isError: boolean
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
    isError: false
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

  const handleDeleteFolder = (folderId: string) => {
    try {
      deletePortfolioFolder(folderId)
    } catch (error) {
      return error
    }
  }

  const handlePortfolioFolder = (folderId: string) => {
    history.push(`/portfolio/id=${folderId}`)
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
            handlePortfolioFolder={(folderId: string) =>
              handlePortfolioFolder(folderId)
            }
            portfoliosCard={classes.portfoliosCard}
            portfolioFolderTitle={classes.portfolioFolderTitle}
            buttonIcon={classes.buttonIcon}
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
    width: '230px',
    height: '50px',
    display: 'flex',
    borderRadius: '15px',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#5ea5fc',
    fontWeight: 600,
    cursor: 'pointer'
  },
  portfolioFolderTitle: {
    marginBottom: '10px'
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
