import { Box, Card, Grid, Typography } from '@material-ui/core'
import { Fragment, useState } from 'react'
import { Portfolio, PortfolioFolder, Project } from 'utils/Interface'
import ReactLoading from 'react-loading'
import ConfirmBox from 'components/Common/ConfirmBox'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import { PortfolioModal } from 'components/Portfolio/PortfolioModal'
import { useStyles } from './style'
import { AppButton } from 'components/Common/Core/AppButton'

type Props = {
  folderList: Array<PortfolioFolder>
  loading: boolean
  handleEditFolderDetail: (folder: PortfolioFolder) => void
  deletefolder: (folderId: string) => void
  portfolio: Portfolio
  isModalOpen: boolean
  handleModalRequest: ({ type, folder }: any) => void
  handleSubmit: () => void
  handleInputChange: (e: any, key: string) => void
  handleImageChange: (e: any) => void
  handleProjectSection: () => void
  isError: boolean
  isChooseProject: boolean
  projectList: Array<Project>
  handleProjectSelect: (projectId: string) => void
  portfolioLoading: boolean
  portfolios: Array<Portfolio>
}
const PortfolioFolders = ({
  folderList,
  loading,
  handleEditFolderDetail,
  deletefolder,
  portfolio,
  isModalOpen,
  handleModalRequest,
  handleSubmit,
  handleInputChange,
  handleImageChange,
  handleProjectSection,
  isError,
  isChooseProject,
  projectList,
  handleProjectSelect,
  portfolioLoading,
  portfolios
}: Props) => {
  const [open, setOpen] = useState<boolean>(false)
  const [folderId, setFolderId] = useState<string>('')
  const classes = useStyles()

  const renderPortfolioModal = () => {
    return (
      <PortfolioModal
        open={isModalOpen}
        onRequestClose={() => handleModalRequest({ type: 'portfolio' })}
        portfolio={portfolio}
        onSubmit={() => handleSubmit()}
        handleInputChange={(e: any, key: string) => handleInputChange(e, key)}
        handleChange={(event: any) => handleImageChange(event)}
        handleProjectSection={handleProjectSection}
        isError={isError}
        isChooseProject={isChooseProject}
        projectList={projectList}
        handleProjectSelect={handleProjectSelect}
        portfolioLoading={portfolioLoading}
      />
    )
  }

  return (
    <Fragment>
      {!loading ? (
        folderList && !!folderList.length ? (
          folderList.map((folder: PortfolioFolder, index: number) => {
            const portFolioList: any = portfolios.filter(
              (item: any) => item.folderId === folder.id
            )[0]
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
                    <span onClick={() => handleEditFolderDetail(folder)}>
                      <EditIcon />
                    </span>
                    <span
                      onClick={() => {
                        setOpen(true)
                        setFolderId(folder.id)
                      }}>
                      <DeleteIcon />
                    </span>
                  </Typography>
                </div>
                <Grid container spacing={2}>
                  {portFolioList &&
                  portFolioList.portfolios &&
                  portFolioList.portfolios.length
                    ? portFolioList.portfolios.map(
                        (data: Portfolio | any, i: number) => {
                          return (
                            <Grid item lg={3} md={4} sm={6}>
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
                        }
                      )
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
      <ConfirmBox
        open={open}
        handleClose={() => setOpen(!open)}
        cancleBtnText={'Cancel'}
        allowBtnText={'Delete'}
        confBoxTitle={'Are you sure?'}
        confBoxText={'You want to delete this folder'}
        setConfirmed={(value: boolean) => {
          if (value) {
            deletefolder(folderId)
          }
        }}
      />
    </Fragment>
  )
}

export default PortfolioFolders
