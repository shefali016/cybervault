import { Box, Card, Grid, Typography } from '@material-ui/core'
import { Fragment, useState } from 'react'
import { Client, Portfolio, PortfolioFolder, Project } from 'utils/Interface'
import ReactLoading from 'react-loading'
import ConfirmBox from 'components/Common/ConfirmBox'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import { PortfolioModal } from 'components/Portfolio/PortfolioModal'
import { useStyles } from './style'
import { AppButton } from 'components/Common/Core/AppButton'
import { ConfirmationDialog } from 'components/Common/Dialog/ConfirmationDialog'
import { setCommentRange } from 'typescript'

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
  clients
}: Props) => {
  const [deleteFolderId, setDeleteFolderId] = useState<string | null>(null)
  const classes = useStyles()

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
            const portFolio: any = portfolios.filter(
              (item: any) => item.folderId === folder.id
            )
            return (
              <div key={index} className={classes.portfolioFolder}>
                <div className={classes.portfolioFolderTitle}>
                  <Typography variant='h6'>
                    {folder.name}
                    <Typography
                      variant='caption'
                      className={classes.folderDescription}>
                      {folder.description}
                    </Typography>
                  </Typography>

                  <span onClick={() => handleEditFolderDetail(folder)}>
                    <EditIcon />
                  </span>
                  <span onClick={() => startConfirmingDelete(folder.id)}>
                    <DeleteIcon />
                  </span>
                </div>
                <Grid container spacing={2}>
                  {portFolio && portFolio.length
                    ? portFolio.map((data: any, i: number) => {
                        return (
                          <Grid key={i} item lg={3} md={4} sm={6}>
                            <Card className={classes.portfoliosCard}>
                              <div className={classes.cardLogo}>
                                <img src={data.logo} alt='' />
                              </div>
                              <div className={classes.logoCOntent}>
                                <h5>{data.name}</h5>
                                <p>{data.description}</p>
                              </div>
                              <Box pl={2}>
                                <KeyboardArrowRightIcon
                                  style={{ color: '#797979' }}
                                />
                              </Box>
                            </Card>
                          </Grid>
                        )
                      })
                    : null}
                  <Grid item lg={3} md={4} sm={6}>
                    <AppButton
                      variant='contained'
                      className={classes.createPortfolioButton}
                      onClick={() => {
                        handleModalRequest({ type: 'portfolio', folder })
                      }}>
                      <div className='row'>
                        <AddIcon className={classes.buttonIcon} />
                        <Typography style={{ fontWeight: 'bold' }}>
                          Add Portfolio
                        </Typography>
                      </div>
                    </AppButton>
                  </Grid>
                </Grid>
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
