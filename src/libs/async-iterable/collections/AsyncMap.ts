import AsyncIterable from "@libs/async-iterable/AsyncIterable";

export default class AsyncMap<K, V> extends AsyncIterable<[K, V], Map<K, V>>{

  constructor(elems: Map<K, V>) {
    super(elems);
  }

  public static of<K, V>(elems: Map<K, V>) {
    return new AsyncMap(elems);
  }
}