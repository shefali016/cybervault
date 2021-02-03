import { PortfolioFolder } from '../../../utils/Interface'
import { ReduxState } from 'reducers/rootReducer'
import { connect } from 'react-redux'
import iconFolderUpload from '../../../assets/iconFolderUpload.png'
import PortfolioFolders from '../../../components/Portfolio/portfolioFolders'
import { PortfolioFolderModal } from 'components/Portfolio/PortfolioFolderModal'
import { useEffect, useState } from 'react'
import {
  deletePortfolioFolderRequest,
  getPortfolioFolderRequest,
  updatePortfolioFolderRequest
} from 'actions/portfolioActions'
import { useStyles } from './style'

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
            folderList={folderList}
            loading={loading}
            handleEditFolderDetail={(folder: PortfolioFolder) =>
              handleEditFolderDetail(folder)
            }
            deletefolder={(folderId: string) => handleDeleteFolder(folderId)}
            handlePortfolioFolder={(folderId: string) =>
              handlePortfolioFolder(folderId)
            }
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
  loading: state.portfolio.getFoldersLoading as boolean,
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

export default connect(mapStateToProps, mapDispatchToProps)(PortfoliosScreen)
