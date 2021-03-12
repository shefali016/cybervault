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

type Props = {
  folderList: Array<PortfolioFolder>
  loading: boolean
  handleEditFolderDetail: (folder: PortfolioFolder) => void
  deletefolder: (folderId: string) => void
  isModalOpen: boolean
  handleModalRequest: ({ type, folder }: any) => void
  handleSubmit: (portfolio: Portfolio) => void
  projectList: Array<Project>
  portfolioLoading: boolean
  portfolios: Map<string, Portfolio> | any
  handlePortfolioView: (portfolioId: string) => void
  clients: Array<Client>
}
const PortfolioFolders = ({
  folderList,
  loading,
  handleEditFolderDetail,
  deletefolder,
  isModalOpen,
  handleModalRequest,
  handleSubmit,
  projectList,
  portfolioLoading,
  portfolios,
  handlePortfolioView,
  clients
}: Props) => {
  const [deleteFolderId, setDeleteFolderId] = useState<string | null>(null)
  const classes = useStyles()
  const theme = useTheme()

  const startConfirmingDelete = (id: string) => setDeleteFolderId(id)
  const stopConfirmingDelete = () => setDeleteFolderId(null)
  const handleDelete = () => {
    deleteFolderId && deletefolder(deleteFolderId)
    stopConfirmingDelete()
  }

  const renderPortfolioModal = () => {
    return (
      <PortfolioModal
        open={isModalOpen}
        onRequestClose={() => handleModalRequest({ type: 'portfolio' })}
        onSubmit={(portfolio: Portfolio) => handleSubmit(portfolio)}
        projectList={projectList}
        portfolioLoading={portfolioLoading}
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
                onClick: () =>
                  handleModalRequest({ type: 'portfolio', folder }),
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
                  <Typography variant='h6'>
                    {folder.name}{' '}
                    <Typography
                      variant='caption'
                      className={classes.folderDescription}>
                      {folder.description}
                    </Typography>
                  </Typography>
                  <PopoverButton menuItems={popoverMenuItems} />
                </div>

                <Widget
                  data={portFolios}
                  EmptyComponent={
                    <div
                      onClick={() =>
                        handleModalRequest({ type: 'portfolio', folder })
                      }
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
                    <Card
                      key={data.id}
                      onClick={() => handlePortfolioView(data.id)}
                      className={classes.portfoliosCard}>
                      <div className={classes.cardLogo}>
                        {!!data.icon && <img src={data.icon} alt='' />}
                      </div>

                      <div className={classes.logoContent}>
                        <Typography variant='body1' style={{ fontSize: 18 }}>
                          {data.name}
                        </Typography>
                        <Typography
                          variant='caption'
                          style={{ margin: 0, marginTop: 0, padding: 0 }}>
                          {data.description}
                        </Typography>
                      </div>
                      <Box pl={2}>
                        <KeyboardArrowRightIcon style={{ color: '#797979' }} />
                      </Box>
                    </Card>
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
