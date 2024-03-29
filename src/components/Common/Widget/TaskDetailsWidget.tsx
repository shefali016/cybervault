import React from 'react'
import { Typography } from '@material-ui/core'
import { useStyles } from './styles'
import { Details } from '../../ProjectInfoDisplay/Details'
import { AppDivider } from '../Core/AppDivider'
import { EditButton } from '../Button/EditButton'
import clsx from 'clsx'

export const RenderTaskDetails = (props: any) => {
  const classes = useStyles()

  if (!(props.projectData && props.projectData.tasks)) {
    return null
  }

  const renderTasks = () => {
    if (!props.projectData.tasks.length) {
      return (
        <Typography variant='body1' className={'metaText'}>
          This project has no tasks
        </Typography>
      )
    }
    return props.projectData.tasks.map((item: any, index: number) => {
      return (
        <Details
          key={item.title}
          label={item.title}
          startDate={item.startDate}
          endDate={item.endDate}
        />
      )
    })
  }

  return (
    <div className={classes.clientDetailsContainer}>
      <div className={classes.innerDiv}>
        <Typography
          variant={'h5'}
          className={clsx(classes.title, props.headerClassName)}>
          Tasks Details
        </Typography>
        {props.editInfo ? <EditButton onClick={props.onEdit} /> : null}
      </div>
      <div className={classes.detailsContainer}>{renderTasks()}</div>

      <AppDivider />
    </div>
  )
}
