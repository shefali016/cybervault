import React, { useState, useCallback } from 'react'
import '../../App.css'
import { connect } from 'react-redux'
import { logout } from '../../actions/authActions'
import { createNewProjectRequest } from '../../actions/projectActions'
import Layout from '../../components/Common/Layout'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import ProjectCard from '../../components/Cards/ProjectDescriptionCard'
import { AUTO, FLEX } from '../../utils/constants/stringConstants'
import ProjectArchives from '../../components/Cards/ProjectArchives'
import { WHITE_COLOR } from '../../utils/constants/colorsConstants'
import NewProjectModal from '../../components/Projects/NewProjectModal'
import Widget from '../../components/Common/Widget'
import { useTabletLayout } from '../../utils/hooks'
import * as Types from '../../utils/types'

const PROJECT_DATA = [
  {
    name: 'Nike Summer Campaign',
    description: 'Doc 2016 campaign with audi Q6',
    startDate: '2020-01-01',
    budget: 10000
  },
  {
    name: 'Nike Summer Campaign',
    description: 'Doc 2016 campaign with audi Q6',
    startDate: '2020-01-01',
    budget: 10000
  },
  {
    name: 'Nike Summer Campaign',
    description: 'Doc 2016 campaign with audi Q6',
    startDate: '2020-01-01',
    budget: 10000
  },
  {
    name: 'Nike Summer Campaign',
    description: 'Doc 2016 campaign with audi Q6',
    startDate: '2020-01-01',
    budget: 10000
  }
]
const ARCHIVE_DATA = [
  {
    name: 'Nike Summer Campaign',
    description: 'Doc 2016 campaign with audi Q6'
  },
  {
    name: 'Nike Summer Campaign',
    description: 'Doc 2016 campaign with audi Q6'
  },
  {
    name: 'Nike Summer Campaign',
    description: 'Doc 2016 campaign with audi Q6'
  },
  {
    name: 'Nike Summer Campaign',
    description: 'Doc 2016 campaign with audi Q6'
  }
]

export const ProjectsScreen = (props: any) => {
  const classes = useStyles()
  const isTablet = useTabletLayout()
  const theme = useTheme()
  const [newProjectModalOpen, setNewProjectModalOpen] = useState(false)
  const openNewProjectModal = useCallback(
    () => setNewProjectModalOpen(true),
    []
  )
  const closeNewProjectModal = useCallback(
    () => setNewProjectModalOpen(false),
    []
  )
  const createNewProject = useCallback(
    (projectData) => props.createNewProject(projectData),
    []
  )
  return (
    <div className='background'>
      <Layout
        history={props.history}
        actionButtonTitle={'New Project'}
        headerTitle={'Projects'}
        onActionButtonPress={openNewProjectModal}>
        <NewProjectModal
          open={newProjectModalOpen}
          onRequestClose={closeNewProjectModal}
          onSubmitClicked={createNewProject}
        />
        <div className='dashboardContainer'>
          <Widget
            title={'Recent Projects'}
            data={PROJECT_DATA}
            renderItem={(item) => (
              <ProjectCard
                project={item}
                style={{ marginRight: theme.spacing(3) }}
              />
            )}
            emptyMessage={'No Projects found'}
          />
          <Widget
            title={'Projects Archives'}
            data={ARCHIVE_DATA}
            renderItem={(item) => (
              <ProjectArchives
                projectDetails={item}
                style={{
                  marginRight: theme.spacing(3),
                  marginBottom: isTablet ? theme.spacing(3) : 0
                }}
              />
            )}
            emptyMessage={'No Projects found'}
            tabletColumn={true}
          />
        </div>
      </Layout>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  generalMarginLeft: {
    marginLeft: 10,
    color: WHITE_COLOR
  },
  topCardsWrapper: {
    overflow: AUTO,
    marginLeft: 10,
    marginTop: 20,
    display: FLEX,
    flexDirection: 'row'
  }
}))
const mapStateToProps = (state: any) => ({
  isLoggedIn: state.auth.isLoggedIn
})

const mapDispatchToProps = (dispatch: any) => ({
  logout: () => {
    return dispatch(logout())
  },
  createNewProject: (projectData: Types.Project) => {
    return dispatch(createNewProjectRequest(projectData))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsScreen)
