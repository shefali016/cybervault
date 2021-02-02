import React, { ChangeEvent, Fragment, useRef } from 'react'
import CloseButton from 'components/Common/Button/CloseButton'
import { Portfolio, Project } from 'utils/types'
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

type Props = {
  open: boolean
  onRequestClose: () => void
  portfolio: Portfolio | null
  onSubmit: () => void
  handleInputChange: (event: any, key: string) => void
  portfolioModal: string
  portfolioModalBtn: string
  portfolioModalHead: string
  updatingFolder?: boolean
  isError?: boolean
  handleChange: (event: any) => void
  portfolioLogo: string
  portfolioLogoImg: string
  portfolioLogoContainer: string
  handleProjectSection: () => void
  isChooseProject: boolean
  projectList: Array<Project>
  listItemText: string
  handleProjectSelect: (projectId: string) => void
  portfolioLoading: boolean
}

export const PortfolioModal = ({
  open,
  onRequestClose,
  portfolio,
  handleInputChange,
  onSubmit,
  portfolioModal,
  portfolioModalBtn,
  portfolioModalHead,
  updatingFolder,
  isError,
  handleChange,
  portfolioLogo,
  portfolioLogoImg,
  portfolioLogoContainer,
  handleProjectSection,
  projectList,
  isChooseProject,
  listItemText,
  handleProjectSelect,
  portfolioLoading
}: Props) => {
  let imageInputRef: any = useRef()

  const renderPortfolioLogoView = () => {
    return (
      <div className={portfolioLogoContainer}>
        <Button
          variant='contained'
          onClick={() => imageInputRef.click()}
          className={portfolioLogo}>
          <input
            type='file'
            accept='image/*'
            capture='camera'
            name='avatar'
            ref={(input) => {
              imageInputRef = input
            }}
            onChange={handleChange}
            style={{ display: 'none' }}
          />
          {portfolio && !!portfolio.icon && (
            <img
              src={portfolio.icon}
              className={portfolioLogoImg}
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
            error={portfolio && !portfolio.name && isError ? true : false}
            type={''}
            label={'Enter Portfolio Name'}
            value={portfolio && portfolio.name ? portfolio.name : ''}
            onChange={(e: ChangeEvent) => handleInputChange(e, 'name')}
          />
          <AppTextField
            error={false}
            type={''}
            multiline={true}
            label={'Enter Portfolio Description (Optional)'}
            value={
              portfolio && portfolio.description ? portfolio.description : ''
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
                  const isProjectSelected = portfolio?.projects?.includes(
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
                        classes={{ root: listItemText }}
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
      <div className={portfolioModal}>
        <div>
          <h2 className={portfolioModalHead}>
            {!isChooseProject ? 'New Portfolio' : 'Choose Projects'}
          </h2>
          <span>{!isChooseProject ? 'Get Started' : 'Display your work'}</span>

          <CloseButton
            onClick={onRequestClose}
            style={{ position: 'absolute', top: 10, right: 10, fontSize: 50 }}
            isLarge={true}
          />
        </div>
        {!isChooseProject ? renderPortfolioLogoView() : null}
        {!isChooseProject ? renderDetails() : renderProjectList()}
        <GradiantButton
          onClick={() => {
            !isChooseProject ? handleProjectSection() : onSubmit()
          }}
          className={portfolioModalBtn}
          loading={portfolioLoading}>
          <Typography variant={'button'}>
            {!isChooseProject ? 'Continue' : 'Create portfolio'}
          </Typography>
        </GradiantButton>
      </div>
    </AppModal>
  )
}
