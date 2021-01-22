import React from 'react'
import { Button, Typography } from '@material-ui/core'
import logo from '../../../assets/logo.png'
import { makeStyles } from '@material-ui/core/styles'
import {
  BOLD,
  CENTER,
  FLEX,
  AUTO
} from '../../../utils/constants/stringConstants'
import { GREY_COLOR } from '../../../utils/constants/colorsConstants'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'

type Props = { projectDetails?: any; openProject?: any; style?: {} }

const ProjectArchives = (props: Props) => {
  const classes = useStyles()
  return (
    <div style={props.style}>
      <Button className={classes.button} variant={'contained'}>
        <div className={classes.imgWrapper}>
          <img
            className={classes.img}
            src={
              props.projectDetails && props.projectDetails.image
                ? props.projectDetails.image
                : logo
            }
            alt='Logo'
          />
        </div>
        <div className={classes.textWrapper}>
          <Typography className={classes.title} noWrap={true}>
            {props.projectDetails?.name}
          </Typography>
          <Typography className={classes.subTitle} noWrap={true}>
            {props.projectDetails?.description}
          </Typography>
        </div>

        <ArrowForwardIosIcon fontSize='small' />
      </Button>
    </div>
  )
}
const useStyles = makeStyles((theme) => ({
  button: {
    display: FLEX,
    justifyContent: CENTER,
    borderRadius: 20,
    padding: `${theme.spacing(3)}px ${theme.spacing(1.5)}px`,
    height: 70,
    minidth: 300,
    backgroundColor: 'white'
  },
  imgWrapper: {
    borderRadius: 10,
    display: FLEX,
    justifyContent: CENTER,
    alignItems: CENTER
  },
  title: {
    fontWeight: BOLD,
    fontSize: 12
  },
  subTitle: { fontSize: 9, color: GREY_COLOR },
  img: {
    width: AUTO,
    height: AUTO,
    maxWidth: 40,
    maxHeight: 40
  },
  textWrapper: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    flex: 1,
    overflow: 'hidden'
  }
}))
export default ProjectArchives
