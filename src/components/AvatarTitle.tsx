import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTheme } from '@material-ui/core/styles'
import clsx from 'clsx'
import React from 'react'

type Props = {
  avatar: string | undefined
  title: string | undefined
  size?: number
  className?: string
}

export const AvatarTitle = ({ avatar, title, size = 35, className }: Props) => {
  const theme = useTheme()
  const classes = useStyles()

  if (!avatar && !title) {
    return null
  }

  return (
    <div className={clsx('row', className)}>
      <div
        className='circleImage'
        style={{
          height: size,
          minWidth: size,
          borderRadius: size / 2,
          marginRight: theme.spacing(1.5),
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: '#00000020',
          background: '#00000010'
        }}>
        {!!avatar && <img src={avatar} alt='avatar' />}
      </div>
      {!!title && (
        <Typography variant='h5' color='inherit' className={classes.title}>
          {title}
        </Typography>
      )}
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  title: { [theme.breakpoints.down('sm')]: { fontSize: 20 } }
}))
