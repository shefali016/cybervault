import { IconButton, MenuItem, Popover, Typography } from '@material-ui/core'
import React from 'react'
import { useTheme } from '@material-ui/core/styles'
import MoreVertIcon from '@material-ui/icons/MoreVert'

export type MenuItem = {
  title: string
  onClick: () => void
  Icon?: any
  desctructive?: boolean
  disabled?: boolean
}
type Props = {
  menuItems: Array<MenuItem>
  className?: string
  style?: {}
  anchorOrigin?: any
  transformOrigin?: any
}

export const PopoverButton = ({
  menuItems,
  className,
  style,
  anchorOrigin,
  transformOrigin
}: Props) => {
  const theme = useTheme()

  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <div className={className} style={style}>
      <IconButton aria-owns={id} onClick={handleClick} className={'iconButton'}>
        <MoreVertIcon
          style={{ color: theme.palette.grey[100] }}
          fontSize='small'
        />
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={
          anchorOrigin || {
            vertical: 'top',
            horizontal: 'right'
          }
        }
        transformOrigin={
          transformOrigin || {
            vertical: 'bottom',
            horizontal: 'left'
          }
        }>
        {menuItems.map(
          ({ title, onClick, Icon, desctructive, disabled }: MenuItem) => {
            return (
              <MenuItem
                key={title}
                style={{
                  fontSize: 12,
                  padding: `${theme.spacing(1.5)}px ${theme.spacing(2.5)}px`,
                  opacity: disabled ? 0.5 : 1
                }}
                onClick={() => {
                  if (disabled) return
                  handleClose()
                  onClick()
                }}>
                <div
                  style={{
                    display: 'flex',
                    color: desctructive
                      ? theme.palette.error.main
                      : theme.palette.text.paper,
                    alignItems: 'center'
                  }}>
                  {!!Icon && (
                    <Icon
                      style={{ marginRight: theme.spacing(1) }}
                      fontSize='small'
                    />
                  )}
                  <Typography>{title}</Typography>
                </div>
              </MenuItem>
            )
          }
        )}
      </Popover>
    </div>
  )
}
