import {
  Card,
  Grid,
  IconButton,
  MenuItem,
  Popover,
  Typography
} from '@material-ui/core'
import { Fragment, useState } from 'react'
import { PortfolioFolder } from 'utils/Interface'
import ReactLoading from 'react-loading'
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { FLEX } from 'utils/constants/stringConstants'
import AddBoxIcon from '@material-ui/icons/AddBox'
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp'
import ConfirmBox from 'utils/confirmBox'
import AddIcon from '@material-ui/icons/Add'
import { useStyles } from './style'
import { AppButton } from '../../../components/Common/Core/AppButton'

type Props = {
  folderList: Array<PortfolioFolder>
  loading: boolean
  handleEditFolderDetail: (folder: PortfolioFolder) => void
  deletefolder: (folderId: string) => void
  handlePortfolioFolder: (folderId: string) => void
}
const PortfolioFolders = ({
  folderList,
  loading,
  handleEditFolderDetail,
  deletefolder,
  handlePortfolioFolder
}: Props) => {
  const [anchorEl] = useState<null | HTMLElement>(null)
  const [open, setOpen] = useState<boolean>(false)
  const [folderId, setFolderId] = useState<string>('')
  const classes = useStyles()
  return (
    <Fragment>
      {!loading ? (
        folderList && !!folderList.length ? (
          folderList.map((folder: PortfolioFolder, index: number) => {
            return (
              <div key={index} className={classes.portfolioFolder}>
                <div className={classes.portfolioFolderTitle}>
                  <Typography variant='h6'>{folder.name}</Typography>
                  <Typography
                    variant='caption'
                    className={classes.folderDescription}>
                    {folder.description}
                  </Typography>
                </div>
                <AppButton
                  variant='contained'
                  className={classes.createPortfolioButton}>
                  <div className='row'>
                    <AddIcon className={classes.buttonIcon} />
                    <Typography style={{ fontWeight: 'bold' }}>
                      Add Portfolio
                    </Typography>
                  </div>
                </AppButton>
              </div>
            )
          })
        ) : null
      ) : (
        <div className={classes.loader}>
          <ReactLoading
            type={'bubbles'}
            color={'#fff'}
            height={100}
            width={100}
          />
        </div>
      )}
      {ConfirmBox({
        open: open,
        handleClose: () => setOpen(!open),
        cancleBtnText: 'Cancel',
        allowBtnText: 'Delete',
        confBoxTitle: 'Are you sure?',
        confBoxText: 'You want to delete this folder',
        setConfirmed: (value: boolean) => {
          if (value) {
            deletefolder(folderId)
          }
        }
      })}
    </Fragment>
  )
}

export default PortfolioFolders
