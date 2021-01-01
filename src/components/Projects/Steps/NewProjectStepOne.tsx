import React, { ChangeEvent } from 'react'
import { makeStyles, Typography, Button } from '@material-ui/core'
import {
  PRIMARY_COLOR,
  TRANSPARENT,
  PRIMARY_DARK_COLOR,
  GREY_COLOR,
} from 'utils/constants/colorsConstants'
import {
  BOLD,
  CENTER,
  COLUMN,
  FLEX,
  POSITION_ABSOLUTE,
  ROW,
} from 'utils/constants/stringConstants'
import nikeLogo from '../../../assets/nike.png'
import AppTextField from '../../Common/Core/AppTextField'
import NewProjectFooter from './NewProjectFooter'
import NewProjectTitle from '../NewProjectTitle'

const NewProjectStepOne = (props: any) => {
  const classes = useStyles()
  const { projectData, setProjectData } = props
  let imageInputRef: any = React.useRef()

  const handleChange = (event: any) => {
    if (event.target && event.target.files && event.target.files.length > 0) {
      setProjectData({
        ...projectData,
        logo: URL.createObjectURL(event.target.files[0]),
      })
    }
  }

  const handleInputChange = (event: any) => (key: string) => {
    const value = event.target.value
    setProjectData({ ...projectData, [key]: value })
  }

  const renderClientLogoView = () => {
    return (
      <div className={classes.clientLogoContainer}>
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
          />
          <img
            src={projectData.logo !== '' ? projectData.logo : nikeLogo}
            className={classes.clientLogoImg}
          />
        </Button>
        <Typography variant={'caption'} className={classes.addLogoText}>
          Add Client Logo
        </Typography>
      </div>
    )
  }

  const renderMiddleView = () => {
    return (
      <div className={classes.middleView}>
        <div
          className={classes.textFiledContainer}
          style={{ marginBottom: 40 }}>
          <div style={{ flex: 1, marginRight: 15 }}>
            <AppTextField
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
              type={'date'}
              label={'Campaign Date'}
              value={projectData.campaignDate}
              onChange={(e: ChangeEvent) =>
                handleInputChange(e)('campaignDate')
              }
            />
          </div>
        </div>
        <div className={classes.textFiledContainer}>
          <div style={{ flex: 1, marginRight: 15 }}>
            <AppTextField
              type={''}
              label={'Client Name'}
              value={projectData.clientName}
              onChange={(e: ChangeEvent) => handleInputChange(e)('clientName')}
            />
          </div>
          <div style={{ flex: 1 }}>
            <AppTextField
              type={''}
              label={'Client Email'}
              value={projectData.clientEmail}
              onChange={(e: ChangeEvent) => handleInputChange(e)('clientEmail')}
            />
          </div>
        </div>
        <div className={classes.textFiledContainer}>
          <div style={{ flex: 1, marginRight: 15 }}>
            <AppTextField
              type={''}
              label={'Address'}
              value={projectData.address}
              onChange={(e: ChangeEvent) => handleInputChange(e)('address')}
            />
          </div>
          <div style={{ flex: 1 }}>
            <AppTextField
              type={''}
              label={'City'}
              value={projectData.city}
              onChange={(e: ChangeEvent) => handleInputChange(e)('city')}
            />
          </div>
        </div>
        <div className={classes.textFiledContainer}>
          <div style={{ flex: 1, marginRight: 15 }}>
            <AppTextField
              type={''}
              label={'State/Province'}
              value={projectData.state}
              onChange={(e: ChangeEvent) => handleInputChange(e)('state')}
            />
          </div>
          <div style={{ flex: 1 }}>
            <AppTextField
              type={''}
              label={'Country'}
              value={projectData.country}
              onChange={(e: ChangeEvent) => handleInputChange(e)('country')}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={classes.container}>
      <NewProjectTitle title={'New Project'} subtitle={'Get Started'} />
      {renderClientLogoView()}
      {renderMiddleView()}
      <NewProjectFooter title={'Step 1 of 5'} onNext={props.onNext} />
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: FLEX,
    flex: 1,
    flexDirection: COLUMN,
  },
  headerTitle: {
    fontWeight: BOLD,
  },
  clientLogoContainer: {
    display: FLEX,
    flex: 1,
    marginTop: -60,
    marginBottom: 40,
    alignItems: CENTER,
    justifyContent: CENTER,
    flexDirection: COLUMN,
  },
  clientLogo: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: TRANSPARENT,
    marginBottom: 5,
  },
  clientLogoImg: {
    height: 80,
    width: 80,
    borderRadius: 40,
    position: POSITION_ABSOLUTE,
  },
  addLogoText: {
    fontSize: 10,
    color: GREY_COLOR,
  },
  middleView: {
    flex: 0.5,
    display: FLEX,
    flexDirection: COLUMN,
  },
  textFiledContainer: {
    display: FLEX,
    flex: 1,
    flexDirection: ROW,
    justifyContent: CENTER,
    marginBottom: 20,
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
      borderRadius: 20,
    },
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: PRIMARY_COLOR,
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: PRIMARY_COLOR,
    },
  },
  input: {
    color: PRIMARY_COLOR,
    fontSize: 8,
  },
  inputRoot: {
    fontSize: 10,
    height: 25,
  },
  labelRoot: {
    fontSize: 10,
    color: GREY_COLOR,
    '&$labelFocused': {
      color: PRIMARY_DARK_COLOR,
      marginTop: 2,
    },
    height: 25,
    marginTop: -5,
  },
  labelRootFilled: {
    fontSize: 10,
    color: GREY_COLOR,
    '&$labelFocused': {
      color: PRIMARY_DARK_COLOR,
      marginTop: 2,
    },
    height: 25,
    marginTop: 0,
  },
  labelFocused: {},
  closeButton: {
    position: POSITION_ABSOLUTE,
    top: 10,
    right: 10,
  },
}))

export default NewProjectStepOne
