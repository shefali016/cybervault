import React, { useState, useCallback } from 'react'
import { connect } from 'react-redux'
import { logout } from '../../actions/authActions'
import { createNewProjectRequest } from '../../actions/projectActions'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import ProjectCard from '../../components/Cards/ProjectDescriptionCard'
import { AUTO, FLEX } from '../../utils/constants/stringConstants'
import ProjectArchives from '../../components/Cards/ProjectArchives'
import { WHITE_COLOR } from '../../utils/constants/colorsConstants'
import Widget from '../../components/Common/Widget'
import { useTabletLayout } from '../../utils/hooks'
import * as Types from '../../utils/types'

const PROJECT_DATA = [
  {
    campaignName: 'Nike Summer Campaign',
    description: 'Doc 2016 campaign with audi Q6',
    campaignDate: '2020-01-01',
    campaignBudget: 10000
  },
  {
    campaignName: 'Nike Summer Campaign',
    description: 'Doc 2016 campaign with audi Q6',
    campaignDate: '2020-01-01',
    campaignBudget: 10000
  },
  {
    campaignName: 'Nike Summer Campaign',
    description: 'Doc 2016 campaign with audi Q6',
    campaignDate: '2020-01-01',
    campaignBudget: 10000
  },
  {
    campaignName: 'Nike Summer Campaign',
    description: 'Doc 2016 campaign with audi Q6',
    campaignDate: '2020-01-01',
    campaignBudget: 10000
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
    (projectData) =>
      props.createNewProject(projectData, props.userData.account),
    []
  )
  return (
    <div>
      <Widget
        title={'Recent Projects'}
        data={PROJECT_DATA}
        renderItem={(item) => (
          <ProjectCard
            project={item}
            style={{ paddingRight: theme.spacing(3) }}
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
              paddingRight: theme.spacing(3),
              marginBottom: isTablet ? theme.spacing(3) : 0
            }}
          />
        )}
        emptyMessage={'No Projects found'}
        tabletColumn={true}
      />
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
  isLoggedIn: state.auth.isLoggedIn,
  userData: state.auth
})

const mapDispatchToProps = (dispatch: any) => ({
  logout: () => {
    return dispatch(logout())
  },
  createNewProject: (projectData: Types.Project, account: Account) => {
    return dispatch(createNewProjectRequest(projectData, account))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsScreen)
