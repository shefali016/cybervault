import React, { useEffect, useMemo, useState } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { ProjectFilters, ProjectStatuses } from 'utils/enums'
import { filteredProjects } from 'utils/selectors'
import { User, Account, Project, InputChangeEvent } from 'utils/Interface'
import { deleteProjectRequest, getProjects } from '../../actions/projectActions'
import { getAllClientsRequest } from '../../actions/clientActions'
import { ReduxState } from 'reducers/rootReducer'
import { ProjectsList } from 'components/Projects/ProjectList'
import AppTextField from 'components/Common/Core/AppTextField'
import { PopoverButton } from 'components/Common/Popover/PopoverButton'
import { Typography } from '@material-ui/core'
import { AppDivider } from 'components/Common/Core/AppDivider'
import { useOnChange } from 'utils/hooks'

const orderByParams = [
  { title: 'Name', value: 'campaignName' },
  { title: 'Date', value: 'createdAt' }
]

const whereParams = [
  {
    title: 'Active',
    value: ['status', '==', ProjectStatuses.PROGRESS]
  },
  {
    title: 'Paid',
    value: ['status', '==', ProjectStatuses.PAID]
  },
  {
    title: 'Archived',
    value: ['status', '==', ProjectStatuses.ARCHIVED]
  }
]

export const ProjectsScreen = (props: any) => {
  const classes = useStyles()

  useEffect(() => {
    props.getClients()
  }, [])

  useOnChange(props.updateProjectSuccess, (success: boolean) => {
    if (success) {
      loadProjects()
    }
  })

  const handleProjectClick = (project: Project) =>
    props.history.push(`/project/${project.id}`)

  const [searchQuery, setSearchQuery] = useState('')
  const [orderBy, setOrderBy] = useState(orderByParams[0])
  const [where, setWhere] = useState(whereParams[0])

  useEffect(() => {
    loadProjects()
  }, [orderBy, where])

  const loadProjects = () => {
    props.getProjects(
      { orderBy: orderBy.value, where: where.value },
      ProjectFilters.ALL
    )
  }

  const searchedProjects = useMemo(
    () =>
      props.projects.filter((p: Project) =>
        p.campaignName.toUpperCase().includes(searchQuery.toUpperCase())
      ),
    [searchQuery, props.projects]
  )

  const handleSearch = (e: InputChangeEvent) => setSearchQuery(e.target.value)

  const renderSearchBar = () => {
    return (
      <div className={classes.searchContainer}>
        <AppTextField
          value={searchQuery}
          onChange={handleSearch}
          style={{ maxWidth: 450, margin: 0 }}
          label={'Search'}
          darkStyle={true}
        />
      </div>
    )
  }

  const renderFilter = () => {
    const orderByMenuItems = orderByParams.map((item) => ({
      title: item.title,
      onClick: () => setOrderBy(item),
      isSelected: orderBy.title === item.title
    }))

    const whereMenuItems = whereParams.map((item) => ({
      title: item.title,
      onClick: () => setWhere(item),
      isSelected: where.title === item.title
    }))

    return (
      <div className={classes.filterContainer}>
        <PopoverButton menuItems={orderByMenuItems} isSelecting={true}>
          {({ onClick, id }) => (
            <div aria-owns={id} onClick={onClick} className={classes.filter}>
              <Typography variant={'h6'}>{orderBy.title}</Typography>
            </div>
          )}
        </PopoverButton>
        <PopoverButton menuItems={whereMenuItems} isSelecting={true}>
          {({ onClick, id }) => (
            <div aria-owns={id} onClick={onClick} className={classes.filter}>
              <Typography variant={'h6'}>{where.title}</Typography>
            </div>
          )}
        </PopoverButton>
      </div>
    )
  }

  return (
    <div className='screenContainer'>
      <div className='screenInner'>
        <div className='responsivePadding'>
          {renderSearchBar()}
          {renderFilter()}
          <AppDivider spacing={3} />
          <ProjectsList
            account={props.account} //added as Project card is expecting account data
            projects={searchedProjects}
            clients={props.clients}
            onProjectClick={handleProjectClick}
            user={props.user}
            onDelete={props.deleteProject}
            deletingId={props.deletingProjectId}
          />
        </div>
      </div>
    </div>
  )
}

const mapState = (state: ReduxState) => ({
  projects: filteredProjects(state, { filter: ProjectFilters.ALL }),
  projectsLoading: state.project.loadingFilters.has(ProjectFilters.ALL),
  user: state.auth.user as User,
  account: state.auth.account as Account,
  clients: state.clients.clientsData,
  deletingProjectId: state.project.deletingId,
  updateProjectSuccess: state.project.updateSuccess
})

const mapDispatch = {
  getProjects,
  getClients: getAllClientsRequest,
  deleteProject: deleteProjectRequest
}

export default connect(mapState, mapDispatch)(ProjectsScreen)

const useStyles = makeStyles((theme) => ({
  searchContainer: {
    padding: `0 0 ${theme.spacing(3)}px 0`
  },
  filterContainer: {
    padding: `0 0 ${theme.spacing(0)}px 0`,
    display: 'flex',
    alignItems: 'center'
  },
  filter: {
    cursor: 'pointer',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.palette.border,
    padding: `${theme.spacing(1)}px ${theme.spacing(3)}px`,
    marginRight: theme.spacing(2),
    transition: theme.transitions.create(['background']),
    background: theme.palette.background.secondary,
    borderRadius: 50,
    '&:hover': { background: theme.palette.primary.light }
  }
}))
