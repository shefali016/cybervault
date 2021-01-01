import React from 'react'
import { Button, Card, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { BLACK_COLOR } from 'utils/constants/colorsConstants'
function ProjectCount(props: { projectCount?: any; openProject?: any }) {
  const classes = useStyles()
  return (
    <Button onClick={props.openProject} className={classes.button}>
      <Card className={classes.card}>
        <CardContent>
          <h5 className={classes.title}>Projects This Month</h5>
          <h2 className={classes.countText}>
            {props.projectCount ? props.projectCount : 0}
          </h2>
        </CardContent>
      </Card>
    </Button>
  )
}
const useStyles = makeStyles((theme) => ({
  card: {
    width: '10rem',
    height: '10rem',
    borderRadius: 15,
  },
  button: {
    marginLeft: 10,
    padding: 0,
    borderRadius: 15,
  },
  title: {
    fontSize: '12px',
    color: BLACK_COLOR,
    fontWeight: 600,
    margin: 0,
  },
  countText: {
    fontSize: '56px',
    color: BLACK_COLOR,
    fontWeight: 800,
    margin: 0,
  },
}))

export default ProjectCount
