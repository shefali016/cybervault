import { Modal } from '@material-ui/core'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import React from 'react'

export type ModalProps = {
  open: boolean
  onRequestClose: () => void
  children: React.ReactElement<any, any>
  clickToClose?: boolean
}

const AppModal = ({
  open,
  onRequestClose,
  children,
  clickToClose
}: ModalProps) => {
  return (
    <Modal
      onBackdropClick={clickToClose ? onRequestClose : () => {}}
      open={open}
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      className={'new-project-modal'}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}>
      <Fade in={open}>{children}</Fade>
    </Modal>
  )
}

export default AppModal
