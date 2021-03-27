import React, { useState } from 'react'
import CloseButton from 'components/Common/Button/CloseButton'
import AppModal from '../Common/Modal'
import { makeStyles } from '@material-ui/core'
import ModalTitle from 'components/Common/Modal/ModalTitle'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import CancelIcon from '@material-ui/icons/Cancel'
import { Asset } from 'utils/Interface'
import { ConfirmationDialog } from 'components/Common/Dialog/ConfirmationDialog'
type Props = {
  open: boolean
  onRequestClose: (type: string) => void
  assetList: Array<Asset>
  deleteAssetData: (assetId: string) => void
}

export const AssetModal = ({
  open,
  onRequestClose,
  assetList,
  deleteAssetData
}: Props) => {
  const classes = useStyles()
  const [confirmDeleteAsset, setConfirmDeleteAsset] = useState<string | null>(
    null
  )
  const removeAsset = (assetId: string) => {
    setConfirmDeleteAsset(null)
    deleteAssetData(assetId)
  }

  const renderAssets = () => {
    if (!(assetList && assetList.length)) {
      return null
    }
    return (
      <GridList cellHeight={200} spacing={1} className={classes.gridList}>
        {assetList.map((assetData: Asset) => (
          <GridListTile
            key={assetData.files[0].url}
            cols={2}
            style={{
              maxHeight: 'auto',
              maxWidth: '248px',
              marginRight: '2px'
            }}>
            <img src={assetData.files[0].url} alt={assetData.fileName} />
            <GridListTileBar
              title={assetData.fileName}
              titlePosition='top'
              actionIcon={
                <IconButton
                  aria-label={`Remove Asset`}
                  className={classes.icon}
                  onClick={() => setConfirmDeleteAsset(assetData.id)}>
                  <CancelIcon />
                </IconButton>
              }
              actionPosition='left'
              className={classes.titleBar}
            />
          </GridListTile>
        ))}
      </GridList>
    )
  }
  return (
    <div>
      <AppModal
        open={open}
        onRequestClose={() => onRequestClose('folder')}
        clickToClose={true}>
        <div className={'modalContent'}>
          <ModalTitle
            title={'Assets View'}
            subtitle={'Delete asset for space optimization'}
          />
          <CloseButton
            onClick={() => onRequestClose('folder')}
            style={{ position: 'absolute', top: 10, right: 10 }}
          />
          {renderAssets()}
        </div>
      </AppModal>
      <ConfirmationDialog
        title={'Delete Asset'}
        message={
          'Are you sure you want to remove this asset? This cannot be undone'
        }
        isOpen={!!confirmDeleteAsset}
        onYes={() => confirmDeleteAsset && removeAsset(confirmDeleteAsset)}
        onNo={() => setConfirmDeleteAsset(null)}
        onClose={() => setConfirmDeleteAsset(null)}
      />
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 500,
    height: 450,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)'
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
  },
  icon: {
    color: 'white'
  }
}))
