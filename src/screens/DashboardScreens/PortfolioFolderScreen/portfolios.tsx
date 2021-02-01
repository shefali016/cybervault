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
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { FLEX } from 'utils/constants/stringConstants'
import AddBoxIcon from '@material-ui/icons/AddBox'
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp'

type Props = {}
const Portfolios = ({}: Props) => {
  const [anchorEl] = useState<null | HTMLElement>(null)

  return (
    <Fragment>
      <Card>
        <CardContent style={{ cursor: 'pointer' }}>
          <Typography>PortFolio</Typography>
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
                  <MenuItem style={{ fontSize: 12 }}>
                    <div style={{ display: FLEX }}>
                      <AddBoxIcon style={{ marginRight: 5 }} fontSize='small' />
                      Edit Folder Info
                    </div>
                  </MenuItem>
                  <MenuItem style={{ fontSize: 12 }}>
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
    </Fragment>
  )
}

export default Portfolios
