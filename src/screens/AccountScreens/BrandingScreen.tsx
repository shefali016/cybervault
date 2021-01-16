import clsx from 'clsx'
import React, { useContext, useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { ReduxState } from 'reducers/rootReducer'
import { updateAccount } from 'actions/account'
import { useOnChange } from 'utils/hooks'
import { ToastContext, ToastTypes } from 'context/Toast'
import Section from 'components/Common/Section'
import { Typography } from '@material-ui/core'
import { Region, Account, User } from 'utils/types'
import WatermarkPicker from 'components/Assets/WatermarkPicker'
import { GradiantButton } from 'components/Common/Button/GradiantButton'
import { setMedia } from 'apis/assets'
import EditModal from 'components/Common/Modal/EditModal'
import { ColorPicker } from 'components/Common/ColorPicker'
import CreatorCloudIcon from 'components/Common/CreatorCloudIcon'
import NotificationIcon from '@material-ui/icons/Notifications'
import LeftArrowIcon from '@material-ui/icons/ArrowBackIos'
import RightArrowIcon from '@material-ui/icons/ArrowForwardIos'
import defaultProfileIcon from '../../assets/default_user.png'
import { Dot } from 'components/Common/Dot'

type StateProps = {
  account: Account
  updateSuccess: boolean
  updateError: string | null
  user: User
}
type DispatchProps = { updateAccount: (account: Account) => void }
type ReduxProps = StateProps & DispatchProps
type Props = {}

const BrandingScreen = ({
  account,
  updateSuccess,
  updateError,
  updateAccount,
  user
}: Props & ReduxProps) => {
  const classes = useStyles()
  const theme = useTheme()
  const toastContext = useContext(ToastContext)

  const [loading, setLoading] = useState<boolean>(false)
  const [accountUpdate, setAccountUpdate] = useState<Account>({ ...account })
  const [watermarkFile, setWatermarkFile] = useState<File | null>(null)

  useOnChange(updateSuccess, (success: boolean) => {
    if (success) {
      setLoading(false)
      toastContext.showToast({
        title: 'Update Success!',
        type: ToastTypes.success
      })
    }
  })

  useOnChange(updateError, (error: string | null) => {
    if (error) {
      setLoading(false)
      toastContext.showToast({ title: 'Update Failed', type: ToastTypes.error })
    }
  })

  const updateAccountBranding = (key: string) => (val: any) =>
    setAccountUpdate((account: Account) => ({
      ...account,
      branding: { ...account.branding, [key]: val }
    }))

  const handleWatermarkChange = (file: File) => {
    setWatermarkFile(file)
  }

  const handleSave = async (accountUpdate: Account) => {
    try {
      setLoading(true)
      let update = { ...accountUpdate }
      if (watermarkFile) {
        const watermarkUrl = await setMedia(
          `watermarks/${account.id}`,
          watermarkFile
        )
        if (typeof watermarkUrl === 'string') {
          update = {
            ...update,
            settings: { ...update.settings, watermark: watermarkUrl }
          }
        } else {
          throw 'invalid_watermark_url'
        }
      }
      updateAccount(update)
    } catch (error) {
      setLoading(false)
      toastContext.showToast({
        title: 'Failed to update account. Please try again.'
      })
    }
  }

  const handleAccountChange = (key: string) => (val: string) =>
    setAccountUpdate((account: Account) => ({ ...account, [key]: val }))

  const updateAccountEmailBranding = (key: string) => (val: any) =>
    setAccountUpdate((account) => ({
      ...account,
      branding: {
        ...(account.branding || {}),
        email: { ...(account.branding?.email || {}), [key]: val }
      }
    }))

  const updateAccountPortfolioBranding = (key: string) => (val: any) =>
    setAccountUpdate((account) => ({
      ...account,
      branding: {
        ...(account.branding || {}),
        portfolio: { ...(account.branding?.portfolio || {}), [key]: val }
      }
    }))

  const renderEmail = () => (
    <div style={{ flex: 1, display: 'flex' }}>
      <div className={classes.brandingDisplaySection}>
        <div className={classes.emailHeader}>
          <img src={accountUpdate.settings.watermark} height='60px' />
        </div>
        <div
          className={classes.emailContent}
          style={{
            backgroundColor: accountUpdate.branding.email.backgroundColor,
            color: accountUpdate.branding.email.text
          }}>
          <Typography variant='body1'>
            {accountUpdate.name} has shared a portfolio
          </Typography>
          <Typography variant='caption'>
            2 campaigns with video and photo assets
          </Typography>
          <div className={classes.emailContentAssets}></div>
          <div className={classes.emailFooter}>
            <div
              className={classes.emailButton}
              style={{
                backgroundColor:
                  accountUpdate.branding.email.buttonBackgroundColor
              }}>
              <Typography
                color={'inherit'}
                variant='caption'
                className={classes.emailButtonText}
                style={{
                  color: accountUpdate.branding.email.buttonTextColor
                }}>
                View Portfolio
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderPortfolioSwiper = () => {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden'
        }}>
        <LeftArrowIcon className={classes.arrowIcon} />
        <div
          style={{
            display: 'flex',
            minWidth: 200,
            position: 'relative',
            alignItems: 'flex-start',
            justifyContent: 'center'
          }}>
          <div
            className={classes.portfolioSlide}
            style={{ width: '80%', zIndex: 4, marginLeft: -30 }}>
            <img
              src={
                'https://bgr.com/wp-content/uploads/2020/04/iphone-12-pro-technizio-concept.jpg?quality=70&strip=all&w=1200'
              }
              width='100%'
            />
          </div>
          <div
            className={classes.portfolioSlide}
            style={{
              position: 'absolute',
              width: '80%',
              zIndex: 3,
              marginLeft: 0,
              marginTop: 5
            }}>
            <img
              src={
                'https://images.news18.com/ibnlive/uploads/2020/04/1587208059_iphone_12_pro_max_design.jpg'
              }
              width='100%'
            />
          </div>
          <div
            className={classes.portfolioSlide}
            style={{
              position: 'absolute',
              width: '80%',
              zIndex: 2,
              marginLeft: 30,
              marginTop: 10
            }}>
            <img
              src={
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQZrGi7U_RlfDXE31U-7xyJD-Lx4Wvde20jA&usqp=CAU'
              }
              width='100%'
            />
          </div>
        </div>
        <RightArrowIcon className={classes.arrowIcon} />
      </div>
    )
  }

  const renderPortfolio = () => (
    <div style={{ flex: 1, display: 'flex' }}>
      <div
        className={classes.brandingDisplaySection}
        style={{
          backgroundColor: accountUpdate.branding.portfolio.backgroundColor
        }}>
        <div className={classes.portfolioHeader}>
          <CreatorCloudIcon className={classes.portfolioHeaderIcon} />
          <div className={classes.portfolioHeaderTitleContainer}>
            <div className={classes.portfolioHeaderImageWrapper}>
              <img
                src={
                  'https://www.kinaxis.com/sites/default/files/blog/2015/09/iStock_000049353450_Small.jpg'
                }
                height='25px'
                width='auto'
                className={classes.portfolioHeaderImage}
              />
            </div>
            <Typography className={classes.portfolioHeaderTitle}>
              Technology Portfolio - {accountUpdate.name} - 2021
            </Typography>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              paddingRight: theme.spacing(1)
            }}>
            <NotificationIcon className={classes.notificationIcon} />
            <img
              src={user.avatar ? user.avatar : defaultProfileIcon}
              style={{ borderRadius: 20, height: 25, width: 25 }}
            />
          </div>
        </div>
        <div
          className={classes.portfolioBanner}
          style={{
            display: 'flex',
            background: `linear-gradient(90deg, ${accountUpdate.branding.portfolio.headerGradient1},  ${accountUpdate.branding.portfolio.headerGradient2})`,
            minHeight: 35,
            width: '100%',
            paddingLeft: theme.spacing(4),
            alignItems: 'center'
          }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
              paddingLeft: 15,
              paddingRight: 15
            }}>
            <Typography className={classes.portfolioBannerText}>
              Apple iPhone 12 Promo
            </Typography>
            <Dot color='#fff' style={{ position: 'absolute', bottom: -5 }} />
          </div>
          <Typography
            className={classes.portfolioBannerText}
            style={{ paddingLeft: 15, paddingRight: 15 }}>
            iPad Air Commercial '16
          </Typography>
        </div>
        <div
          className={classes.portfolioContent}
          style={{
            backgroundColor: accountUpdate.branding.portfolio.foregroundColor,
            color: accountUpdate.branding.portfolio.text
          }}>
          <Typography variant='h6' className={classes.portfolioHeaderText}>
            iPhone 12 Promo Campaign
          </Typography>
          <Typography
            variant='subtitle1'
            className={classes.portfolioSubheaderText}>
            Apple Inc.
          </Typography>

          <div
            style={{
              marginBottom: theme.spacing(2),
              marginTop: theme.spacing(2)
            }}>
            <Typography variant='body1' className={classes.portfolioTitleText}>
              Campaign Description
            </Typography>
            <Typography variant='body1' className={classes.portfolioBodyText}>
              Create briefs and documents used by designers, writers, artists,
              and agencies in the production of everything from graphic design
              and copy to websites and commercials.
            </Typography>
          </div>

          <Typography variant='body1' className={classes.portfolioTitleText}>
            Project Details
          </Typography>

          <div
            style={{
              display: 'flex',
              marginBottom: theme.spacing(0.5)
            }}>
            <div style={{ minWidth: 120 }}>
              <Typography
                variant='body1'
                style={{ marginRight: 10 }}
                className={classes.portfolioBodyText}>
                Campaign Objective:
              </Typography>
            </div>
            <Typography variant='body1' className={classes.portfolioBodyText}>
              Brand awareness for new product releases
            </Typography>
          </div>

          <div style={{ display: 'flex' }}>
            <div style={{ minWidth: 120 }}>
              <Typography
                variant='body1'
                style={{ marginRight: 10 }}
                className={classes.portfolioBodyText}
                noWrap={true}>
                Product Summary:
              </Typography>
            </div>
            <Typography variant='body1' className={classes.portfolioBodyText}>
              Create briefs and documents used by designers, writers, artists,
              and agencies in the production of everything from graphic design
              and copy to websites and commercials.
            </Typography>
          </div>

          <div className={classes.portfolioSwiperContainer}>
            {renderPortfolioSwiper()}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className={clsx('container', classes.container)}>
      <Section title={'Account Appearance'} className={classes.section}>
        <div className={classes.watermarkPickerOuter}>
          <div className={classes.watermarkPickerContainer}>
            <div className={classes.watermarkPickerInner}>
              <WatermarkPicker
                url={
                  watermarkFile
                    ? URL.createObjectURL(watermarkFile)
                    : accountUpdate.settings?.watermark
                }
                onChange={handleWatermarkChange}
                className={classes.watermarkPicker}
              />
              <Typography
                variant={'body1'}
                className={classes.watermarkPickerTitle}>
                Change logo
              </Typography>
            </div>
            <EditModal
              onSave={(val: any) => {
                setAccountUpdate((account) => ({ ...account, ...val }))
                handleSave({ ...account, ...val })
              }}
              className={classes.accountNameEditor}
              editItems={[
                {
                  title: 'Account Name',
                  value: accountUpdate.name,
                  key: 'name',
                  placeholder: 'Enter account name'
                }
              ]}
            />
          </div>
        </div>
      </Section>

      <Section title={'Branding Appearance'}>
        <div>
          <div
            className={clsx(classes.emailNotifications, classes.sectionInner)}>
            <Typography variant={'h6'}>
              Customize your email notifications
            </Typography>
            <Typography
              variant={'caption'}
              style={{ marginBottom: theme.spacing(2) }}>
              Customize your email notifications
            </Typography>
            <div style={{ display: 'flex' }}>
              <div>
                <ColorPicker
                  color={accountUpdate.branding.email.backgroundColor}
                  onChange={(color: string) =>
                    updateAccountEmailBranding('backgroundColor')(color)
                  }
                  label={'Background color'}
                  className={classes.colorPicker}
                />
                <ColorPicker
                  color={accountUpdate.branding.email.text}
                  onChange={(color: string) =>
                    updateAccountEmailBranding('text')(color)
                  }
                  label={'Text color'}
                  className={classes.colorPicker}
                />
                <ColorPicker
                  color={accountUpdate.branding.email.buttonBackgroundColor}
                  onChange={(color: string) =>
                    updateAccountEmailBranding('buttonBackgroundColor')(color)
                  }
                  label={'Button background'}
                  className={classes.colorPicker}
                />
                <ColorPicker
                  color={accountUpdate.branding.email.buttonTextColor}
                  onChange={(color: string) =>
                    updateAccountEmailBranding('buttonTextColor')(color)
                  }
                  label={'Background text'}
                  className={classes.colorPicker}
                />
              </div>
              {renderEmail()}
            </div>
          </div>
          <div className={clsx(classes.sectionInner)}>
            <Typography variant={'h6'}>
              Customize your portfolio page
            </Typography>
            <Typography
              variant={'caption'}
              style={{ marginBottom: theme.spacing(2) }}>
              Displayed through the portfolio sharing link
            </Typography>
            <div style={{ display: 'flex' }}>
              <div>
                <ColorPicker
                  color={accountUpdate.branding.portfolio.backgroundColor}
                  onChange={(color: string) =>
                    updateAccountPortfolioBranding('backgroundColor')(color)
                  }
                  label={'Background color'}
                  className={classes.colorPicker}
                />
                <ColorPicker
                  color={accountUpdate.branding.portfolio.foregroundColor}
                  onChange={(color: string) =>
                    updateAccountPortfolioBranding('foregroundColor')(color)
                  }
                  label={'Foreground color'}
                  className={classes.colorPicker}
                />
                <ColorPicker
                  color={accountUpdate.branding.portfolio.text}
                  onChange={(color: string) =>
                    updateAccountPortfolioBranding('text')(color)
                  }
                  label={'Text color'}
                  className={classes.colorPicker}
                />
                <ColorPicker
                  color={accountUpdate.branding.portfolio.headerGradient1}
                  onChange={(color: string) =>
                    updateAccountPortfolioBranding('headerGradient1')(color)
                  }
                  label={'Header gradient 1'}
                  className={classes.colorPicker}
                />
                <ColorPicker
                  color={accountUpdate.branding.portfolio.headerGradient2}
                  onChange={(color: string) =>
                    updateAccountPortfolioBranding('headerGradient2')(color)
                  }
                  label={'Header gradient 2'}
                  className={classes.colorPicker}
                />
              </div>
              {renderPortfolio()}
            </div>
          </div>
        </div>
      </Section>

      <GradiantButton
        className={classes.saveButton}
        onClick={() => handleSave(accountUpdate)}
        loading={loading}>
        <Typography variant='button'>Save</Typography>
      </GradiantButton>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  arrowIcon: { color: theme.palette.grey[500] },
  emailButton: {
    borderRadius: '100px',
    padding: `${theme.spacing(1.5)}px ${theme.spacing(2)}px`
  },
  emailButtonText: { fontWeight: 'bold' },
  emailContentAssets: { display: 'flex', flexDirection: 'column', flex: 1 },
  emailFooter: { display: 'flex', justifyContent: 'center' },
  emailHeader: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(1)
  },
  emailContent: {
    borderRadius: theme.shape.borderRadius,
    flex: 1,
    margin: theme.spacing(4),
    marginTop: theme.spacing(1),
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column'
  },
  emailHeaderLogo: {},

  portfolioSlide: {
    borderRadius: 5,
    overflow: 'hidden'
  },
  portfolioHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.secondary
  },
  portfolioHeaderIcon: { fontSize: 28 },
  portfolioHeaderTitleContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    marginLeft: theme.spacing(2)
  },
  portfolioHeaderImage: {},
  portfolioHeaderImageWrapper: {
    borderRadius: 100,
    width: 25,
    height: 25,
    overflow: 'hidden'
  },
  portfolioHeaderTitle: {
    color: theme.palette.text.background,
    fontSize: 10,
    marginLeft: theme.spacing(1.5)
  },
  notificationIcon: {
    color: theme.palette.common.white,
    fontSize: 20,
    marginRight: theme.spacing(1)
  },
  portfolioContent: {
    borderRadius: theme.shape.borderRadius,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    flex: 1,
    margin: theme.spacing(3),
    marginBottom: 0,
    padding: theme.spacing(4),
    paddingBottom: 0,
    display: 'flex',
    flexDirection: 'column',
    fontSize: 10
  },
  portfolioBanner: {},
  portfolioBannerText: { color: '#fff', fontSize: 10 },
  portfolioHeaderText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  portfolioSubheaderText: {
    fontSize: 10,
    marginTop: 0,
    margin: 0,
    lineHeight: 1
  },
  portfolioTitleText: {
    fontSize: 12,
    marginBottom: theme.spacing(0.5)
  },
  portfolioBodyText: {
    fontSize: 9
  },
  portfolioSwiperContainer: {
    display: 'flex',
    flex: 1,
    marginTop: theme.spacing(6)
  },

  brandingDisplaySection: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: theme.shape.borderRadius,
    borderColor: theme.palette.border,
    borderStyle: 'solid',
    borderWidth: 1,
    marginLeft: theme.spacing(15),
    overflow: 'hidden',
    maxHeight: 500
  },
  colorPicker: { marginTop: theme.spacing(1) },
  emailNotifications: { marginBottom: theme.spacing(4) },
  accountNameEditor: {
    marginTop: -30,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      marginTop: theme.spacing(3)
    }
  },
  watermarkPicker: {},
  watermarkPickerContainer: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      flex: 1
    }
  },
  watermarkPickerOuter: {
    display: 'flex',
    alignItems: 'center'
  },
  watermarkPickerInner: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginRight: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      marginRight: 0
    }
  },
  watermarkPickerTitle: {
    marginTop: theme.spacing(1),
    color: theme.palette.text.meta
  },
  container: {
    color: theme.palette.text.background,
    alignItems: 'center',
    paddingBottom: theme.spacing(6),
    justifyContent: 'center',
    width: '100%'
  },
  sectionInner: {
    background: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    padding: `${theme.spacing(3)}px ${theme.spacing(4)}px`,
    color: theme.palette.text.paper,
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column'
    }
  },
  sectionTextArea: {
    flex: 1,
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(4)
    }
  },
  section: {
    marginBottom: theme.spacing(4)
  },
  saveButton: {
    marginTop: theme.spacing(5),
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    minWidth: 150
  }
}))

const mapState = (state: ReduxState): StateProps => ({
  account: state.auth.account as Account,
  updateSuccess: state.auth.accountUpdateSuccess,
  updateError: state.auth.accountUpdateError,
  user: state.auth.user as User
})

const mapDispatch = (dispatch: any): DispatchProps => ({
  updateAccount: (account: Account) => dispatch(updateAccount(account))
})

export default connect(mapState, mapDispatch)(BrandingScreen)
