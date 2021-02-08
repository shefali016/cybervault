import React, { useMemo } from 'react'
import { useTheme } from '@material-ui/core/styles'
import { InvoiceStatuses } from 'utils/enums'
import { InvoiceStatus } from 'utils/Interface'

export const InvoiceStatusIndicator = ({
  status,
  size = 12,
  className
}: {
  status: InvoiceStatus
  size?: number
  className?: string
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
        background
      }}
      className={className}
    />
  )
}
