import React, { ChangeEvent, useState, useEffect } from 'react'
import { useDispatch ,useSelector} from 'react-redux'
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
import { Client,Account } from '../../utils/Interface'
import NewProjectTitle from '../Projects/NewProjectTitle';
import NewProjectFooter from '../Projects/NewProjectFooter';
import { generateUid, getClientData} from '../../utils';
import {addClientRequest} from '../../actions/clientActions';
import {validateAddClient} from '../../utils/helpers'

type AddClientProps = {
  isEdit?: Boolean
  onBack:()=>void
  onUpdate?:()=>void
  account:Account
}

export const AddClient = (props: AddClientProps) => {
    const [clientData, setClientData] = useState(getClientData())
    const [haveError, setHaveError] = useState(false)

    const dispatch=useDispatch()
    const isLoading=useSelector((state:any)=>state.clients.newClientLoading)


  const { isEdit,onBack,onUpdate,account } = props
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
            onChange={handleChange}
            style={{ display: 'none' }}
          />
          {!!clientData.logo && (
            <img
              src={clientData.logo}
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

  const handleChange = async (event: any) => {
    if (event.target && event.target.files && event.target.files.length > 0) {
      setClientData({
        ...clientData,
        logo: URL.createObjectURL(event.target.files[0])
      })
    }
  }

  const renderMiddleView = () => {
    return <>
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
    {
      !isEdit ? (
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
      ) : null
    }
    {
      !isEdit ? (
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
      ) : null
    }
    </>
  }
  const handleAddClient=()=>{

  const isError = validateAddClient(clientData)
   if(isError){
        setHaveError(isError)
   }
   else{
    let clientId=generateUid()
    setClientData({...clientData,id:clientId})
    const payload={
      ...clientData,
      id:clientId,
    }
    dispatch(addClientRequest(account,payload))
   }
  }

  return (
    <>
      <NewProjectTitle title={'New Project'} subtitle={'Add a client'} />
      {!isEdit ? renderClientLogoView() : null}

      {renderMiddleView()}
      <NewProjectFooter
        title={props.isEdit ? '' : 'Step 1 of 5'}
        buttonText={'Add Client'}
        onNext={handleAddClient}
        onUpdate={onUpdate}
        onBack={onBack}
        haveError={haveError ? haveError : false}
        addClient={true}
        isLoading={isLoading}
      />
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
