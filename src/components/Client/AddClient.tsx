import React, { ChangeEvent, useState, useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles, Typography, Button, Grid } from '@material-ui/core'
import {
  PRIMARY_COLOR,
  TRANSPARENT,
  PRIMARY_DARK_COLOR,
  GREY_COLOR,
  SECONDARY_COLOR,
  LIGHT_GREY_BG
} from 'utils/constants/colorsConstants'
import {
  BOLD,
  CENTER,
  COLUMN,
  FLEX,
  POSITION_ABSOLUTE,
  ROW
} from 'utils/constants/stringConstants'
import AppTextField from '../Common/Core/AppTextField'
import { useTabletLayout } from '../../utils/hooks'
import { Client, Account } from '../../utils/Interface'
import NewProjectTitle from '../Projects/NewProjectTitle'
import NewProjectFooter from '../Projects/NewProjectFooter'
import { generateUid, getClientData } from '../../utils'
import { addClientRequest } from '../../actions/clientActions'
import { validateAddClient } from '../../utils/helpers'
import { ToastContext, ToastTypes } from '../../context/Toast'
import { useOnChange } from '../../utils/hooks'
import { setMedia } from 'apis/assets'

type AddClientProps = {
  isEdit: boolean
  onBack: () => void
  onUpdate?: () => void
  account: Account
  showStep?: boolean
  stepText?: string
}

export const AddClient = (props: AddClientProps) => {
  const [clientData, setClientData] = useState<Client>(getClientData())
  const [haveError, setHaveError] = useState(false)
  const [logoFile, setLogoFile] = useState(null)

  const dispatch = useDispatch()
  const isLoading = useSelector((state: any) => state.clients.newClientLoading)
  const errorMsg = useSelector((state: any) => state.clients.newClientErrorMsg)
  const updateError = useSelector((state: any) => state.clients.newClientError)

  const toastContext = useContext(ToastContext)

  useOnChange(updateError, (error: string | null) => {
    if (error) {
      toastContext.showToast({ title: errorMsg, type: ToastTypes.error })
    }
  })

  const { isEdit, onBack, onUpdate, account } = props
  const isTablet = useTabletLayout()
  let imageInputRef: any = React.useRef()
  const classes = useStyles()
  const leftInputMargin = !isTablet ? 15 : 0

  const renderClientLogoView = () => {
    return (
      <div className={'client-logo-container'}>
        <Button
          variant='contained'
          onClick={() => imageInputRef.click()}
          className={classes.clientLogo}>
          <input
            type='file'
            accept='image/*'
            capture='camera'
            name='avatar'
            ref={(input) => {
              imageInputRef = input
            }}
            onChange={handleLogoChange}
            style={{ display: 'none' }}
          />
          {(!!clientData.logo || !!logoFile) && (
            <img
              src={clientData.logo || URL.createObjectURL(logoFile)}
              className={classes.clientLogoImg}
              alt={'client-logo'}
            />
          )}
        </Button>
        <Typography variant={'caption'} className={classes.addLogoText}>
          Add Client Logo
        </Typography>
      </div>
    )
  }

  const handleInputChange = (event: any) => (key: string) => {
    const value = event.target.value
    setClientData({ ...clientData, [key]: value })
  }

  const handleLogoChange = async (event: any) => {
    if (event.target && event.target.files && event.target.files.length > 0) {
      setLogoFile(event.target.files[0])
    }
  }

  const renderMiddleView = () => {
    return (
      <>
        <div className={'input-row'}>
          <div style={{ flex: 1, marginRight: leftInputMargin }}>
            <AppTextField
              error={haveError && clientData.name === '' ? true : false}
              type={''}
              label={'Client Name'}
              value={clientData.name}
              onChange={(e: ChangeEvent) => handleInputChange(e)('name')}
            />
          </div>
          <div style={{ flex: 1 }}>
            <AppTextField
              error={haveError && clientData.email === '' ? true : false}
              type={''}
              label={'Client Email'}
              value={clientData.email}
              onChange={(e: ChangeEvent) => handleInputChange(e)('email')}
            />
          </div>
        </div>
        {!isEdit ? (
          <div className={'input-row'}>
            <div style={{ flex: 1, marginRight: leftInputMargin }}>
              <AppTextField
                error={haveError && clientData.address === '' ? true : false}
                type={''}
                label={'Address'}
                value={clientData.address}
                onChange={(e: ChangeEvent) => handleInputChange(e)('address')}
              />
            </div>
            <div style={{ flex: 1 }}>
              <AppTextField
                error={haveError && clientData.city === '' ? true : false}
                type={''}
                label={'City'}
                value={clientData.city}
                onChange={(e: ChangeEvent) => handleInputChange(e)('city')}
              />
            </div>
          </div>
        ) : null}
        {!isEdit && (
          <div className={'input-row'}>
            <div style={{ flex: 1, marginRight: leftInputMargin }}>
              <AppTextField
                error={haveError && clientData.state === '' ? true : false}
                type={''}
                label={'State/Province'}
                value={clientData.state}
                onChange={(e: ChangeEvent) => handleInputChange(e)('state')}
              />
            </div>
            <div style={{ flex: 1 }}>
              <AppTextField
                error={haveError && clientData.country === '' ? true : false}
                type={''}
                label={'Country'}
                value={clientData.country}
                onChange={(e: ChangeEvent) => handleInputChange(e)('country')}
              />
            </div>
          </div>
        )}
      </>
    )
  }
  const handleAddClient = async () => {
    const isError = validateAddClient(clientData)
    if (isError) {
      setHaveError(isError)
    } else {
      let clientId = generateUid()

      let logo = null

      try {
        if (logoFile) {
          logo = await setMedia(`ClientLogos/${clientId}`, logoFile)
        }

        const client: Client = {
          ...clientData,
          logo,
          id: clientId
        }

        setClientData(client)

        dispatch(addClientRequest(account, client))
      } catch (error) {}
    }
  }

  const renderFooterWithStep = () => {
    if (props.showStep) {
      return (
        <NewProjectFooter
          title={props.stepText}
          buttonText={'Add Client'}
          onNext={handleAddClient}
          onBack={onBack}
          onUpdate={onUpdate}
          haveError={haveError ? haveError : false}
          addClient={true}
          isLoading={isLoading}
          isEdit={isEdit}
        />
      )
    }
  }
  const renderFooterWithoutStep = () => {
    if (!props.showStep) {
      return (
        <NewProjectFooter
          buttonText={'Add Client'}
          onNext={handleAddClient}
          onUpdate={onUpdate}
          haveError={haveError ? haveError : false}
          addClient={true}
          isLoading={isLoading}
          isEdit={isEdit}
        />
      )
    }
  }

  return (
    <>
      <NewProjectTitle title={'New Project'} subtitle={'Add a client'} />
      {renderClientLogoView()}
      {renderMiddleView()}
      {renderFooterWithStep()}
      {renderFooterWithoutStep()}
    </>
  )
}

export default AddClient

const useStyles = makeStyles((theme) => ({
  container: {
    display: FLEX,
    flex: 1,
    flexDirection: COLUMN
  },
  clientLogo: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: TRANSPARENT,
    marginBottom: 5,
    overflow: 'hidden'
  },
  clientLogoImg: {
    height: 80,
    borderRadius: 40,
    position: POSITION_ABSOLUTE
  },
  addLogoText: {
    fontSize: 10,
    color: GREY_COLOR
  },

  textCenter: {
    textAlign: CENTER
  },

  gradientBtn: {
    minWidth: '125px',
    borderRadius: '24px'
  },
  gradientBtnWrapper: {
    textAlign: CENTER
  }
}))
