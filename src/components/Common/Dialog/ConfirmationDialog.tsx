import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
  Button
} from '@material-ui/core'

type Props = {
  isOpen: boolean
  onClose: () => void
  title: string
  message?: string
  onYes: () => void
  onNo: () => void
}

export const ConfirmationDialog = ({
  isOpen,
  onClose,
  title,
  message,
  onYes,
  onNo
}: Props) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>
        <Typography variant='h6' style={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
      </DialogTitle>
      {!!message && (
        <DialogContent>
          <Typography variant='body1'>{message}</Typography>
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={onNo} color='primary'>
          No
        </Button>
        <Button onClick={onYes} color='primary'>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  )
}
