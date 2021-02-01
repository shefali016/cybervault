import { Card, Box } from '@material-ui/core'
import { Fragment, useState } from 'react'
import { Portfolio, PortfolioFolder } from 'utils/types'
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

type Props = {
  portfolioFolder: string
  folderList: Array<PortfolioFolder>
  loading: boolean
  loader: string
  handleEditFolderDetail: (folder: PortfolioFolder) => void
  deletefolder: (folderId: string) => void
  portfoliosCard: string
  portfolioFolderTitle: string
  buttonIcon: string
  cardLogo: string
  logoCOntent: string
  portfolio: Portfolio
  isModalOpen: boolean
  handleModalRequest: () => void
  handleSubmit: () => void
  handleInputChange: (e: any, key: string) => void
  portfolioModal: string
  portfolioModalBtn: string
  portfolioModalHead: string
  handleImageChange: (e: any) => void
  portfolioLogo: string
  portfolioLogoImg: string
  addLogoText: string
  portfolioLogoContainer: string
}
const PortfolioFolders = ({
  portfolioFolder,
  folderList,
  loading,
  loader,
  handleEditFolderDetail,
  deletefolder,
  portfoliosCard,
  portfolioFolderTitle,
  buttonIcon,
  cardLogo,
  logoCOntent,
  portfolio,
  isModalOpen,
  handleModalRequest,
  handleSubmit,
  handleInputChange,
  portfolioModal,
  portfolioModalBtn,
  portfolioModalHead,
  handleImageChange,
  portfolioLogo,
  portfolioLogoImg,
  addLogoText,
  portfolioLogoContainer
}: Props) => {
  const [open, setOpen] = useState<boolean>(false)
  const [folderId, setFolderId] = useState<string>('')

  const renderPortfolioModal = () => {
    return (
      <PortfolioModal
        open={isModalOpen}
        onRequestClose={() => handleModalRequest()}
        portfolio={portfolio}
        onSubmit={() => handleSubmit()}
        handleInputChange={(e: any, key: string) => handleInputChange(e, key)}
        portfolioModal={portfolioModal}
        portfolioModalBtn={portfolioModalBtn}
        portfolioModalHead={portfolioModalHead}
        handleChange={(event: any) => handleImageChange(event)}
        portfolioLogo={portfolioLogo}
        portfolioLogoImg={portfolioLogoImg}
        addLogoText={addLogoText}
        portfolioLogoContainer={portfolioLogoContainer}
      />
    )
  }

  return (
    <Fragment>
      {!loading ? (
        folderList && folderList.length ? (
          folderList.map((folder: PortfolioFolder, index: number) => {
            return (
              <div key={index} className={portfolioFolder}>
                <div className={portfolioFolderTitle}>
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
                    <Card className={portfoliosCard}>
                      <div className={cardLogo}>
                        <img src={Dummy} alt='' />
                      </div>
                      <div className={logoCOntent}>
                        <h5>Audi Q5 Commercial'19</h5>
                        <p>Audi Q5 Commercial'19 Audi Q5 Commerci</p>
                      </div>
                      <Box pl={2}>
                        <KeyboardArrowRightIcon style={{ color: '#797979' }} />
                      </Box>
                    </Card>
                  </Grid>
                  <Grid item lg={3} md={4} sm={6}>
                    <Card className={portfoliosCard}>
                      <div className={cardLogo}>
                        <img src={logo} alt='' />
                      </div>
                      <div className={logoCOntent}>
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
                      onClick={handleModalRequest}
                      className={portfoliosCard}>
                      <AddIcon className={buttonIcon} />
                      Add Portfolio
                    </Card>
                  </Grid>
                </Grid>
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
