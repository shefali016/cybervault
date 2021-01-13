import React from 'react'
import { useTheme } from '@material-ui/core/styles'
import { CENTER, FLEX } from 'utils/constants/stringConstants'
const ProjectStatusIndicator = (props: { status: string }) => {
  const theme = useTheme()
  return (
    <div
      style={{
        width: 10,
        height: 10,
        borderRadius: 20,
        display: FLEX,
        alignSelf: CENTER,
        marginLeft: 10,
        backgroundColor:
          props.status === 'In progress'
            ? theme.status.inProgress
            : props.status === 'Completed'
            ? theme.status.completed
            : theme.status.archived
      }}
    />
  )
}
export default ProjectStatusIndicator
