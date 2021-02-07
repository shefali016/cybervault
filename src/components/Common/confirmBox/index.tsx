import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'

type props = {
  open: boolean
  handleClose: () => void
  cancleBtnText: string
  allowBtnText: string
  confBoxTitle: string
  confBoxText: string
  setConfirmed: (value: boolean) => void
}

export default function ConfirmBox({
  open,
  handleClose,
  cancleBtnText,
  allowBtnText,
  confBoxTitle,
  confBoxText,
  setConfirmed
}: props) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby='responsive-dialog-title'>
      <DialogTitle id='responsive-dialog-title'>{confBoxTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <b style={{ color: '#9e9696' }}>{confBoxText}</b>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={() => {
            handleClose()
            setConfirmed(false)
          }}
          color='primary'>
          {cancleBtnText}
        </Button>
        <Button
          onClick={() => {
            handleClose()
            setConfirmed(true)
          }}
          color='primary'
          autoFocus>
          {allowBtnText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
