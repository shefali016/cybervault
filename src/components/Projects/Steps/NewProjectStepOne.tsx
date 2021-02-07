import '../Projects.css'
import React, { ChangeEvent, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
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
import NewProjectFooter from '../NewProjectFooter'
import NewProjectTitle from '../NewProjectTitle'
import { GradiantButton } from '../../Common/Button/GradiantButton'
import AppSelect from '../../Common/Core/AppSelect'
import { Client } from '../../../utils/Interface'
import { getClientsRequest } from '../../../actions/clientActions'
import AddClient from '../../Client/AddClient'

const NewProjectStepOne = (props: any) => {
  const classes = useStyles()
  const {
    projectData,
    haveError,
    clients,
    addClient,
    setAddClient,
    currentStep,
    account,
    setClientData,
    clientData
  } = props

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getClientsRequest(account))
  }, [])

  useEffect(() => {
    if (clients.length) {
      setClientData(
        projectData.clientId
          ? clients.find((client: Client) => client.id === projectData.clientId)
          : clients[0]
      )
    }
  }, [clients])

  const handleChooseClient = (event: any) => {
    const val = event.target.value
    let item = clients.find((cl: Client, i: number) => {
      return cl.id === val
    })
    setClientData(item)
  }

  const renderClientSelect = () => {
    if (addClient) return null

    return (
      <>
        <NewProjectTitle title={'New Project'} subtitle={'Choose a client'} />
        <Grid item sm={8} className={classes.chooseClientWrapper}>
          <Typography>
            Add a new Client or get started with existing client
          </Typography>
          <Typography className={classes.textSecondary}>
            Choose an existing client
          </Typography>
          <AppSelect
            className={classes.select}
            items={clients.map((cl: Client) => {
              return { value: cl.id, title: cl.name }
            })}
            value={clientData.id}
            onChange={(event: any) => {
              handleChooseClient(event)
            }}
          />
          <Typography className={`${classes.bar} ${classes.textCenter}`}>
            Or
          </Typography>
          <Typography className={classes.gradientBtnWrapper}>
            <GradiantButton
              onClick={() => setAddClient(!addClient)}
              className={classes.gradientBtn}>
              Add Client
            </GradiantButton>
          </Typography>
        </Grid>
      </>
    )
  }

  const renderAddClient = () => {
    if (!addClient) return null

    return (
      <AddClient
        onBack={props.onBack}
        account={account}
        showStep={true}
        stepText={'step 1 of 5'}
      />
    )
  }

  const renderMiddleView = () => {
    return (
      <div className={classes.middleView}>
        {renderClientSelect()}
        {renderAddClient()}
      </div>
    )
  }

  return (
    <div className={classes.container}>
      {renderMiddleView()}
      {!addClient ? (
        <NewProjectFooter
          title={props.isEdit ? '' : 'Step 1 of 5'}
          onNext={props.onNext}
          onUpdate={props.onUpdate}
          onBack={props.onBack}
          haveError={haveError ? haveError : false}
          projectData={projectData}
          currentStep={currentStep}
          disabled={!clients.length}
        />
      ) : null}
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
    color: theme.palette.text.meta,
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(3)
  },
  select: {
    width: '100%',
    '& div': {
      padding: '12px'
    }
  },
  chooseClientWrapper: {
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  textCenter: {
    textAlign: CENTER
  },
  bar: {
    color: GREY_COLOR,
    position: 'relative',
    padding: '15px',
    '&:before': {
      content: 'close-quote',
      position: 'absolute',
      width: '50%',
      height: '1px',
      backgroundColor: GREY_COLOR,
      top: '50%',
      left: '-40px',
      [theme.breakpoints.down('sm')]: {
        left: '0',
        width: '45%'
      }
    },
    '&:after': {
      content: 'close-quote',
      position: 'absolute',
      width: '50%',
      height: '1px',
      backgroundColor: GREY_COLOR,
      top: '50%',
      right: '-40px',
      [theme.breakpoints.down('sm')]: {
        right: '0',
        width: '45%'
      }
    }
  },
  gradientBtn: {
    minWidth: '125px',
    borderRadius: '24px'
  },
  gradientBtnWrapper: {
    textAlign: CENTER
  }
}))

export default NewProjectStepOne
