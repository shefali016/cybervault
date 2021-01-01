import React from 'react'
import { Button } from '@material-ui/core'
import logo from '../../../assets/logo.png'
import { makeStyles } from '@material-ui/core/styles'

import { AUTO, CENTER, COLUMN, FLEX } from 'utils/constants/stringConstants'
import {
  BLACK_COLOR,
  GREY_COLOR,
  WHITE_COLOR,
} from 'utils/constants/colorsConstants'

function ProjectCardWithButtons(props: {
  projectDetails?: any
  openProject?: any
}) {
  const classes = useStyles()
  return (
    <div className={classes.card}>
      <div className={classes.paper}>
        <div className={classes.imageWrapper}>
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
        <div
          style={{
            flex: 0.4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: CENTER,
            justifyContent: CENTER,
          }}>
          <Button className={classes.buttons}>Invoice</Button>
          <Button className={classes.buttons}>Edit Project</Button>
        </div>
        <div className={classes.textWrapper}>
          <h5 className={classes.title}>
            {props.projectDetails && props.projectDetails.name
              ? props.projectDetails.name
              : 'Project Name'}
          </h5>
          <h6 className={classes.bodyText}>
            Value:{' '}
            {props.projectDetails && props.projectDetails.value
              ? props.projectDetails.value
              : 'value'}{' '}
            .{' '}
            {props.projectDetails && props.projectDetails.date
              ? props.projectDetails.date
              : 'Starting Date'}
          </h6>
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  card: {
    width: '10rem',
    height: '10rem',
    borderRadius: 15,
    margin: 10,
    padding: 0,
    backgroundColor: WHITE_COLOR,
    display: FLEX,
  },
  imageWrapper: {
    boxShadow: '0 0px 1px 2px #DCDCDC',
    flex: 0.3,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderWidth: 0.1,
    borderColor: GREY_COLOR,
    display: FLEX,
    flexDirection: COLUMN,
    alignItems: CENTER,
    justifyContent: CENTER,
  },
  title: {
    fontSize: '12px',
    color: BLACK_COLOR,
    fontWeight: 600,
    margin: 0,
  },
  bodyText: {
    fontSize: '8px',
    color: BLACK_COLOR,
    margin: 0,
  },
  img: {
    width: AUTO,
    height: AUTO,
    maxHeight: 30,
  },
  textWrapper: {
    boxShadow: '0 0px 1px 2px #DCDCDC',
    flex: 0.3,
    borderWidth: 0.1,
    borderColor: GREY_COLOR,
    display: FLEX,
    flexDirection: COLUMN,
    alignItems: CENTER,
    justifyContent: CENTER,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  paper: {
    boxShadow: theme.shadows[5],
    outline: 'none',
    display: FLEX,
    flexDirection: COLUMN,
    flex: 1,
    padding: 2,
  },
  buttons: {
    background: 'linear-gradient(45deg, #5ea5fc 30%, #3462fc 90%)',
    padding: 5,
    margin: 5,
    height: 18,
    maxWidth: 150,
    zIndex: 50,
    width: '70%',
    borderRadius: 15,
    fontSize: 8,
    fontWeight: 500,
    color: WHITE_COLOR,
  },
}))
export default ProjectCardWithButtons
