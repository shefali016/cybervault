import React from 'react'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

export type Item = {
  value: any
  renderer?: () => React.ReactElement
  title?: string
}

type Props = {
  items: Array<Item>
  value?: any
  onChange: (value: any) => void
  className?: string
}

const AppSelect = ({ items, className, ...rest }: Props) => {
  const classes = useStyles()
  return (
    <Select
      {...rest}
      variant='outlined'
      className={clsx(classes.select, className)}>
      {items.map(({ value, renderer, title }: Item) => (
        <MenuItem value={value}>
          {typeof renderer === 'function' ? (
            renderer()
          ) : (
            <Typography variant='body1' className={classes.item} noWrap={true}>
              {title}
            </Typography>
          )}
        </MenuItem>
      ))}
    </Select>
  )
}

const useStyles = makeStyles((theme) => ({
  item: { fontSize: 16 },
  select: { [theme.breakpoints.down('sm')]: { maxWidth: '100%' } }
}))

export default AppSelect
