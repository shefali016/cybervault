import React from 'react'
import { useTheme } from '@material-ui/core/styles'
import { InvoiceStatuses } from 'utils/enums'

export const InvoiceStatusIndicator = ({
  status,
  size = 12,
  className,
  style = {}
}: {
  status: InvoiceStatuses
  size?: number
  className?: string
  style?: {}
}) => {
  const theme = useTheme()

  let background = theme.palette.status.inProgress

  if (status === InvoiceStatuses.PAID) {
    background = theme.palette.status.completed
  }

  return (
    <div
      style={{
        height: size,
        width: size,
        borderRadius: size / 2,
        background,
        ...style
      }}
      className={className}
    />
  )
}
