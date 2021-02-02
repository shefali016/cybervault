import { Card, Box } from '@material-ui/core'
import { Fragment, useState } from 'react'
import { Portfolio, PortfolioFolder, Project } from 'utils/types'
import ReactLoading from 'react-loading'
import ConfirmBox from 'utils/confirmBox'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import Grid from '@material-ui/core/Grid'
import Dummy from '../../../assets/Dummy.jpg'
import logo from '../../../assets/nike.png'

import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import { PortfolioModal } from 'components/Portfolio/PortfolioModal'
import { useStyles } from './style'

type Props = {
  folderList: Array<PortfolioFolder>
  loading: boolean
  handleEditFolderDetail: (folder: PortfolioFolder) => void
  deletefolder: (folderId: string) => void
  portfolio: Portfolio
  isModalOpen: boolean
  handleModalRequest: (type: string) => void
  handleSubmit: () => void
  handleInputChange: (e: any, key: string) => void
  handleImageChange: (e: any) => void
  handleProjectSection: () => void
  isError: boolean
  isChooseProject: boolean
  projectList: Array<Project>
  handleProjectSelect: (projectId: string) => void
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
  handleProjectSelect
}: Props) => {
  const [open, setOpen] = useState<boolean>(false)
  const [folderId, setFolderId] = useState<string>('')
  const classes = useStyles()

  const renderPortfolioModal = () => {
    return (
      <PortfolioModal
        open={isModalOpen}
        onRequestClose={() => handleModalRequest('portfolio')}
        portfolio={portfolio}
        onSubmit={() => handleSubmit()}
        handleInputChange={(e: any, key: string) => handleInputChange(e, key)}
        portfolioModal={classes.portfolioModal}
        portfolioModalBtn={classes.portfolioModalBtn}
        portfolioModalHead={classes.portfolioModalHead}
        handleChange={(event: any) => handleImageChange(event)}
        portfolioLogo={classes.portfolioLogo}
        portfolioLogoImg={classes.portfolioLogoImg}
        addLogoText={classes.addLogoText}
        portfolioLogoContainer={classes.portfolioLogoContainer}
        handleProjectSection={handleProjectSection}
        isError={isError}
        isChooseProject={isChooseProject}
        projectList={projectList}
        cardLogo={classes.cardLogo}
        logoCOntent={classes.logoCOntent}
        handleProjectSelect={handleProjectSelect}
      />
    )
  }

  return (
    <Fragment>
      {!loading ? (
        folderList && folderList.length ? (
          folderList.map((folder: PortfolioFolder, index: number) => {
            return (
              <div key={index} className={classes.portfolioFolder}>
                <div className={classes.portfolioFolderTitle}>
                  {folder.name}
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
                  <small style={{ marginTop: '10px' }}>
                    {folder.description}
                  </small>
                </div>
                <Grid container spacing={2}>
                  <Grid item lg={3} md={4} sm={6}>
                    <Card className={classes.portfoliosCard}>
                      <div className={classes.cardLogo}>
                        <img src={Dummy} alt='' />
                      </div>
                      <div className={classes.logoCOntent}>
                        <h5>Audi Q5 Commercial'19</h5>
                        <p>Audi Q5 Commercial'19 Audi Q5 Commerci</p>
                      </div>
                      <Box pl={2}>
                        <KeyboardArrowRightIcon style={{ color: '#797979' }} />
                      </Box>
                    </Card>
                  </Grid>
                  <Grid item lg={3} md={4} sm={6}>
                    <Card className={classes.portfoliosCard}>
                      <div className={classes.cardLogo}>
                        <img src={logo} alt='' />
                      </div>
                      <div className={classes.logoCOntent}>
                        <h5>Toyota Corolla Campaign</h5>
                        <p>This is the demo conent</p>
                      </div>
                      <Box pl={2}>
                        <KeyboardArrowRightIcon style={{ color: '#797979' }} />
                      </Box>
                    </Card>
                  </Grid>
                  <Grid item md={3}>
                    <Card
                      onClick={() => handleModalRequest('portfolio')}
                      className={classes.portfoliosCard}>
                      <AddIcon className={classes.buttonIcon} />
                      Add Portfolio
                    </Card>
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
      {}
    </Fragment>
  )
}

export default PortfolioFolders
