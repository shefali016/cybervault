import '../Projects.css'
import React, { ChangeEvent } from 'react'
import { makeStyles, Typography, Button } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
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
import NewProjectFooter from '../NewProjectFooter'
import NewProjectTitle from '../NewProjectTitle'
import { useTabletLayout } from '../../../utils/hooks/'

const NewProjectStepOne = (props: any) => {
  const classes = useStyles()
  const isTablet = useTabletLayout()
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
    const leftInputMargin = !isTablet ? 15 : 0
    const verticalMargin = 8
    const inputStyle = {
      marginTop: verticalMargin,
      marginBottom: verticalMargin,
    }
    return (
      <div className={classes.middleView}>
        <div className={'input-row'} style={{ marginBottom: 40 }}>
          <div style={{ flex: 1, marginRight: leftInputMargin }}>
            <AppTextField
              style={inputStyle}
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
              style={inputStyle}
              type={'date'}
              label={'Campaign Date'}
              value={projectData.campaignDate}
              onChange={(e: ChangeEvent) =>
                handleInputChange(e)('campaignDate')
              }
            />
          </div>
        </div>
        <div className={'input-row'}>
          <div style={{ flex: 1, marginRight: leftInputMargin }}>
            <AppTextField
              style={inputStyle}
              type={''}
              label={'Client Name'}
              value={projectData.clientName}
              onChange={(e: ChangeEvent) => handleInputChange(e)('clientName')}
            />
          </div>
          <div style={{ flex: 1 }}>
            <AppTextField
              style={inputStyle}
              type={''}
              label={'Client Email'}
              value={projectData.clientEmail}
              onChange={(e: ChangeEvent) => handleInputChange(e)('clientEmail')}
            />
          </div>
        </div>
        <div className={'input-row'}>
          <div style={{ flex: 1, marginRight: leftInputMargin }}>
            <AppTextField
              style={inputStyle}
              type={''}
              label={'Address'}
              value={projectData.address}
              onChange={(e: ChangeEvent) => handleInputChange(e)('address')}
            />
          </div>
          <div style={{ flex: 1 }}>
            <AppTextField
              style={inputStyle}
              type={''}
              label={'City'}
              value={projectData.city}
              onChange={(e: ChangeEvent) => handleInputChange(e)('city')}
            />
          </div>
        </div>
        <div className={'input-row'}>
          <div style={{ flex: 1, marginRight: leftInputMargin }}>
            <AppTextField
              style={inputStyle}
              type={''}
              label={'State/Province'}
              value={projectData.state}
              onChange={(e: ChangeEvent) => handleInputChange(e)('state')}
            />
          </div>
          <div style={{ flex: 1 }}>
            <AppTextField
              style={inputStyle}
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
