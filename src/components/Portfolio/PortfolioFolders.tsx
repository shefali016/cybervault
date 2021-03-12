import { Box, Card, Typography } from '@material-ui/core'
import { Fragment, useState } from 'react'
import { Client, Portfolio, PortfolioFolder, Project } from 'utils/Interface'
import ReactLoading from 'react-loading'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import { PortfolioModal } from 'components/Portfolio/PortfolioModal'
import { useStyles } from './style'
import { ConfirmationDialog } from 'components/Common/Dialog/ConfirmationDialog'
import Widget from '../../components/Common/Widget'
import { useTheme } from '@material-ui/core/styles'
import { PopoverButton } from 'components/Common/PopoverButton'
import clsx from 'clsx'
import { AppButton } from 'components/Common/Core/AppButton'
import { useModalState } from 'utils/hooks'
import { PortfolioItem } from 'components/Portfolio/PortfolioItem'
import FolderIcon from '@material-ui/icons/Folder'

type Props = {
  folderList: Array<PortfolioFolder>
  loading: boolean
  handleEditFolderDetail: (folder: PortfolioFolder) => void
  deletefolder: (folderId: string) => void
  handleModalRequest: ({ type, folder }: any) => void
  handleSubmit: (portfolio: Portfolio) => void
  projectList: Array<Project>
  portfolios: Map<string, Portfolio> | any
  handlePortfolioView: (portfolioId: string) => void
  clients: Array<Client>
  updatePortfolioLoading: boolean
  updatePortfolioError: string | null
  updatePortfolioSuccess: boolean
  goToFolder: (folder: PortfolioFolder) => void
}
const PortfolioFolders = ({
  folderList,
  loading,
  handleEditFolderDetail,
  deletefolder,
  handleModalRequest,
  handleSubmit,
  projectList,
  updatePortfolioLoading,
  updatePortfolioError,
  updatePortfolioSuccess,
  portfolios,
  handlePortfolioView,
  clients,
  goToFolder
}: Props) => {
  const [deleteFolderId, setDeleteFolderId] = useState<string | null>(null)
  const classes = useStyles()
  const theme = useTheme()

  const [
    creatingPortfolioForFolder,
    createPortfolioForFolder
  ] = useState<PortfolioFolder | null>(null)

  const startConfirmingDelete = (id: string) => setDeleteFolderId(id)
  const stopConfirmingDelete = () => setDeleteFolderId(null)
  const handleDelete = () => {
    deleteFolderId && deletefolder(deleteFolderId)
    stopConfirmingDelete()
  }

  const renderPortfolioModal = () => {
    return (
      <PortfolioModal
        folderId={creatingPortfolioForFolder?.id}
        open={!!creatingPortfolioForFolder}
        onRequestClose={() => createPortfolioForFolder(null)}
        onSubmit={(portfolio: Portfolio) => handleSubmit(portfolio)}
        projectList={projectList}
        loading={updatePortfolioLoading}
        error={updatePortfolioError}
        success={updatePortfolioSuccess}
        clients={clients}
      />
    )
  }

  return (
    <Fragment>
      {!loading ? (
        folderList && !!folderList.length ? (
          folderList.map((folder: PortfolioFolder, index: number) => {
            const portFolios: Array<Portfolio> = portfolios.filter(
              (item: any) => item.folderId === folder.id
            )

            const popoverMenuItems = [
              {
                title: 'Add portfolio',
                onClick: () => createPortfolioForFolder(folder),
                Icon: AddIcon
              },
              {
                title: 'Edit folder',
                onClick: () => handleEditFolderDetail(folder),
                Icon: EditIcon
              },
              {
                title: 'Delete folder',
                onClick: () => startConfirmingDelete(folder.id),
                Icon: DeleteIcon,
                desctructive: true
              }
            ]

            return (
              <div key={index} className={classes.portfolioFolder}>
                <div className={classes.portfolioFolderTitle}>
                  <FolderIcon
                    className={classes.uploadFolderIcon}
                    style={{
                      marginRight: theme.spacing(1),
                      fontSize: 40,
                      marginBottom: 5
                    }}
                  />
                  <Typography
                    variant='h5'
                    style={{ marginRight: theme.spacing(2.5) }}>
                    {folder.name}{' '}
                    <Typography
                      variant='caption'
                      className={classes.folderDescription}>
                      {folder.description}
                    </Typography>
                  </Typography>
                  <PopoverButton menuItems={popoverMenuItems} />
                  {portFolios.length > 4 && (
                    <AppButton
                      style={{
                        color: theme.palette.primary.light,
                        marginLeft: theme.spacing(1)
                      }}
                      onClick={() => goToFolder(folder)}>
                      <div className='row'>
                        <Typography
                          variant='body1'
                          style={{ marginLeft: theme.spacing(1) }}>
                          See all
                        </Typography>
                        <KeyboardArrowRightIcon
                          style={{
                            marginLeft: theme.spacing(0.5)
                          }}
                        />
                      </div>
                    </AppButton>
                  )}
                </div>

                <Widget
                  data={portFolios.slice(0, 5)}
                  EmptyComponent={
                    <div
                      onClick={() => createPortfolioForFolder(folder)}
                      className={clsx(
                        classes.portfolioBoxWrap,
                        classes.portfoliosCard
                      )}
                      style={{ margin: 0 }}>
                      <AddIcon className={classes.addIcon} />
                      <Typography variant='body1' style={{ fontSize: 18 }}>
                        Add a portfolio
                      </Typography>
                    </div>
                  }
                  itemHeight={theme.spacing(10)}
                  renderItem={(data: Portfolio) => (
                    <div style={{ paddingRight: theme.spacing(3) }}>
                      <PortfolioItem
                        responsiveWidth={false}
                        portfolio={data}
                        onClick={(portfolio: Portfolio) =>
                          handlePortfolioView(portfolio.id)
                        }
                      />
                    </div>
                  )}
                />
              </div>
            )
          })
        ) : null
      ) : (
        <div className={classes.loader}>
          <ReactLoading
            type={'bubbles'}
            color={theme.palette.primary.main}
            height={100}
            width={100}
          />
        </div>
      )}
      {renderPortfolioModal()}
      <ConfirmationDialog
        isOpen={!!deleteFolderId}
        onClose={stopConfirmingDelete}
        title={'Delete Portfolio Folder'}
        message={
          'Are you sure you want to delete this folder? This cannot be undone.'
        }
        onYes={handleDelete}
        onNo={stopConfirmingDelete}
      />
    </Fragment>
  )
}

export default PortfolioFolders
