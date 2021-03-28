import '../Projects.css'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles, Typography, Grid, IconButton } from '@material-ui/core'
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
import NewProjectFooter from '../NewProjectFooter'
import NewProjectTitle from '../../Common/Modal/ModalTitle'
import { GradiantButton } from '../../Common/Button/GradiantButton'
import AppSelect from '../../Common/Core/AppSelect'
import { Client } from '../../../utils/Interface'
import { getAllClientsRequest } from '../../../actions/clientActions'
import AddClient from '../../Client/AddClient'
import clsx from 'clsx'
import { Edit } from '@material-ui/icons'

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
    clientData,
    onClientAdded
  } = props

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllClientsRequest())
  }, [])

  useEffect(() => {
    if (clients && !clientData) {
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

  const [editClient, setEditClient] = useState(false)

  const handleEditClient = () => {
    setEditClient(true)
    setAddClient(true)
  }

  const clientSelectItems = useMemo(() => {
    return clients.map((cl: Client) => {
      return { value: cl.id, title: cl.name }
    })
  }, [clients])

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

          <div className={clsx(classes.selectContainer)}>
            <AppSelect
              className={classes.select}
              items={clientSelectItems}
              value={clientData ? clientData.id : null}
              onChange={(event: any) => {
                handleChooseClient(event)
              }}
            />
            <IconButton
              className={classes.editIconButton}
              onClick={handleEditClient}>
              <Edit />
            </IconButton>
          </div>

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

  const handleBack = () => {
    setAddClient(false)
    setEditClient(false)
  }

  const handleClientSuccess = (client: Client) => {
    setClientData(client)
    setTimeout(handleBack, 0)
  }

  const renderAddClient = () => {
    if (!addClient) return null

    return (
      <AddClient
        onBack={handleBack}
        account={account}
        isEdit={editClient}
        client={clientData}
        onSuccess={handleClientSuccess}
        showBackButton={true}
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
          title={'Step 1 of 5'}
          onNext={props.onNext}
          onUpdate={props.onUpdate}
          onBack={props.onBack}
          haveError={haveError ? haveError : false}
          projectData={projectData}
          currentStep={currentStep}
          disabled={!clients.length}
          isEdit={props.isEdit}
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
  textSecondary: {
    color: theme.palette.text.meta,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(0.5)
  },
  selectContainer: {
    paddingTop: theme.spacing(1),
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    position: 'relative'
  },
  select: {
    width: '100%'
  },
  editIconButton: { position: 'absolute', right: -70 },
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
    padding: theme.spacing(3),
    color: GREY_COLOR,
    position: 'relative',
    '&:before': {
      content: 'close-quote',
      position: 'absolute',
      width: '70%',
      height: '1px',
      backgroundColor: GREY_COLOR,
      top: '50%',
      left: '-50%',
      [theme.breakpoints.down('sm')]: {
        width: '60%'
      }
    },
    '&:after': {
      content: 'close-quote',
      position: 'absolute',
      width: '70%',
      height: '1px',
      backgroundColor: GREY_COLOR,
      top: '50%',
      right: '-50%',
      [theme.breakpoints.down('sm')]: {
        width: '60%'
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
