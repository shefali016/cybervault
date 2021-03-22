import React from 'react'
import { Button } from '@material-ui/core'

type Props = { children: React.ReactElement; disabled?: boolean } & any

export const AppButton = ({ disabled, children, ...rest }: Props) => (
  <Button disabled={disabled} {...rest}>
    {children}
  </Button>
)
