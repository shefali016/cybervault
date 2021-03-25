import { IconButton, MenuItem, Popover, Typography } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import React, { useEffect, useState, useMemo } from 'react'
import { getAllClientsRequest } from '../../actions/clientActions'
import { COLUMN, FLEX } from 'utils/constants/stringConstants'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'none'
  },
  paper: {
    padding: `${theme.spacing(1)}px ${theme.spacing(3)}px`,
    backgroundColor: theme.palette.background.secondary,
    color: theme.palette.text.background
  }
}))

type Props = {
  children: React.ReactElement
  label: string
  className?: string
}

export const PopoverHover = ({ children, label, className }: Props) => {
  const theme = useTheme()
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = React.useState(null)

  const handlePopoverOpen = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <div className={className}>
      <div
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup='true'
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}>
        {children}
      </div>
      <Popover
        id='mouse-over-popover'
        className={classes.popover}
        classes={{
          paper: classes.paper
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus>
        <Typography>{label}</Typography>
      </Popover>
    </div>
  )
}
