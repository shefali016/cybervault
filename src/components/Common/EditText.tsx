import { Typography } from '@material-ui/core'
import React, { ChangeEvent } from 'react'
import AppTextField from './Core/AppTextField'

type Props = {
  isEditing: boolean
  value: string | number
  onChange: (e: ChangeEvent) => void
  type: string
  label?: string
  titleClassName?: string
  emptyValue?: string
} & any

export const EditText = ({
  isEditing,
  value,
  onChange,
  type,
  label,
  titleClassName,
  emptyValue,
  ...rest
}: Props) => {
  return !isEditing ? (
    <Typography
      variant='body1'
      className={titleClassName}
      style={!value ? { opacity: 0.4 } : {}}>
      {value ? value : emptyValue}
    </Typography>
  ) : (
    <AppTextField
      type={type}
      label={label}
      value={value}
      onChange={onChange}
      style={{ marginTop: 5, marginBottom: 5 }}
      {...rest}
    />
  )
}
