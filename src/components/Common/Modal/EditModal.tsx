import React, { useState } from 'react'
import { Typography, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit'
import CloseIcon from '@material-ui/icons/Close'
import Modal from './index'
import AppTextField from '../Core/AppTextField'
import { InputChangeEvent } from 'utils/types'
import { GradiantButton } from '../Button/GradiantButton'
import { POSITION_ABSOLUTE } from 'utils/constants/stringConstants'
import CloseButton from '../Button/CloseButton'
import clsx from 'clsx'

type EditItem = {
  title: string
  value: string | undefined
  key: string
  placeholder: string
  type?: string
}

type Props = {
  onSave: (val: any) => void
  className: string
  editItems: Array<EditItem>
}

const EditModal = ({ onSave, editItems, className }: Props) => {
  const createState = (items: Array<EditItem>): { [key: string]: any } => {
    return items.reduce(
      (acc: {}, editItem: EditItem) => ({
        ...acc,
        [editItem.key]: editItem.value
      }),
      {}
    )
  }
  const [modalOpen, setModalOpen] = useState(false)
  const [state, setState] = useState<any>(createState(editItems))
  const classes = useStyles()

  const handleSave = () => {
    onSave(state)
    requestAnimationFrame(handleModalClose)
  }

  const handleModalClose = () => setModalOpen(false)

  return (
    <div className={clsx(classes.container, className)}>
      <div className={classes.editItemsContainer}>
        <div className={classes.editItemsInner}>
          {editItems.map(
            ({ title, value, key, placeholder, type }: EditItem) => {
              return (
                <div>
                  <Typography variant='body1' className={classes.title}>
                    {title}
                  </Typography>
                  <Typography
                    variant='h6'
                    className={!!value ? classes.value : classes.placeholder}>
                    {!!value ? value : placeholder}
                  </Typography>
                </div>
              )
            }
          )}
        </div>
        <IconButton
          className={classes.editIconButton}
          onClick={() => setModalOpen(true)}>
          <EditIcon className={classes.editIcon} />
        </IconButton>
      </div>

      <Modal
        open={modalOpen}
        onRequestClose={handleModalClose}
        clickToClose={true}>
        <div className={classes.modalContent}>
          {editItems.map(({ value, key, type = 'text', title }: EditItem) => {
            return (
              <AppTextField
                label={title}
                type={type}
                onChange={(e: InputChangeEvent) =>
                  setState((state: any) => ({
                    ...state,
                    [key]: e.target.value
                  }))
                }
                value={state[key]}
              />
            )
          })}
          <GradiantButton onClick={handleSave} className={classes.saveButton}>
            <Typography variant='button'>Save</Typography>
          </GradiantButton>
        </div>
      </Modal>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  container: { display: 'flex', flexDirection: 'column', flex: 1 },
  saveButton: { marginTop: theme.spacing(1) },
  editItemsContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flex: 1
  },
  editItemsInner: { flex: 1 },
  title: { color: theme.palette.text.meta },
  value: { color: theme.palette.text.background },
  placeholder: { color: theme.palette.text.meta },
  labelRow: { display: 'flex', alignItems: 'center' },
  editIcon: { color: theme.palette.text.background },
  editIconButton: { marginLeft: theme.spacing(2), marginTop: 5 },
  modalContent: {
    color: theme.palette.text.paper,
    backgroundColor: theme.palette.background.paper,
    padding: '20px 40px 30px 40px',
    maxWidth: '60vw',
    maxHeight: '80vh',
    outline: 'none',
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'scroll',
    position: 'relative'
  }
}))

export default EditModal
