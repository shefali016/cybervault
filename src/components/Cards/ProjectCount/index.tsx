import React from 'react'
import { Typography, Card, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { BLACK_COLOR } from 'utils/constants/colorsConstants'
import { CENTER, COLUMN, FLEX } from '../../../utils/constants/stringConstants'
import clsx from 'clsx'

type Props = { projectCount?: any; className?: {} }

function ProjectCount(props: Props) {
  const classes = useStyles()
  return (
    <Card className={clsx(classes.card, props.className)}>
      <CardContent className={classes.content}>
        <Typography variant={'caption'} className={classes.title}>
          Projects This Month
        </Typography>
        <Typography variant={'h2'} className={classes.countText}>
          {props.projectCount || 0}
        </Typography>
      </CardContent>
    </Card>
  )
}
const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: '12rem',
    height: '12rem',
    borderRadius: 15,
    display: FLEX,
    padding: 5
  },
  content: {
    display: FLEX,
    flex: 1,
    flexDirection: COLUMN,
    alignItems: CENTER,
    justifyContent: CENTER
  },
  title: {
    fontWeight: 600
  },
  countText: {
    fontSize: '56px',
    color: theme.palette.primary.main,
    fontWeight: 800
  }
}))

export default ProjectCount
