import React from 'react'
import PolymerSharpIcon from '@material-ui/icons/PolymerSharp'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'

type Props = {
  className?: string
}

const CreatorCloudIcon = ({ className }: Props) => {
  const classes = useStyles()
  return (
    <PolymerSharpIcon
      className={clsx(classes.logo, className)}
      fontSize={'inherit'}
    />
  )
}

const useStyles = makeStyles((theme) => ({
  logo: { color: theme.palette.primary.light, fontSize: 80 }
}))

export default CreatorCloudIcon
