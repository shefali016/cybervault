import { Portfolio, PortfolioFolder, Project } from '../../../utils/Interface'
import { ReduxState } from 'reducers/rootReducer'
import { connect } from 'react-redux'
import PortfolioFolders from '../../../components/Portfolio/PortfolioFolders'
import { PortfolioFolderModal } from 'components/Portfolio/PortfolioFolderModal'
import { useEffect, useState } from 'react'
import {
  deletePortfolioFolderRequest,
  getPortfolioFolderRequest,
  updatePortfolioFolderRequest,
  updatePortfolioRequest
} from 'actions/portfolioActions'
import { useStyles } from './style'
import FolderIcon from '@material-ui/icons/Folder'
import { Typography } from '@material-ui/core'

type StateProps = {
  folderList: Array<PortfolioFolder>
  loading: boolean
  updatingFolder: boolean
  allProjectsData: Array<Project>
  portfolioLoading: boolean
  portfolios: Map<string, Portfolio>
}

type PortfolioStates = {
  isModalOpen: boolean
  folder: PortfolioFolder
  isError: boolean
  portfolio: Portfolio
  isPortfolioModalOpen: boolean
  isChooseProject: boolean
}
type Props = {
  updatePortfolioFolder: (folder: PortfolioFolder) => void
  getPortfolioFolders: () => void
  deletePortfolioFolder: (folderId: string) => void
  history: any
  updatePortfolio: (portfolio: Portfolio, folderId: string) => void
} & StateProps

const PortfoliosScreen = ({
  updatePortfolioFolder,
  getPortfolioFolders,
  folderList,
  allProjectsData,
  loading,
  updatingFolder,
  deletePortfolioFolder,
  history,
  updatePortfolio,
  portfolioLoading,
  portfolios
}: Props) => {
  const classes = useStyles()

  useEffect(() => {
    getPortfolioFolders()
  }, [])

  /* Initial State Data */
  const [state, setState] = useState<PortfolioStates>({
    isModalOpen: false,
    isChooseProject: false,
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
      isModalOpen: false,
      isChooseProject: false,
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
  }

  const handleModalRequest = ({ type, folder }: any) => {
    if (type === 'folder') {
      setState({
        ...state,
        isModalOpen: !state.isModalOpen,
        isError: false
      })
    } else {
      setState({
        ...state,
        folder: folder,
        isPortfolioModalOpen: !state.isPortfolioModalOpen,
        isChooseProject: false,
        isError: false,
        portfolio: {
          id: '',
          name: '',
          description: '',
          icon: '',
          projects: []
        }
      })
    }
  }

  const handleInputChange = (e: any, key: string, type: string) => {
    const { value } = e.target
    if (type === 'folder') {
      setState({
        ...state,
        folder: {
          ...state.folder,
          [key]: value
        }
      })
    } else {
      setState({
        ...state,
        portfolio: {
          ...state.portfolio,
          [key]: value
        }
      })
    }
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

  const handlePortfolioSubmit = (portfolio: Portfolio) => {
    const { folder } = state
    updatePortfolio(portfolio, folder.id)
    // resetStateData()
  }

  const handleDeleteFolder = (folderId: string) => {
    try {
      deletePortfolioFolder(folderId)
    } catch (error) {
      return error
    }
  }

  const renderPortfolioFolderModal = () => {
    return (
      <PortfolioFolderModal
        open={state.isModalOpen}
        onRequestClose={(type: string) => handleModalRequest({ type })}
        folder={state.folder}
        onSubmit={() => handleSubmit()}
        handleInputChange={(e: any, key: string) =>
          handleInputChange(e, key, 'folder')
        }
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
            isModalOpen={state.isPortfolioModalOpen}
            handleModalRequest={handleModalRequest}
            handleSubmit={handlePortfolioSubmit}
            portfolios={portfolios}
            projectList={allProjectsData}
            portfolioLoading={portfolioLoading}
          />
        </div>
        <div
          onClick={() => handleModalRequest({ type: 'folder' })}
          className={classes.portfolioBoxWrap}>
          <div className={classes.portfolioBox}>
            <FolderIcon className={classes.uploadFolderIcon} />
            <Typography variant='h6'>Create Folder</Typography>
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
  portfolioLoading: state.portfolio.getPortfolioLoading as boolean,
  updatingFolder: state.portfolio.updatingFolder as boolean,
  allProjectsData: state.project.allProjectsData as Array<Project>,
  portfolios: state.portfolio.portfolios as Map<string, Portfolio>
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
  },
  updatePortfolio: (portfolio: Portfolio, folderId: string) => {
    return dispatch(updatePortfolioRequest(portfolio, folderId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(PortfoliosScreen)
