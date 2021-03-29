import { GetParams } from 'utils/Interface/api'

export const constructGetDocsApi = (query: any, params: Partial<GetParams>) => {
  const { limit, orderBy, order = 'asc', startAt, endAt, where } = params

  if (orderBy) {
    query = query.orderBy(orderBy, order)
  }

  if (where) {
    query = query.where(...where)
  }

  if (limit) {
    query = query.limit(limit)
  }

  return query
}
