import {
  Card,
  CardContent,
  Grid,
  IconButton,
  MenuItem,
  Popover,
  Typography
} from '@material-ui/core'
import { Fragment, useState } from 'react'
import { PortfolioFolder } from 'utils/types'
import ReactLoading from 'react-loading'
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { FLEX } from 'utils/constants/stringConstants'
import AddBoxIcon from '@material-ui/icons/AddBox'
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp'
import ConfirmBox from 'utils/confirmBox'

type Props = {
  portfolioFolder: string
  folderList: Array<PortfolioFolder>
  loading: boolean
  loader: string
  handleEditFolderDetail: (folder: PortfolioFolder) => void
  deletefolder: (folderId: string) => void
  handlePortfolioFolder: (folderId: string) => void
}
const PortfolioFolders = ({
  portfolioFolder,
  folderList,
  loading,
  loader,
  handleEditFolderDetail,
  deletefolder,
  handlePortfolioFolder
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
              <Card key={index} className={portfolioFolder}>
                <CardContent
                  style={{ cursor: 'pointer' }}
                  onClick={() => handlePortfolioFolder(folder.id)}>
                  <Typography>{folder.name}</Typography>
                  <Typography>
                    <small style={{ marginTop: '10px' }}>
                      {folder.description}
                    </small>
                  </Typography>
                </CardContent>
                <Grid style={{ position: 'absolute', top: 0, right: 0 }}>
                  <PopupState variant='popover' popupId='demo-popup-popover'>
                    {(popupState) => (
                      <div>
                        <IconButton
                          aria-label='more'
                          aria-controls='long-menu'
                          aria-haspopup='true'
                          {...bindTrigger(popupState)}>
                          <MoreVertIcon />
                        </IconButton>
                        <Popover
                          id={'long-menu'}
                          anchorEl={anchorEl}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right'
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left'
                          }}
                          PaperProps={{
                            style: {
                              maxHeight: 48 * 2.5,
                              borderRadius: 15,
                              border: 1,
                              fontSize: 12,
                              borderColor: 'black',
                              paddingTop: 8,
                              paddingBottom: 8,
                              color: '#000'
                            }
                          }}
                          style={{ marginLeft: -20, marginTop: -20 }}
                          {...bindPopover(popupState)}>
                          <MenuItem
                            style={{ fontSize: 12 }}
                            onClick={() => handleEditFolderDetail(folder)}>
                            <div style={{ display: FLEX }}>
                              <AddBoxIcon
                                style={{ marginRight: 5 }}
                                fontSize='small'
                              />
                              Edit Folder Info
                            </div>
                          </MenuItem>
                          <MenuItem
                            style={{ fontSize: 12 }}
                            onClick={() => {
                              setFolderId(folder.id)
                              setOpen(!open)
                            }}>
                            <div style={{ display: FLEX, color: 'red' }}>
                              <DeleteSharpIcon
                                style={{ marginRight: 5 }}
                                fontSize='small'
                              />
                              Delete Folder
                            </div>
                          </MenuItem>
                        </Popover>
                      </div>
                    )}
                  </PopupState>
                </Grid>
              </Card>
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
