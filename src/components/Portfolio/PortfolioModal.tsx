import React, { ChangeEvent, Fragment, useRef, useState } from 'react'
import CloseButton from 'components/Common/Button/CloseButton'
import { Portfolio, Project } from 'utils/Interface'
import AppTextField from 'components/Common/Core/AppTextField'
import AppModal from '../Common/Modal'
import { GradiantButton } from 'components/Common/Button/GradiantButton'
import {
  Button,
  Box,
  Typography,
  List,
  ListItemIcon,
  ListItem,
  Checkbox,
  ListItemText,
  ListItemAvatar,
  Avatar
} from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import { useStyles } from './style'
import { useOnChange } from 'utils/hooks'

type State = {
  portfolio: Portfolio
  isChooseProject: boolean
  isError: boolean
}

type Props = {
  open: boolean
  onRequestClose: () => void
  onSubmit: (portfolio: Portfolio) => void
  updatingFolder?: boolean
  projectList: Array<Project>
  portfolioLoading: boolean
}

export const PortfolioModal = ({
  open,
  onRequestClose,
  onSubmit,
  projectList,
  portfolioLoading
}: Props) => {
  let imageInputRef: any = useRef()
  const classes = useStyles()

  const [state, setState] = useState<State>({
    portfolio: {
      id: '',
      name: '',
      description: '',
      icon: '',
      projects: []
    },
    isChooseProject: false,
    isError: false
  })

  useOnChange(open, (open: boolean | null) => {
    if (open) {
      setState({
        portfolio: {
          id: '',
          name: '',
          description: '',
          icon: '',
          projects: []
        },
        isChooseProject: false,
        isError: false
      })
    }
  })

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
          {state.portfolio && !!state.portfolio.icon && (
            <img
              src={state.portfolio.icon}
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
              ? projectList.map((value: any, index: number) => {
                  const isProjectSelected = state.portfolio?.projects?.includes(
                    value.id
                  )
                  return (
                    <ListItem
                      key={index}
                      role={undefined}
                      dense
                      button
                      onClick={() => handleProjectSelect(value.id)}>
                      <ListItemIcon>
                        {isProjectSelected ? (
                          <CheckIcon color={'primary'} fontSize={'large'} />
                        ) : null}
                      </ListItemIcon>
                      <ListItemAvatar>
                        <Avatar alt='' src={value.logo} />
                      </ListItemAvatar>
                      <ListItemText
                        classes={{ root: classes.listItemText }}
                        primary={value.campaignName}
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

  return (
    <AppModal open={open} onRequestClose={onRequestClose} clickToClose={true}>
      <div className={classes.portfolioModal}>
        <div>
          <h2 className={classes.portfolioModalHead}>
            {!state.isChooseProject ? 'New Portfolio' : 'Choose Projects'}
          </h2>
          <span>
            {!state.isChooseProject ? 'Get Started' : 'Display your work'}
          </span>

          <CloseButton
            onClick={onRequestClose}
            style={{ position: 'absolute', top: 10, right: 10, fontSize: 50 }}
            isLarge={true}
          />
        </div>
        {!state.isChooseProject ? renderPortfolioLogoView() : null}
        {!state.isChooseProject ? renderDetails() : renderProjectList()}
        <GradiantButton
          onClick={() => {
            !state.isChooseProject
              ? handleProjectSection()
              : onSubmit(state.portfolio)
          }}
          className={classes.portfolioModalBtn}
          loading={portfolioLoading}>
          <Typography variant={'button'}>
            {!state.isChooseProject ? 'Continue' : 'Create portfolio'}
          </Typography>
        </GradiantButton>
      </div>
    </AppModal>
  )
}
