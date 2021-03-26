import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useTheme } from '@material-ui/core/styles'
import { ProjectCard } from '../../components/Cards/ProjectCard'
import ProjectArchives from '../../components/Cards/ProjectArchives'
import Widget from '../../components/Common/Widget'
import { useTabletLayout } from '../../utils/hooks'
import { EmptyIcon } from 'components/EmptyIcon'
import ProjectIcon from '@material-ui/icons/Collections'
import { ProjectFilters, ProjectStatuses } from 'utils/enums'
import { filteredProjects } from 'utils/selectors'
import { User, Account, Project } from 'utils/Interface'
import { deleteProjectRequest, getProjects } from '../../actions/projectActions'
import { getAllClientsRequest } from '../../actions/clientActions'
import ArchiveIcon from '@material-ui/icons/Archive'

export const ProjectsScreen = (props: any) => {
  const isTablet = useTabletLayout()
  const theme = useTheme()

  useEffect(() => {
    props.getClients()
    props.getProjects(
      {
        orderBy: 'updatedAt'
      },
      ProjectFilters.RECENT
    )
    props.getProjects(
      {
        orderBy: 'updatedAt',
        where: ['status', '==', ProjectStatuses.ARCHIVED]
      },
      ProjectFilters.ARCHIVED
    )
  }, [])

  const handleProjectClick = (project: Project) =>
    props.history.push(`/project/${project.id}`)

  return (
    <div className='screenContainer'>
      <div className='screenInner'>
        <Widget
          title={'Recent Projects'}
          data={props.recentProjects}
          renderItem={(item) => (
            <ProjectCard
              account={props.account} //added as Project card is expecting account data
              project={item}
              style={{ paddingRight: theme.spacing(3) }}
              clients={props.clients}
              key={`project-card-${item.id}`}
              history={props.history}
              userInfo={props.user}
              onDelete={props.deleteProject}
              deletingId={props.deletingProjectId}
            />
          )}
          EmptyComponent={
            <EmptyIcon
              title={'No recent projects'}
              Icon={ProjectIcon}
              className={'widgetEmptyIcon'}
            />
          }
        />
        <Widget
          title={'Projects Archives'}
          data={props.archivedProjects}
          renderItem={(item) => (
            <ProjectArchives
              onClick={handleProjectClick}
              clients={props.clients}
              project={item}
              style={{
                paddingRight: theme.spacing(3),
                marginBottom: isTablet ? theme.spacing(3) : 0
              }}
            />
          )}
          EmptyComponent={
            <EmptyIcon
              title={'No project archives'}
              Icon={ArchiveIcon}
              className={'widgetEmptyIcon'}
            />
          }
          tabletColumn={true}
        />
      </div>
    </div>
  )
}

const mapState = (state: any) => ({
  recentProjects: filteredProjects(state, { filter: ProjectFilters.RECENT }),
  archivedProjects: filteredProjects(state, {
    filter: ProjectFilters.ARCHIVED
  }),
  user: state.auth.user as User,
  account: state.auth.account as Account,
  clients: state.clients.clientsData,
  deletingProjectId: state.project.deletingId
})

const mapDispatch = {
  getProjects,
  getClients: getAllClientsRequest,
  deleteProject: deleteProjectRequest
}

export default connect(mapState, mapDispatch)(ProjectsScreen)
