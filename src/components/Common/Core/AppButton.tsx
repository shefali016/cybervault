import React from 'react'
import { Button } from '@material-ui/core'

type Props = { children: React.ReactElement } & any

export const AppButton = ({ children, ...rest }: Props) => (
  <Button {...rest}>{children}</Button>
)
