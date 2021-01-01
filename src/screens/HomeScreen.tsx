import React, { useEffect } from 'react'
import '../App.css'
import { connect } from 'react-redux'
import { logout } from '../actions/authActions'
import { Typography, Grid } from '@material-ui/core'
import ProjectCard from '../components/Cards/ProjectDescriptionCard'
import UnpaidInvoices from '../components/Cards/UnpaidInvoices'
import PendingInvoices from '../components/Cards/PendingInvoices'
import IncomeThisMonth from '../components/Cards/IncomeThisMonth'
import ProjectCount from '../components/Cards/ProjectCount'
import ProfitsExpenses from '../components/Cards/ProfitsExpenses'
import Layout from '../components/Common/Layout'
import { makeStyles } from '@material-ui/core/styles'
import { AUTO, FLEX } from 'utils/constants/stringConstants'

export const HomeScreen = (props: any) => {
  useEffect(() => {
    if (!props.isLoggedIn && !props.user) {
      loggedOut(props)
    }
  }, [props.isLoggedIn])

  const loggedOut = (props: any) => {
    props.history.push('/')
  }
  const classes = useStyles()
  const projectData = [1, 2, 23, 5]
  return (
    <div className={classes.background}>
      <Layout {...props}>
        <div className={classes.dashboardContainer}>
          <div>
            <Typography variant={'body2'} className={classes.generalMarginLeft}>
              Active Projects {'>'}
            </Typography>
            <Grid container className={classes.topCardsWrapper}>
              {projectData && projectData.length > 0 ? (
                projectData.map((project: any, index: number) => {
                  return (
                    <ProjectCard projectDetails={project} isPopover={true} />
                  )
                })
              ) : (
                <Typography>No Projects found</Typography>
              )}
            </Grid>
          </div>
          <div>
            <Typography variant={'body2'} className={classes.styledText}>
              Invoicing and Analytics {'>'}
            </Typography>
            <div className={classes.middleCardsWrapper}>
              <PendingInvoices />
              <ProfitsExpenses />
              <ProjectCount />
              <IncomeThisMonth />
            </div>
          </div>
          <div>
            <Typography variant={'body2'} className={classes.styledText}>
              Unpaid Invoices {'>'}
            </Typography>
            <div className={classes.bottomCardsWrapper}>
              {projectData && projectData.length > 0 ? (
                projectData.map((project: any, index: number) => {
                  return <UnpaidInvoices projectDetails={project} />
                })
              ) : (
                <Typography>No Projects found</Typography>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  isLoggedIn: state.auth.isLoggedIn,
  //projectData : state.projects.projectData
})

const mapDispatchToProps = (dispatch: any) => ({
  logout: () => {
    return dispatch(logout())
  },
})
const useStyles = makeStyles((theme) => ({
  topCardsWrapper: {
    overflow: AUTO,
    marginLeft: 10,
    marginTop: 20,
  },
  middleCardsWrapper: {
    overflow: AUTO,
    marginLeft: 20,
    marginTop: 20,
    display: FLEX,
  },
  bottomCardsWrapper: {
    marginLeft: 10,
    marginTop: 10,
    paddingBottom: 20,
  },
  generalMarginLeft: {
    marginLeft: 10,
  },
  styledText: {
    marginTop: 30,
    marginLeft: 10,
  },
  background: {
    display: 'grid',
    backgroundColor: '#24262B',
    height: '100%',
    width: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    color: '#ffffff',
  },
  dashboardContainer: {
    marginTop: '50px',
  },
}))
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
