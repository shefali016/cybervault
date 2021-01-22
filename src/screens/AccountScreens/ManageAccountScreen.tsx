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
import RegionSelect from 'components/Selects/RegionSelect'
import {
  Region,
  Account,
  WatermarkStyle,
  WatermarkControl,
  SharingPrivacy
} from 'utils/Interface'
import SharingPrivacySelect from 'components/Selects/SharingPrivacySelect'
import WatermarkStyleSelect from 'components/Selects/WatermarkStyleSelect'
import WatermarkControlSelect from 'components/Selects/WatermarkControlSelect'
import WatermarkPicker from 'components/Assets/WatermarkPicker'
import { GradiantButton } from 'components/Common/Button/GradiantButton'
import { setMedia } from 'apis/assets'

type StateProps = {
  account: Account
  updateSuccess: boolean
  updateError: string | null
}
type DispatchProps = { updateAccount: (account: Account) => void }
type ReduxProps = StateProps & DispatchProps
type Props = {}

const ManageAccountScreen = ({
  account,
  updateSuccess,
  updateError,
  updateAccount
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

  const updateAccountRegion = (region: Region) => {
    setAccountUpdate((account) => ({ ...account, region }))
  }

  const updateAccountSettings = (key: string) => (val: any) =>
    setAccountUpdate((account: Account) => ({
      ...account,
      settings: { ...account.settings, [key]: val }
    }))

  const handleWatermarkChange = (file: File) => {
    setWatermarkFile(file)
  }

  const handleSave = async () => {
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
          throw Error('invalid_watermark_url')
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

  return (
    <div className={clsx('container', classes.container)}>
      <Section title={'Invoicing Currency'} className={classes.section}>
        <div className={classes.sectionInner}>
          <div className={classes.sectionTextArea}>
            <Typography variant='subtitle1'>
              Choose the currency in which you are invoicing clients
            </Typography>
            <Typography variant='caption'>
              It is recommended to choose the currency from the region you
              reside.
            </Typography>
          </div>
          <RegionSelect
            showCurrency={true}
            onChange={(region: Region) => updateAccountRegion(region)}
            regionCode={accountUpdate.region?.code}
          />
        </div>
      </Section>

      <Section title={'Sharing Permissions'} className={classes.section}>
        <div className={classes.sectionInner}>
          <div className={classes.sectionTextArea}>
            <Typography variant='subtitle1'>
              Clients can share project preview links with others
            </Typography>
            <Typography variant='caption'>
              Viewers can also download a previewed watermarked version
            </Typography>
          </div>
          <SharingPrivacySelect
            onChange={(sharingPrivacy: SharingPrivacy) =>
              updateAccountSettings('sharingPrivacy')(sharingPrivacy)
            }
            privacy={accountUpdate.settings?.sharingPrivacy}
          />
        </div>
      </Section>

      <Section title={'Watermark Settings'}>
        <div>
          <div className={classes.watermarkPickerContainer}>
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

          <div
            className={classes.sectionInner}
            style={{ marginBottom: theme.spacing(4) }}>
            <div className={classes.sectionTextArea}>
              <Typography variant='subtitle1'>Watermark appearance</Typography>
              <Typography variant='caption'>
                Choose the style in which assets are watermaked
              </Typography>
            </div>
            <WatermarkStyleSelect
              onChange={(watermarkStyle: WatermarkStyle) =>
                updateAccountSettings('watermarkStyle')(watermarkStyle)
              }
              watermarkStyle={accountUpdate.settings?.watermarkStyle}
            />
          </div>

          <div className={classes.sectionInner}>
            <div className={classes.sectionTextArea}>
              <Typography variant='subtitle1'>
                Require watermark on all external links
              </Typography>
              <Typography variant='caption'>
                Visible on project previews and portfolio sharing
              </Typography>
            </div>
            <WatermarkControlSelect
              onChange={(watermarkControl: WatermarkControl) =>
                updateAccountSettings('watermarkControl')(watermarkControl)
              }
              watermarkControl={accountUpdate.settings?.watermarkControl}
            />
          </div>
        </div>
      </Section>

      <GradiantButton
        className={classes.saveButton}
        onClick={handleSave}
        loading={loading}>
        <Typography variant='button'>Save</Typography>
      </GradiantButton>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  watermarkPicker: {},
  watermarkPickerContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(4)
  },
  watermarkPickerTitle: {
    marginLeft: theme.spacing(3),
    color: theme.palette.grey[400]
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
    padding: '15px 25px',
    color: theme.palette.text.paper,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
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
    paddingTop: 10,
    paddingBottom: 10,
    minWidth: 150
  }
}))

const mapState = (state: ReduxState): StateProps => ({
  account: state.auth.account as Account,
  updateSuccess: state.auth.accountUpdateSuccess,
  updateError: state.auth.accountUpdateError
})

const mapDispatch = (dispatch: any): DispatchProps => ({
  updateAccount: (account: Account) => dispatch(updateAccount(account))
})

export default connect(mapState, mapDispatch)(ManageAccountScreen)
