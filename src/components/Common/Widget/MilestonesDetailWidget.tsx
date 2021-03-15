import React from 'react'
import { Typography } from '@material-ui/core'
import { useStyles } from './styles'
import { Details } from '../../ProjectInfoDisplay/Details'
import { AppDivider } from '../Core/AppDivider'
import { EditButton } from '../Button/EditButton'

export const RenderMilestonesDetails = (props: any) => {
  const classes = useStyles()

  const renderMilestones = () => {
    if (!props.projectData.milestones.length) {
      return (
        <Typography variant='body1' className={'metaText'}>
          This project has no milestones
        </Typography>
      )
    }
    return props.projectData.milestones.map((item: any, index: number) => {
      return (
        <Details key={item.title} label={item.title} value={item.payment} />
      )
    })
  }

  return (
    <div className={classes.clientDetailsContainer}>
      <div className={classes.innerDiv}>
        <Typography variant={'h5'} className={classes.title}>
          Milestones Details
        </Typography>
        {props.editInfo ? <EditButton onClick={props.onEdit} /> : null}
      </div>
      {renderMilestones()}
      <AppDivider />
    </div>
  )
}
