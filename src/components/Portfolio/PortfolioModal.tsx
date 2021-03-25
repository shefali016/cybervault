import React, {
  ChangeEvent,
  Fragment,
  useContext,
  useRef,
  useState
} from 'react'
import CloseButton from 'components/Common/Button/CloseButton'
import { Client, Portfolio, Project } from 'utils/Interface'
import AppTextField from 'components/Common/Core/AppTextField'
import AppModal from '../Common/Modal'
import { GradiantButton } from 'components/Common/Button/GradiantButton'
import {
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar
} from '@material-ui/core'
import { useStyles } from './style'
import { useOnChange } from 'utils/hooks'
import ModalTitle from 'components/Common/Modal/ModalTitle'
import clsx from 'clsx'
import { setMedia } from 'apis/assets'
import { generateUid } from 'utils'
import { ToastContext, ToastTypes } from 'context/Toast'

type State = {
  portfolio: Portfolio
  isChooseProject: boolean
  isError: boolean
  iconFile: string
  uploadingIcon: boolean
}

type AddPortfolioProps = {
  folderId: string | undefined
  onSubmit: (portfolio: Portfolio) => void
  updatingFolder?: boolean
  projectList: Array<Project>
  loading: boolean
  error: string | null
  success: boolean
  clients: Array<Client>
  portfolio?: Portfolio | {}
  isEditingProject?: boolean
}

export const AddPortfolio = ({
  onSubmit,
  projectList,
  loading,
  error,
  success,
  clients,
  folderId,
  portfolio,
  isEditingProject
}: AddPortfolioProps) => {
  let imageInputRef: any = useRef()
  const classes = useStyles()
  const toastContent = useContext(ToastContext)

  const [state, setState] = useState<State>({
    portfolio: Object.assign(
      {
        id: '',
        name: '',
        description: '',
        icon: '',
        projects: [],
        folderId: folderId || ''
      },
      portfolio || {}
    ),
    iconFile: '',
    isChooseProject: !!isEditingProject,
    isError: false,
    uploadingIcon: false
  })

  const isEditing = isEditingProject || !!portfolio

  useOnChange(error, (error) => {
    if (error && state.uploadingIcon) {
      setState((state) => ({ ...state, uploadingIcon: false }))
    }
  })

  const handleSubmit = async () => {
    let icon = state.portfolio.icon

    try {
      if (!state.portfolio.projects.length) {
        throw Error('Select a project first.')
      }

      if (state.iconFile) {
        setState((state) => ({ ...state, uploadingIcon: true }))
        const iconId = generateUid()
        const iconUrl = await setMedia(iconId, state.iconFile)
        if (typeof iconUrl === 'string') {
          icon = iconUrl
        } else {
          throw Error('Failed to upload icon')
        }
      }

      if (typeof folderId !== 'string') {
        throw Error('Missing folder')
      }

      onSubmit({
        ...state.portfolio,
        id: state.portfolio.id || generateUid(),
        icon,
        folderId,
        createdAt: Date.now()
      })
    } catch (error) {
      setState((state) => ({ ...state, uploadingIcon: true }))
      toastContent.showToast({ title: error.message, type: ToastTypes.error })
    }
  }

  const handleImageChange = async (event: any) => {
    if (event.target && event.target.files && event.target.files.length > 0) {
      setState({
        ...state,
        iconFile: event.target.files[0],
        portfolio: {
          ...state.portfolio
        }
      })
    }
  }

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
    let projectsData = portfolio && portfolio.projects ? portfolio.projects : []
    const isProjectId = portfolio?.projects?.includes(projectId)
    if (isProjectId) {
      if (portfolio && portfolio.projects && portfolio.projects.length) {
        projectsData = portfolio.projects.filter((item) => item !== projectId)
      }
    } else {
      projectsData.push(projectId)
    }
    setState({
      ...state,
      portfolio: {
        ...state.portfolio,
        projects: projectsData
      }
    })
  }

  const renderPortfolioLogoView = () => {
    return (
      <div className={classes.portfolioLogoContainer}>
        <Button
          variant='contained'
          onClick={() => imageInputRef.click()}
          className={classes.portfolioLogo}>
          <input
            type='file'
            accept='image/*'
            capture='camera'
            name='avatar'
            ref={(input) => {
              imageInputRef = input
            }}
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
          {(!!state.iconFile || !!state.portfolio.icon) && (
            <img
              src={
                state.iconFile
                  ? URL.createObjectURL(state.iconFile)
                  : state.portfolio.icon || ''
              }
              className={classes.portfolioLogoImg}
              alt={'portfolio-logo'}
            />
          )}
        </Button>
      </div>
    )
  }

  const renderDetails = () => {
    return (
      <Fragment>
        <div style={{ marginTop: '10px' }}>
          <AppTextField
            error={
              state.portfolio && !state.portfolio.name && state.isError
                ? true
                : false
            }
            type={''}
            label={'Enter Portfolio Name'}
            value={
              state.portfolio && state.portfolio.name
                ? state.portfolio.name
                : ''
            }
            onChange={(e: ChangeEvent) => handleInputChange(e, 'name')}
          />
          <AppTextField
            error={false}
            type={''}
            multiline={true}
            label={'Enter Portfolio Description (Optional)'}
            value={
              state.portfolio && state.portfolio.description
                ? state.portfolio.description
                : ''
            }
            onChange={(e: ChangeEvent) => handleInputChange(e, 'description')}
          />
        </div>
      </Fragment>
    )
  }

  const renderProjectList = () => {
    return (
      <Fragment>
        <div style={{ marginTop: '10px' }}>
          <List>
            {projectList && projectList.length
              ? projectList.map((project: Project, index: number) => {
                  const isProjectSelected = state.portfolio?.projects?.includes(
                    project.id
                  )
                  const client = clients
                    ? clients.find(
                        (client: Client) => client.id === project.clientId
                      )
                    : null
                  return (
                    <ListItem
                      key={index}
                      role={undefined}
                      button
                      onClick={() => handleProjectSelect(project.id)}
                      className={clsx(
                        classes.listProject,
                        isProjectSelected ? classes.selectedProject : ''
                      )}>
                      <ListItemAvatar>
                        <Avatar
                          alt={`${project.campaignName}-icon`}
                          src={client ? client.logo : null}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        classes={{
                          root: clsx(
                            classes.listItemText,
                            isProjectSelected ? classes.selectedProjectText : ''
                          )
                        }}
                        primary={project.campaignName}
                      />
                    </ListItem>
                  )
                })
              : null}
          </List>
        </div>
      </Fragment>
    )
  }

  const getTitle = () => {
    if (state.isChooseProject) {
      return 'Choose Projects'
    }
    if (!isEditing) {
      return 'New Portfolio'
    }
    return 'Edit Portfolio'
  }

  const getSubTitle = () => {
    if (state.isChooseProject) {
      return 'Display your work'
    }
    if (!isEditing) {
      return 'Get Started'
    }
    return 'Update details'
  }

  const handleButtonClick = () => {
    if (state.isChooseProject || isEditing) {
      handleSubmit()
    } else {
      handleProjectSection()
    }
  }

  return (
    <React.Fragment>
      <ModalTitle title={getTitle()} subtitle={getSubTitle()} />
      {!state.isChooseProject ? renderPortfolioLogoView() : null}
      {!state.isChooseProject ? renderDetails() : renderProjectList()}
      <GradiantButton
        onClick={handleButtonClick}
        className={classes.portfolioModalBtn}
        loading={loading || state.uploadingIcon}>
        <Typography variant={'button'}>
          {isEditing
            ? 'Save '
            : !state.isChooseProject
            ? 'Continue'
            : 'Create portfolio'}
        </Typography>
      </GradiantButton>
    </React.Fragment>
  )
}

type PortfolioModalProps = {
  open: boolean
  onRequestClose: () => void
} & AddPortfolioProps

export const PortfolioModal = ({
  open,
  onRequestClose,
  onSubmit,
  projectList,
  loading,
  error,
  success,
  clients,
  folderId,
  portfolio,
  isEditingProject
}: PortfolioModalProps) => {
  useOnChange(success, (success) => {
    if (success) {
      onRequestClose()
    }
  })
  return (
    <AppModal open={open} onRequestClose={onRequestClose} clickToClose={true}>
      <div className={'modalContent'}>
        <CloseButton
          onClick={onRequestClose}
          style={{ position: 'absolute', top: 10, right: 10 }}
        />
        <AddPortfolio
          {...{
            isEditingProject,
            portfolio,
            onSubmit,
            projectList,
            loading,
            error,
            success,
            clients,
            folderId
          }}
        />
      </div>
    </AppModal>
  )
}
