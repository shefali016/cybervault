import { Modal } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import React from 'react'
import { AppLoader } from '../Core/AppLoader'
import './index.css'

export type ModalProps = {
  open: boolean
  onRequestClose: () => void
  children: React.ReactElement<any, any>
  clickToClose?: boolean
  showLoadingOverlay?: boolean
}

const AppModal = ({
  open,
  onRequestClose,
  children,
  clickToClose,
  showLoadingOverlay
}: ModalProps) => {
  const classes = useStyles()
  const theme = useTheme()
  return (
    <Modal
      onBackdropClick={clickToClose ? onRequestClose : () => {}}
      open={open}
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      className={'modal'}
      closeAfterTransition
      BackdropComponent={Backdrop}
      style={{ zIndex: 3000 }}
      BackdropProps={{
        timeout: 500
      }}>
      <Fade in={open}>
        <div className={'modalContentWrapper'}>
          {children}
          {showLoadingOverlay && (
            <div className={classes.loadingView}>
              <AppLoader color={theme.palette.primary.main} />
            </div>
          )}
        </div>
      </Fade>
    </Modal>
  )
}

const useStyles = makeStyles((theme) => ({
  loadingView: {
    display: 'flex',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: 'auto',
    height: 'auto',
    backgroundColor: 'rgba(255, 255, 255, 0.75)'
  }
}))

export default AppModal
