import React, { Fragment, useMemo } from 'react'
import {
  List,
  ListItem,
  ListItemAvatar,
  Typography,
  ListItemText,
  Avatar
} from '@material-ui/core'
import { Client, Project } from 'utils/Interface'
import { useStyles } from 'components/Portfolio/style'
import clsx from 'clsx'

type Props = {
  projects: Project[]
  handleSelect: (project: Project) => void
  selectedIds?: string[]
  selected?: string | undefined | null
  clientCache: { [id: string]: Client }
  emptyMessage?: string
}

export const ProjectSelect = ({
  projects,
  handleSelect,
  clientCache,
  selectedIds,
  selected,
  emptyMessage
}: Props) => {
  const classes = useStyles()

  return (
    <Fragment>
      <div style={{ marginTop: '10px' }}>
        <List>
          {projects && projects.length ? (
            projects.map((project: Project, index: number) => {
              const isProjectSelected: boolean =
                (!!selected && selected === project.id) ||
                (!!selectedIds && selectedIds.includes(project.id))
              const client: Client | undefined = clientCache[project.clientId]
              return (
                <ListItem
                  key={index}
                  role={undefined}
                  button
                  onClick={() => handleSelect(project)}
                  className={clsx(
                    classes.listProject,
                    isProjectSelected ? classes.selectedProject : ''
                  )}>
                  <ListItemAvatar>
                    <Avatar
                      alt={`${project.campaignName}-icon`}
                      src={client ? client.logo : null}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    classes={{
                      root: clsx(
                        classes.listItemText,
                        isProjectSelected ? classes.selectedProjectText : ''
                      )
                    }}
                    primary={project.campaignName}
                  />
                </ListItem>
              )
            })
          ) : (
            <Typography variant={'body1'}>
              {emptyMessage ||
                'You have not created any projects yet. You can add projects to this portfolio later.'}
            </Typography>
          )}
        </List>
      </div>
    </Fragment>
  )
}
