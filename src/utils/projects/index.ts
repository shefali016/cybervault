import { ProjectStatuses } from 'utils/enums'
import { Project } from 'utils/Interface'

export const getToggledArchiveStatus = (project: Project) => {
  const isProjectArchived = project.status === ProjectStatuses.ARCHIVED
  const isProjectPaid = project.isPaid

  if (!isProjectArchived) {
    return ProjectStatuses.ARCHIVED
  }
  return isProjectPaid ? ProjectStatuses.PAID : ProjectStatuses.PROGRESS
}
