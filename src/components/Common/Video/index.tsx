import React from 'react'
import ReactPlayer from 'react-player'
import { makeStyles } from '@material-ui/core/styles'
import { AppIconButton } from '../Core/AppIconButton'
import CloseIcon from '@material-ui/icons/Close'

export const VideoComponent = (props: any) => {
  const classes = useStyles()
  return (
    <div style={{ borderRadius: 10, overflow: 'hidden', position: 'relative' }}>
      <ReactPlayer
        width='100%'
        height='auto'
        className={classes.component}
        url={props.url}
        controls
        playing={props.isSelected}
        pip={false}
      />
      {typeof props.onDelete === 'function' && (
        <AppIconButton
          Icon={CloseIcon}
          onClick={(e: any) => {
            e.stopPropagation()
            props.onDelete()
          }}
          className={'assetDeleteButton'}
        />
      )}
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  component: {
    display: 'flex',
    flex: 1
  }
}))
