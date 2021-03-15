import React from 'react'
import { useTheme } from '@material-ui/core/styles'
import { CENTER, FLEX } from 'utils/constants/stringConstants'
import { ProjectStatuses } from 'utils/enums'

const StatusIndicator = (props: { status: string }) => {
  const theme = useTheme()
  return (
    <div
      style={{
        width: 12,
        height: 12,
        borderRadius: 20,
        display: FLEX,
        alignSelf: CENTER,
        marginLeft: 10,
        backgroundColor:
          props.status === ProjectStatuses.PENDING
            ? theme.palette.status.inProgress
            : props.status === ProjectStatuses.PAID
            ? theme.palette.status.completed
            : theme.palette.status.archived
      }}
    />
  )
}
export default StatusIndicator
