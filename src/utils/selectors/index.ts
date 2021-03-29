import { ReduxState } from 'reducers/rootReducer'
import { createSelector } from 'reselect'
import { ProjectFilters } from 'utils/enums'
import { Invoice, Project } from 'utils/Interface'

const getProjectCache = (state: ReduxState) => state.project.projectCache
const getProjectIds = (state: ReduxState, props: { filter: ProjectFilters }) =>
  state.project.filteredIds[props.filter]
const getFilteredIds = (state: ReduxState) => state.project.filteredIds

const getInvoicesCache = (state: ReduxState) => state.invoice.cache
const getInvoiceIds = (state: ReduxState, props: { filter: string }) =>
  state.invoice.filteredIds.get(props.filter)

export const activeProjects = createSelector(
  [getProjectCache, getFilteredIds],
  (cache, idMap) => {
    const ids = idMap[ProjectFilters.ACTIVE]
    if (!ids) return []
    return ids.reduce((acc: Project[], id: string) => {
      const project = cache[id]
      return project ? [...acc, project] : acc
    }, [])
  }
)

export const filteredProjects = createSelector(
  [getProjectCache, getProjectIds],
  (cache, ids) => {
    if (!ids) return []
    return ids.reduce((acc: Project[], id: string) => {
      const project = cache[id]
      return project ? [...acc, project] : acc
    }, [])
  }
)

export const filteredInvoices = createSelector(
  [getInvoicesCache, getInvoiceIds],
  (cache, ids) => {
    if (!ids) return []
    return ids.reduce((acc: Invoice[], id: string) => {
      const project = cache[id]
      return project ? [...acc, project] : acc
    }, [])
  }
)
