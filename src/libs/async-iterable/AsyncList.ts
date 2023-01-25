type Collection<T> = T[];
type Elems<T> = T[] | Promise<T[]>;
type MapFunction<T, R> = (value: T, index: number, prev: T | null, iterable: T[]) => Promise<R>

export default class AsyncList<T> {

  private readonly elems: Elems<T>;

  public constructor(elems: Elems<T>) {
    this.elems = elems;
  }

  public static of<T>(elems: Iterable<T>): AsyncList<T> {
    const list: T[] = [];

    for (const elem of elems) {
      list.push(elem);
    }

    return new AsyncList(list);
  }

  private chain<T>(elems: Elems<T>): AsyncList<T> {
    return new AsyncList(elems);
  }

  /*** --------------------------------- 공통 --------------------------------- ***/

  public get() {
    if (this.elems instanceof Promise) {
      return this.elems;
    }
    else {
      return Promise.resolve(this.elems);
    }
  }

  public map<R>(fn: MapFunction<T, R>) {
    if (this.elems instanceof Promise) {
      const promise = this.elems
        .then(innerElems => this.runInParallel(innerElems, fn));

      return this.chain(promise);
    }
    else {
      const promise = this.runInParallel(this.elems, fn);
      return this.chain(promise);
    }
  }

  private async runInSync<R>(elems: Collection<T>, fn: MapFunction<T, R>): Promise<R[]> {
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

  private runInParallel<R>(elems: Collection<T>, fn: MapFunction<T, R>): Promise<R[]> {
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