import { Portfolio, PortfolioFolder, Project } from '../../../utils/types'
import { ReduxState } from 'reducers/rootReducer'
import { connect } from 'react-redux'
import iconFolderUpload from '../../../assets/iconFolderUpload.png'
import PortfolioFolders from './portfolioFolders'
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
  allProjectsData: Array<Project>
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
} & StateProps

const PortfoliosScreen = ({
  updatePortfolioFolder,
  getPortfolioFolders,
  folderList,
  allProjectsData,
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

  const handleModalRequest = (type: string) => {
    if (type === 'folder') {
      setState({
        ...state,
        isModalOpen: !state.isModalOpen,
        isError: false
      })
    } else {
      setState({
        ...state,
        isPortfolioModalOpen: !state.isPortfolioModalOpen,
        isError: false
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

  const handleProjectSection = () => {
    const { portfolio } = state
    if (portfolio && portfolio.name) {
      setState({
        ...state,
        isChooseProject: true
      })
    } else {
      setState({
        ...state,
        isError: true
      })
    }
  }

  const handleProjectSelect = (projectId: string) => {
    const { portfolio } = state
    const projects = portfolio && portfolio.projects ? portfolio.projects : []
    const isProjectSelected = portfolio?.projects?.includes(projectId)
    console.log('>>>>>>>>>>>>isProjectSelected', isProjectSelected)

    if (isProjectSelected) {
      projects.filter((item: any) => item !== projectId)
      console.log('projectsprojectsprojects', projects)
    } else {
      projects.push(projectId)
    }
    setState({
      ...state,
      portfolio: {
        ...state.portfolio,
        projects
      }
    })
  }

  const renderPortfolioFolderModal = () => {
    return (
      <PortfolioFolderModal
        open={state.isModalOpen}
        onRequestClose={(type: string) => handleModalRequest(type)}
        folder={state.folder}
        onSubmit={() => handleSubmit()}
        handleInputChange={(e: any, key: string) =>
          handleInputChange(e, key, 'folder')
        }
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
            folderList={folderList}
            loading={loading}
            handleEditFolderDetail={(folder: PortfolioFolder) =>
              handleEditFolderDetail(folder)
            }
            deletefolder={(folderId: string) => handleDeleteFolder(folderId)}
            portfolio={state.portfolio}
            isModalOpen={state.isPortfolioModalOpen}
            handleModalRequest={handleModalRequest}
            handleSubmit={handlePortfolioSubmit}
            handleInputChange={(e: any, key: string) =>
              handleInputChange(e, key, 'portfolio')
            }
            handleImageChange={handleImageChange}
            handleProjectSection={handleProjectSection}
            isError={state.isError}
            isChooseProject={state.isChooseProject}
            projectList={allProjectsData}
            handleProjectSelect={(projectId: string) =>
              handleProjectSelect(projectId)
            }
          />
        </div>
        <div
          onClick={() => handleModalRequest('folder')}
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
  updatingFolder: state.portfolio.updatingFolder as boolean,
  allProjectsData: state.project.allProjectsData as Array<Project>
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
