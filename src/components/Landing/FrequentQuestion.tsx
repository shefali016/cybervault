import React from 'react'
import Modal from 'components/Common/Modal'
import { useModalState } from 'utils/hooks'
import AddIcon from '@material-ui/icons/Add'
import { IconButton, Typography } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import CloseButton from 'components/Common/Button/CloseButton'

type Props = {
  title: string
  content: string
}

export const FrequentQuestion = ({ title, content }: Props) => {
  const [open, setOpen, toggle] = useModalState(false)
  const classes = useStyles()
  const theme = useTheme()

  return (
    <div className={classes.container}>
      <div className={classes.row} onClick={toggle(true)}>
        <IconButton className={classes.iconButton}>
          <AddIcon className={classes.addIcon} />
        </IconButton>
        <Typography>{title}</Typography>
      </div>
      <Modal open={open} onRequestClose={toggle(false)} clickToClose>
        <div
          className={'modalContent'}
          style={{ paddingTop: theme.spacing(6) }}>
          <CloseButton className={'modalCloseButton'} onClick={toggle(false)} />
          <Typography variant='h5' style={{ marginBottom: theme.spacing(2) }}>
            {title}
          </Typography>
          <Typography>{content}</Typography>
        </div>
      </Modal>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  container: { flex: 1 },

  iconButton: {
    background: theme.palette.primary.main,
    marginRight: theme.spacing(3),
    '& :hover': { background: theme.palette.primary.main }
  },
  addIcon: { color: theme.palette.common.white, fontSize: 25 },
  row: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    borderRadius: theme.shape.borderRadius,
    margin: theme.spacing(1),
    borderStyle: 'solid',
    borderColor: theme.palette.border,
    borderWidth: 1,
    padding: theme.spacing(5),
    flex: 1
  }
}))
