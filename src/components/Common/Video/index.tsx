import React from 'react'
import ReactPlayer from 'react-player'
import { makeStyles } from '@material-ui/core/styles'
export const VideoComponent = (props: any) => {
  const classes = useStyles()
  return (
    <div style={{ borderRadius: 10, overflow: 'hidden' }}>
      <ReactPlayer
        width='100%'
        height='auto'
        className={classes.component}
        url={props.url}
        controls
        playing={props.isSelected}
        pip={false}
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
