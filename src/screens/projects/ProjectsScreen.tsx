import React, { useEffect } from 'react'
import '../../App.css'
import { connect } from 'react-redux'
import { logout } from '../../actions/authActions'
import { Typography } from '@material-ui/core'
import Layout from '../../components/Common/Layout'
import ProjectDescriptionWithButtons from '../../components/Cards/ProjectDescriptionWithButtons'
import { makeStyles } from '@material-ui/core/styles'
import ProjectCard from '../../components/Cards/ProjectDescriptionCard'
import { AUTO, FLEX } from '../../utils/constants/stringConstants'
import ProjectArchives from '../../components/Cards/ProjectArchives'
import { WHITE_COLOR } from '../../utils/constants/colorsConstants'

export const ProjectsScreen = (props: any) => {
  const classes = useStyles()
  const projectData = [1, 2, 23, 5]
  return (
    <div className='background'>
      <Layout {...props} headerTitle={'Projects'}>
        <div className='dashboardContainer'>
          <Typography variant={'body2'} className={classes.generalMarginLeft}>
            Recent Projects {'>'}
          </Typography>
          <div className={classes.topCardsWrapper}>
            <ProjectDescriptionWithButtons />
            {projectData && projectData.length > 0 ? (
              projectData.map((project: any) => {
                return <ProjectCard projectDetails={project} />
              })
            ) : (
              <Typography>No Projects found</Typography>
            )}
          </div>
          <Typography
            variant={'body2'}
            className={classes.generalMarginLeft}
            style={{ marginTop: 10 }}>
            Projects Archives {'>'}
          </Typography>
          <div className={classes.topCardsWrapper}>
            {projectData && projectData.length > 0 ? (
              projectData.map((project: any, index: number) => {
                return <ProjectArchives projectDetails={project} />
              })
            ) : (
              <Typography>No Projects found</Typography>
            )}
          </div>
        </div>
      </Layout>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  generalMarginLeft: {
    marginLeft: 10,
    color: WHITE_COLOR,
  },
  topCardsWrapper: {
    overflow: AUTO,
    marginLeft: 10,
    marginTop: 20,
    display: FLEX,
    flexDirection: 'row',
  },
}))
const mapStateToProps = (state: any) => ({
  isLoggedIn: state.auth.isLoggedIn,
  //projectData : state.projects.projectData
})

const mapDispatchToProps = (dispatch: any) => ({
  logout: () => {
    return dispatch(logout())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsScreen)
