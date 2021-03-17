import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CloseButton from 'components/Common/Button/CloseButton'
import { GradiantButton } from 'components/Common/Button/GradiantButton'
import AppTextField from 'components/Common/Core/AppTextField'
import AppModal from 'components/Common/Modal'
import ModalTitle from 'components/Common/Modal/ModalTitle'
import React, { useState } from 'react'
import { useOnChange } from 'utils/hooks'
import { InputChangeEvent } from 'utils/Interface'

type PortfolioShareProps = {
  defaultMessage?: string
  onShare: (email: string, contentDesc: string) => void
  loading: boolean
}

const PortfolioShare = ({
  defaultMessage,
  onShare,
  loading
}: PortfolioShareProps) => {
  const classes = useStyles()
  const [email, setEmail] = useState('')
  const [contentDesc, setContentDesc] = useState(defaultMessage || '')
  const [errors, setErrors] = useState<{ email?: boolean; content?: boolean }>(
    {}
  )

  const handleShare = () => {
    const trimmedEmail = email.trim()
    const trimmedContent = contentDesc.trim()

    let newErrors = {}

    if (!trimmedEmail) {
      newErrors = { ...newErrors, email: true }
    }
    if (!trimmedContent) {
      newErrors = { ...newErrors, content: true }
    }

    setErrors(newErrors)

    if (Object.values(newErrors).length === 0) {
      onShare(trimmedEmail, trimmedContent)
    }
  }

  return (
    <div className={classes.container}>
      <AppTextField
        value={email}
        onChange={(e: InputChangeEvent) => {
          if (errors.email) {
            setErrors((state) => ({ ...state, email: false }))
          }
          setEmail(e.target.value)
        }}
        label='Email'
        error={errors.email}
      />
      <AppTextField
        multiline={true}
        value={contentDesc}
        onChange={(e: InputChangeEvent) => {
          if (errors.content) {
            setErrors((state) => ({ ...state, content: false }))
          }
          setContentDesc(e.target.value)
        }}
        label='Message'
        error={errors.content}
      />
      <GradiantButton
        className={classes.shareButton}
        onClick={handleShare}
        loading={loading}>
        <Typography>Share Portfolio</Typography>
      </GradiantButton>
    </div>
  )
}

type PortfolioShareModalProps = {
  open: boolean
  onRequestClose: () => void
  success: boolean
} & PortfolioShareProps

export const PortfolioShareModal = ({
  open,
  onRequestClose,
  onShare,
  defaultMessage,
  success,
  loading
}: PortfolioShareModalProps) => {
  useOnChange(success, (success: boolean) => {
    if (success) {
      onRequestClose()
    }
  })

  return (
    <AppModal open={open} onRequestClose={onRequestClose}>
      <div className='modalContent'>
        <CloseButton className='modalCloseButton' onClick={onRequestClose} />
        <ModalTitle
          title={'Share Portfolio'}
          subtitle={'Send your work by email'}
        />
        <PortfolioShare {...{ defaultMessage, onShare, loading }} />
      </div>
    </AppModal>
  )
}

const useStyles = makeStyles((theme) => ({
  container: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  shareButton: { marginTop: theme.spacing(3) }
}))
