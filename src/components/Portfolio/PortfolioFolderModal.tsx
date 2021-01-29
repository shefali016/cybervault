import { makeStyles } from '@material-ui/core/styles'
import React, { ChangeEvent, Fragment } from 'react'
import CloseButton from 'components/Common/Button/CloseButton'
import { PortfolioFolder } from 'utils/types'
import AppTextField from 'components/Common/Core/AppTextField'
import AppModal from '../Common/Modal'
import { GradiantButton } from 'components/Common/Button/GradiantButton'
import { Typography } from '@material-ui/core'

type Props = {
  open: boolean
  onRequestClose: () => void
  folder: PortfolioFolder | null
  onSubmit: (folder: PortfolioFolder) => void
  handleInputChange: (event: any, key: string) => void
  portfolioModal: string
  portfolioModalBtn: string
  portfolioModalHead: string
  updatingFolder: boolean
  isError: boolean
}

export const PortfolioFolderModal = ({
  open,
  onRequestClose,
  folder,
  handleInputChange,
  onSubmit,
  portfolioModal,
  portfolioModalBtn,
  portfolioModalHead,
  updatingFolder,
  isError
}: Props) => {
  const renderDetails = () => {
    return (
      <Fragment>
        <div style={{ marginTop: '50px' }}>
          <AppTextField
            error={folder && !folder.name && isError ? true : false}
            type={''}
            label={'Enter Folder Name'}
            value={folder && folder.name ? folder.name : ''}
            onChange={(e: ChangeEvent) => handleInputChange(e, 'name')}
          />
          <AppTextField
            error={false}
            type={''}
            multiline={true}
            label={'Enter Folder Description (Optional)'}
            value={folder && folder.description ? folder.description : ''}
            onChange={(e: ChangeEvent) => handleInputChange(e, 'description')}
          />
        </div>
        <GradiantButton
          onClick={(folder: PortfolioFolder) => onSubmit(folder)}
          className={portfolioModalBtn}
          loading={updatingFolder}>
          <Typography variant={'button'}>Continue</Typography>
        </GradiantButton>
      </Fragment>
    )
  }

  return (
    <AppModal open={open} onRequestClose={onRequestClose} clickToClose={true}>
      <div className={portfolioModal}>
        <h2 className={portfolioModalHead}>
          {folder && folder.id ? 'Edit Folder' : 'New Folder'}
        </h2>
        <span>Add Content & information</span>
        <CloseButton
          onClick={onRequestClose}
          style={{ position: 'absolute', top: 10, right: 10, fontSize: 50 }}
          isLarge={true}
        />
        {renderDetails()}
      </div>
    </AppModal>
  )
}

const useStyles = makeStyles((theme) => ({}))
