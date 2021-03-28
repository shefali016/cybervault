import { ProjectCard } from 'components/Cards/ProjectCard'
import React from 'react'
import { Project, Account, User, Client } from 'utils/Interface'
import { useTheme, makeStyles } from '@material-ui/core/styles'
import { WIDGET_ITEM_HEIGHT } from 'utils/globalStyles'
import { EmptyIcon } from 'components/EmptyIcon'
import ProjectIcon from '@material-ui/icons/Collections'

type Props = {
  projects: Project[]
  account: Account
  user: User
  onProjectClick: (project: Project) => void
  onDelete: (projectId: string) => void
  deletingId: string
  clients: Array<Client>
  className?: string
}

export const ProjectsList = ({
  projects,
  account,
  user,
  onProjectClick,
  onDelete,
  deletingId,
  clients,
  className
}: Props) => {
  return (
    <div className={className}>
      {projects.length === 0 && (
        <EmptyIcon Icon={ProjectIcon} title={'No projects found'} />
      )}
      <div className={'gridList'}>
        {projects.map((project: Project) => (
          <ProjectCard
            key={project.id}
            {...{
              account,
              project,
              userInfo: user,
              onClick: onProjectClick,
              onDelete,
              deletingId,
              clients,
              style: { width: '100%', maxWidth: '100%', minWidth: '100%' }
            }}
          />
        ))}
      </div>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  projectCard: {
    width: '100%',
    maxWidth: '100%',
    minWidth: '100%'
  }
}))
