import React, { useCallback, useEffect, useState } from 'react'
import '../App.css'
import { connect } from 'react-redux'
import {
  createNewProjectRequest,
  clearNewProjectData,
  getAllProjectsRequest
} from '../actions/projectActions'
import { Typography } from '@material-ui/core'
import ProjectCard from '../components/Cards/ProjectDescriptionCard'
import UnpaidInvoices from '../components/Cards/UnpaidInvoices'
import PendingInvoices from '../components/Cards/PendingInvoices'
import IncomeThisMonth from '../components/Cards/IncomeThisMonth'
import ProjectCount from '../components/Cards/ProjectCount'
import ProfitsExpenses from '../components/Cards/ProfitsExpenses'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { COLUMN, FLEX } from 'utils/constants/stringConstants'
import Widget from '../components/Common/Widget'
import * as Types from 'utils/types'
import { getWidgetCardHeight } from '../utils'

const UNPAID_INVOICES_DATA = [1, 2, 3, 4]

const HomeScreen = (props: any) => {
  const [allProjects, setAllProjects] = useState([])
  useEffect(() => {
    console.log('PROPSSS', props)
    if (props.allProjectsData && props.allProjectsData !== allProjects) {
      setAllProjects(props.allProjectsData)
    }
  }, [props.isLoggedIn, props.newProjectData, props.allProjectsData])

  useEffect(() => {
    props.getAllProjectsData()
  }, [])

  const loggedOut = (props: any) => {
    props.history.push('/')
  }
  const classes = useStyles()
  const theme = useTheme()

  return (
    <div className={'dashboardScreen'}>
      <Widget
        data={allProjects}
        title={'Active Projects'}
        emptyMessage={'No Projects found'}
        loading={props.activeProjectsLoading}
        itemHeight={getWidgetCardHeight(theme)}
        renderItem={(item) => (
          <ProjectCard
            project={item}
            isPopover={true}
            key={`project-card-${item.projectId}`}
            style={{
              paddingRight: theme.spacing(3)
            }}
            history={props.history}
          />
        )}
      />
      <div className={classes.invoicingWrapper}>
        <Typography variant={'body1'} className={classes.sectionTitle}>
          Invoicing and Analytics
        </Typography>
        <div className={classes.middleCardsWrapper}>
          <PendingInvoices className={classes.widgetItem} />
          <ProfitsExpenses className={classes.widgetItem} />
          <ProjectCount
            className={classes.widgetItem}
            projectCount={allProjects.length}
          />
          <IncomeThisMonth style={{ paddingRight: theme.spacing(3) }} />
        </div>
      </div>
      <Widget
        title={'Unpaid Invoices'}
        data={UNPAID_INVOICES_DATA}
        renderItem={(item) => (
          <UnpaidInvoices
            projectDetails={item}
            key={`unpaid-invoices-${item.id}`}
            style={{ paddingRight: theme.spacing(3) }}
          />
        )}
        emptyMessage={'No Projects found'}
      />
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  newProjectData: state.project.newProjectData,
  allProjectsData: state.project.allProjectsData,
  activeProjectsLoading: state.project.isLoading
})

const mapDispatchToProps = (dispatch: any) => ({
  createNewProject: (projectData: Types.Project) => {
    return dispatch(createNewProjectRequest(projectData))
  },

  clearNewProjectData: () => {
    return dispatch(clearNewProjectData())
  },
  getAllProjectsData: () => {
    return dispatch(getAllProjectsRequest())
  }
})

const useStyles = makeStyles((theme) => ({
  invoicingWrapper: {
    marginBottom: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    flexWrap: 'nowrap',
    overflowX: 'auto',
    whiteSpace: 'nowrap'
  },
  middleCardsWrapper: {
    display: FLEX,
    [theme.breakpoints.down('sm')]: {
      flexDirection: COLUMN
    }
  },
  sectionTitle: {
    marginBottom: theme.spacing(1),
    color: theme.palette.text.background
  },
  background: {
    backgroundColor: '#24262B',
    height: '100%',
    width: '100%',
    overflowY: 'auto'
  },
  widgetItem: {
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(3)
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(3)
    }
  }
}))

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
