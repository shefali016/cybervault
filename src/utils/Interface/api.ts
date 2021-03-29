export type GetParams = Partial<{
  startAt: any
  endAt: any
  limit: number
  orderBy: string
  where: string[]
  order: 'asc' | 'desc'
}>
