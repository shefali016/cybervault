import React, { useMemo } from 'react'
import { Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {
  BOLD,
  CENTER,
  FLEX,
  AUTO
} from '../../../utils/constants/stringConstants'
import { GREY_COLOR } from '../../../utils/constants/colorsConstants'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import { Client, Project } from 'utils/Interface'
import clsx from 'clsx'

type Props = {
  project: Project
  clients: Client[]
  onClick: (project: Project) => void
  style?: {}
}

const ProjectArchives = ({ project, clients, onClick, style }: Props) => {
  const classes = useStyles()
  const client: Client | undefined = useMemo(
    () =>
      clients
        ? clients.find((client: Client) => client.id === project.clientId)
        : undefined,
    [clients]
  )

  return (
    <div style={style}>
      <div
        className={clsx(classes.button, 'shadowHover')}
        onClick={() => onClick(project)}>
        <div className={classes.imgWrapper}>
          {client && client.logo && (
            <img className={'coverImage'} src={client.logo} alt='client-logo' />
          )}
        </div>
        <div className={classes.textWrapper}>
          <Typography className={classes.title} variant='h6' noWrap={true}>
            {project.campaignName}
          </Typography>
          <Typography
            className={classes.subTitle}
            variant='subtitle1'
            noWrap={true}>
            {project.description}
          </Typography>
        </div>

        <ArrowForwardIosIcon fontSize='small' className={classes.arrowIcon} />
      </div>
    </div>
  )
}
const useStyles = makeStyles((theme) => ({
  arrowIcon: { marginLeft: theme.spacing(2) },
  button: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: 20,
    padding: `${theme.spacing(2)}px ${theme.spacing(2)}px`,
    maxWidth: 400,
    backgroundColor: 'white',
    cursor: 'pointer'
  },
  imgWrapper: {
    height: 60,
    width: 60,
    borderRadius: 30,
    position: 'relative',
    overflow: 'hidden',
    display: FLEX,
    justifyContent: CENTER,
    alignItems: CENTER
  },
  title: {
    fontWeight: BOLD
  },
  subTitle: { color: theme.palette.text.meta },
  img: {
    width: AUTO,
    height: AUTO,
    maxWidth: 40,
    maxHeight: 40
  },
  textWrapper: {
    paddingLeft: theme.spacing(2),
    flex: 1,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textoverflow: 'ellipsis'
  }
}))
export default ProjectArchives
