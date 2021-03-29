export const reduceFilterArray = (
  array: any[]
): { ids: string[]; cache: { [id: string]: any[] } } => {
  const { ids, cache } = array.reduce(
    (
      acc: {
        ids: string[]
        cache: { [id: string]: any }
      },
      item: any
    ) => ({
      ids: [...acc.ids, item.id],
      cache: { ...acc.cache, [item.id]: item }
    }),
    {
      ids: [],
      cache: {}
    }
  )
  return { ids, cache }
}
