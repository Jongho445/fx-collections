import {Elems, MapFunction} from "@libs/async-iterable/types";
import AsyncIterable from "@libs/async-iterable/AsyncIterable";

type MapChain<R> = (promise: Promise<R[]>) => AsyncIterable<R, R[]>;

export default class MapExecutor {

  public map<T, R, Collection extends Iterable<T>>(
    elems: Elems<Collection>, fn: MapFunction<T, R, Collection>, chain: MapChain<R>
  ): AsyncIterable<R, R[]> {
    return this.mapFormat(elems, elems => this.runInParallel(elems, fn), chain);
  }

  public mapSync<T, R, Collection extends Iterable<T>>(
    elems: Elems<Collection>, fn: MapFunction<T, R, Collection>, chain: MapChain<R>
  ): AsyncIterable<R, R[]> {
    return this.mapFormat(elems, elems => this.runInSync(elems, fn), chain);
  }

  public mapFormat<T, R, Collection extends Iterable<T>>(
    elems: Elems<Collection>, fx: (elems: Collection) => Promise<R[]>, chain: MapChain<R>
  ): AsyncIterable<R, R[]> {
    if (elems instanceof Promise<Collection>) {
      const promise = elems
        .then(innerElems => fx(innerElems));

      return chain(promise);
    }
    else {
      const promise = fx(elems);
      return chain(promise);
    }
  }

  protected async runInSync<T, R, Collection extends Iterable<T>>(
    elems: Collection, fn: MapFunction<T, R, Collection>
  ): Promise<R[]> {
    const result: R[] = [];

    let idx = 0;
    let prev: T | null = null;
    for (const value of elems) {
      const elem = await fn(value, idx, prev, elems)
      result.push(elem);
      idx++;
      prev = value;
    }

    return result;
  }

  protected runInParallel<T, R, Collection extends Iterable<T>>(
    elems: Collection, fn: MapFunction<T, R, Collection>
  ): Promise<R[]> {
    const promises: Promise<R>[] = [];

    let idx = 0;
    let prev: T | null = null;
    for (const value of elems) {
      const elem = fn(value, idx, prev, elems)
      promises.push(elem);
      idx++;
      prev = value;
    }

    return Promise.all(promises);
  }
}