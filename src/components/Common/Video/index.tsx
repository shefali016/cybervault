import React from 'react'
import ReactPlayer from 'react-player'
import { makeStyles } from '@material-ui/core/styles'
export const VideoComponent = (props: any) => {
  const classes = useStyles()
  return (
    <div>
      <ReactPlayer
        width='100%'
        height='250px'
        key={'youtube'}
        className={classes.component}
        url={props.url}
        controls
        playing={props.isSelected}
      />
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  component: {
    display: 'flex',
    flex: 1
  }
}))
