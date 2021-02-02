import '../Projects.css'
import React, { ChangeEvent } from 'react'
import { makeStyles, Typography, Button, Grid } from '@material-ui/core'
import {
  PRIMARY_COLOR,
  TRANSPARENT,
  PRIMARY_DARK_COLOR,
  GREY_COLOR
} from 'utils/constants/colorsConstants'
import {
  BOLD,
  CENTER,
  COLUMN,
  FLEX,
  POSITION_ABSOLUTE,
  ROW
} from 'utils/constants/stringConstants'
import { InputChangeEvent, Task } from '../../../utils/Interface'
import AppTextField from '../../Common/Core/AppTextField'
import NewProjectFooter from '../NewProjectFooter'
import NewProjectTitle from '../NewProjectTitle'
import { useTabletLayout } from '../../../utils/hooks/'
import AppSelect from '../../Common/Core/AppSelect'
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {getClientsRequest} from '../../../actions/clientActions';

const NewProjectStepTwo = (props: any) => {
  const classes = useStyles()
  const isTablet = useTabletLayout()
  const { projectData, setProjectData, haveError, setLogoFile ,account} = props
  let imageInputRef: any = React.useRef()

  const handleChange = async (event: any) => {
    if (event.target && event.target.files && event.target.files.length > 0) {
      setLogoFile(event.target.files[0])
      setProjectData({
        ...projectData,
        logo: URL.createObjectURL(event.target.files[0])
      })
    }
  }

  const handleInputChange = (event: any) => (key: string) => {
    const value = event.target.value
    setProjectData({ ...projectData, [key]: value })
  }

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
          {!!projectData.logo && (
            <img
              src={projectData.logo}
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
const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getClientsRequest(account))
  },[])

  const renderMiddleView = () => {
    const leftInputMargin = !isTablet ? 15 : 0
    return (
      <Grid className={classes.middleView} container alignItems='center'>          
          {!props.isEdit ? (
          <div className={'input-row'} style={{ marginBottom: 30 }}>
            <div style={{ flex: 1, marginRight: leftInputMargin }}>
              <AppTextField
                error={
                  haveError && projectData.campaignName === '' ? true : false
                }
                type={''}
                label={'Campaign Name'}
                value={projectData.campaignName}
                onChange={(e: ChangeEvent) =>
                  handleInputChange(e)('campaignName')
                }
              />
            </div>
            <div style={{ flex: 1 }}>
              <AppTextField
                error={
                  haveError && projectData.campaignDate === '' ? true : false
                }
                type={'date'}
                label={'Campaign Date'}
                value={projectData.campaignDate}
                onChange={(e: ChangeEvent) =>
                  handleInputChange(e)('campaignDate')
                }
              />
            </div>
          </div>
        ) : null}
        
        
      </Grid>
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
        title={props.isEdit ? '' : 'Step 2 of 6'}
        onNext={props.onNext}
        onUpdate={props.onUpdate}
        haveError={haveError ? haveError : false}
        projectData={projectData}
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
    flexDirection: COLUMN
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
  textSecondary: {
    color: GREY_COLOR
  }
}))

export default NewProjectStepTwo
