import { makeStyles } from '@material-ui/core/styles'
import React, { ChangeEvent, Fragment, useRef } from 'react'
import CloseButton from 'components/Common/Button/CloseButton'
import { Portfolio, PortfolioFolder } from 'utils/types'
import AppTextField from 'components/Common/Core/AppTextField'
import AppModal from '../Common/Modal'
import { GradiantButton } from 'components/Common/Button/GradiantButton'
import { Button, Typography } from '@material-ui/core'

type Props = {
  open: boolean
  onRequestClose: () => void
  portfolio: Portfolio | null
  onSubmit: (folder: PortfolioFolder) => void
  handleInputChange: (event: any, key: string) => void
  portfolioModal: string
  portfolioModalBtn: string
  portfolioModalHead: string
  updatingFolder?: boolean
  isError?: boolean
  handleChange: (event: any) => void
  portfolioLogo: string
  portfolioLogoImg: string
  addLogoText: string
  portfolioLogoContainer: string
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
  addLogoText,
  portfolioLogoContainer
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
        <div>
          <h2 className={portfolioModalHead}>
            {portfolio && portfolio.id ? 'Edit Portfolio' : 'New Portfolio'}
          </h2>
          <span>Get Started</span>

          <CloseButton
            onClick={onRequestClose}
            style={{ position: 'absolute', top: 10, right: 10, fontSize: 50 }}
            isLarge={true}
          />
        </div>
        {renderPortfolioLogoView()}
        {renderDetails()}
      </div>
    </AppModal>
  )
}
