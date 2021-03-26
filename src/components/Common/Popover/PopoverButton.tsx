import { MenuItem, Popover, Typography } from '@material-ui/core'
import React from 'react'
import { useTheme } from '@material-ui/core/styles'
import CheckIcon from '@material-ui/icons/Check'

export type MenuItem = {
  title: string
  onClick: () => void
  Icon?: any
  desctructive?: boolean
  isSelected?: boolean
  disabled?: boolean
  After?: React.ReactElement | null
  Before?: React.ReactElement | null
}
export type Props = {
  menuItems: Array<MenuItem>
  className?: string
  style?: {}
  anchorOrigin?: any
  transformOrigin?: any
  children: ({
    onClick,
    id
  }: {
    onClick: (e: any) => void
    id: string | undefined
  }) => React.ReactElement
  isSelecting?: boolean
}

export const PopoverButton = ({
  menuItems,
  className,
  style,
  anchorOrigin,
  transformOrigin,
  children,
  isSelecting
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

  const renderCheck = (isSelected: boolean) => (
    <div className={'popOverSelectedContainer'}>
      {isSelected ? (
        <CheckIcon className={'paperIcon'} style={{ fontSize: 20 }} />
      ) : null}
    </div>
  )

  return (
    <div className={className} style={style}>
      {children({ onClick: handleClick, id })}

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={
          anchorOrigin || {
            vertical: 'bottom',
            horizontal: 'right'
          }
        }
        transformOrigin={
          transformOrigin || {
            vertical: 'top',
            horizontal: 'left'
          }
        }>
        {menuItems.map(
          ({
            title,
            onClick,
            Icon,
            desctructive,
            disabled,
            Before = null,
            After = null,
            isSelected
          }: MenuItem) => {
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
                  {Before}
                  {isSelecting ? renderCheck(!!isSelected) : null}
                  {!!Icon && (
                    <Icon
                      style={{ marginRight: theme.spacing(1), marginBottom: 2 }}
                      fontSize='small'
                    />
                  )}
                  <Typography variant={'subtitle1'} style={{ margin: 0 }}>
                    {title}
                  </Typography>
                  {After}
                </div>
              </MenuItem>
            )
          }
        )}
      </Popover>
    </div>
  )
}
