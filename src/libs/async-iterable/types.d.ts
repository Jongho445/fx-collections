export type Elems<Collection> = Collection | Promise<Collection>;

export type MapFunction<T, R, Collection> = (
  value: T,
  index: number,
  prev: T | null,
  iterable: Collection
) => Promise<R>;

export type ForEachFunction<T, Collection> = MapFunction<T, any, Collection>;