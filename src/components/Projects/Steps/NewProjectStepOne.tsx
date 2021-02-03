import '../Projects.css'
import React, { ChangeEvent,useState,useEffect } from 'react'
import {useDispatch} from 'react-redux';
import { makeStyles, Typography, Button,Grid } from '@material-ui/core'
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
import AppTextField from '../../Common/Core/AppTextField'
import NewProjectFooter from '../NewProjectFooter'
import NewProjectTitle from '../NewProjectTitle'
import { useTabletLayout } from '../../../utils/hooks/'
import {GradiantButton} from '../../Common/Button/GradiantButton'
import AppSelect from '../../Common/Core/AppSelect'
import {Client} from '../../../utils/Interface';
import {getClientsRequest} from '../../../actions/clientActions';



const NewProjectStepOne = (props: any) => {
  const classes = useStyles()
  const isTablet = useTabletLayout()
  const { projectData, setProjectData, haveError,
     setLogoFile,clients,addClient ,setAddClient,
     currentStep,account,addClientLoading,setClientData,clientData} = props
  let imageInputRef: any = React.useRef()

  const handleChange = async (event: any) => {
    if (event.target && event.target.files && event.target.files.length > 0) {
      setLogoFile(event.target.files[0])
      setClientData({
        ...clientData,
        logo: URL.createObjectURL(event.target.files[0])
      })
    }
  }

  const handleInputChange = (event: any) => (key: string) => {
    const value = event.target.value
    setClientData({ ...clientData, [key]: value })
  }

  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getClientsRequest(account))
  },[])

  useEffect(()=>{
    if(clients.length){
      setClientData(clients[0])
    }
  },[clients])
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
  const handleChooseClient=(event:any)=>{
    const val=event.target.value
    let item =clients.find((cl:Client,i:number)=>{
        return cl.id===val
    })
    setClientData(item)
  }

  const renderMiddleView = () => {
    const leftInputMargin = !isTablet ? 15 : 0
    return (
      <div className={classes.middleView}>
         {!addClient ?<Grid item sm={8} className={classes.chooseClientWrapper}>
            <Typography paragraph>
              {' '}
              Add a new Client or get started with existing client
            </Typography>
            <Typography paragraph className={classes.textSecondary}>
              {' '}
              Choose an existing client
            </Typography>
            <AppSelect
              className={classes.select}
              items={clients.map((cl:Client)=>{
                return {value:cl.id,title:cl.name}
              })}
              value={clientData.id}
              onChange={(event: any) => {
                handleChooseClient(event)
              }}
            />
            <Typography className={`${classes.bar} ${classes.textCenter}`}>Or</Typography>
            <Typography className={classes.gradientBtnWrapper}>
            <GradiantButton onClick={()=>setAddClient(!addClient)} className={classes.gradientBtn}>Add Client</GradiantButton>

            </Typography>
            </Grid>
      : <>
        {!props.isEdit ? renderClientLogoView() : null}

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
        {!props.isEdit ? (
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
        {!props.isEdit ? (
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
        ) : null}
        </>
      }
      </div>
    )
  }

  return (
    <div className={classes.container}>
      {!props.isEdit ? (
        <NewProjectTitle title={'New Project'} subtitle={'Get Started'} />
      ) : (
        <NewProjectTitle title={'Edit Client Details'} subtitle={''} />
      )}
      {renderMiddleView()}
      <NewProjectFooter
        title={props.isEdit ? '' : 'Step 1 of 5'}
        onNext={props.onNext}
        onUpdate={props.onUpdate}
        onBack={props.onBack}
        haveError={haveError ? haveError : false}
        projectData={projectData}
        addClient={addClient}
        currentStep={currentStep}
        isLoading={addClientLoading}
      />
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: FLEX,
    flex: 1,
    flexDirection: COLUMN
  },
  headerTitle: {
    fontWeight: BOLD
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
  middleView: {
    flex: 1,
    display: FLEX,
    flexDirection: COLUMN,
  },
  textFiledContainer: {
    display: FLEX,
    flex: 1,
    flexDirection: ROW,
    justifyContent: CENTER,
    marginBottom: 20
  },
  textField: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: 0,
    marginTop: 0,
    marginBottom: 0,
    fontWeight: 500,
    fontSize: 8,
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: GREY_COLOR,
      borderRadius: 20
    },
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: PRIMARY_COLOR
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: PRIMARY_COLOR
    }
  },
  input: {
    color: PRIMARY_COLOR,
    fontSize: 8
  },
  inputRoot: {
    fontSize: 10,
    height: 25
  },
  labelRoot: {
    fontSize: 10,
    color: GREY_COLOR,
    '&$labelFocused': {
      color: PRIMARY_DARK_COLOR,
      marginTop: 2
    },
    height: 25,
    marginTop: -5
  },
  labelRootFilled: {
    fontSize: 10,
    color: GREY_COLOR,
    '&$labelFocused': {
      color: PRIMARY_DARK_COLOR,
      marginTop: 2
    },
    height: 25,
    marginTop: 0
  },
  labelFocused: {},
  closeButton: {
    position: POSITION_ABSOLUTE,
    top: 10,
    right: 10
  },
  textSecondary:{
    color:GREY_COLOR
  },
  select:{
    width:'100%',
    '& div':{
      padding:'12px'
    }
  },
  chooseClientWrapper:{
    margin:'auto',
  },
  textCenter:{
    textAlign:CENTER
  },
  bar:{
    color: GREY_COLOR,
    position:'relative',
    padding:'15px',
    '&:before':{
      content:'close-quote',
      position:'absolute',
      width:'50%',
      height:'1px',
      backgroundColor:GREY_COLOR,
      top:'50%',
      left:'-40px',
      [theme.breakpoints.down('sm')]: {
        left:'0',
        width:'45%'
      }
    },
    '&:after':{
      content:'close-quote',
      position:'absolute',
      width:'50%',
      height:'1px',
      backgroundColor:GREY_COLOR,
      top:'50%',
      right:'-40px',
      [theme.breakpoints.down('sm')]: {
        right:'0',
        width:'45%'

      }
    }
  },
  gradientBtn:{
    minWidth:'125px',
    borderRadius:'24px'
  },
  gradientBtnWrapper:{
    textAlign:CENTER
  }
}))

export default NewProjectStepOne
