import React from 'react'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { Typography } from '@material-ui/core'

export type Item = {
  value: any
  renderer?: () => React.ReactElement
  title?: string
}
type Props = {
  items: Array<Item>
  value?: string
  onChange: (value: any) => void
}

const AppSelect = ({ items, ...rest }: Props) => {
  return (
    <Select {...rest} variant='outlined'>
      {items.map(({ value, renderer, title }: Item) => (
        <MenuItem value={value}>
          {typeof renderer === 'function' ? (
            renderer()
          ) : (
            <Typography
              variant='body1'
              style={{ margin: '0 10px' }}
              noWrap={true}>
              {title}
            </Typography>
          )}
        </MenuItem>
      ))}
    </Select>
  )
}

export default AppSelect
