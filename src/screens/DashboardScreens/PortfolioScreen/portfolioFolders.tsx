import { Card, Grid, IconButton, MenuItem, Popover } from '@material-ui/core'
import { Fragment, useState } from 'react'
import { PortfolioFolder } from 'utils/types'
import ReactLoading from 'react-loading'
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { FLEX } from 'utils/constants/stringConstants'
import AddBoxIcon from '@material-ui/icons/AddBox'
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp'
import ConfirmBox from 'utils/confirmBox'
import AddIcon from '@material-ui/icons/Add'

type Props = {
  portfolioFolder: string
  folderList: Array<PortfolioFolder>
  loading: boolean
  loader: string
  handleEditFolderDetail: (folder: PortfolioFolder) => void
  deletefolder: (folderId: string) => void
  handlePortfolioFolder: (folderId: string) => void
  portfoliosCard: string
  portfolioFolderTitle: string
  buttonIcon: string
}
const PortfolioFolders = ({
  portfolioFolder,
  folderList,
  loading,
  loader,
  handleEditFolderDetail,
  deletefolder,
  handlePortfolioFolder,
  portfoliosCard,
  portfolioFolderTitle,
  buttonIcon
}: Props) => {
  const [anchorEl] = useState<null | HTMLElement>(null)
  const [open, setOpen] = useState<boolean>(false)
  const [folderId, setFolderId] = useState<string>('')

  return (
    <Fragment>
      {!loading ? (
        folderList && folderList.length ? (
          folderList.map((folder: PortfolioFolder, index: number) => {
            return (
              <div key={index} className={portfolioFolder}>
                <div className={portfolioFolderTitle}>
                  {folder.name}
                  <small style={{ marginTop: '10px' }}>
                    {folder.description}
                  </small>
                </div>
                <Card className={portfoliosCard}>
                  <AddIcon className={buttonIcon} />
                  Add Portfolio
                </Card>
              </div>
            )
          })
        ) : null
      ) : (
        <div className={loader}>
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
