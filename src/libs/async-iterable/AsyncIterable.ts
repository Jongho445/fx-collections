type MapFunction<T, R, Collection> = (value: T, index: number, prev: T | null, iterable: Collection) => Promise<R>;
type ForEachFunction<T, Collection> = MapFunction<T, any, Collection>;

export default class AsyncIterable<T, Collection extends Iterable<T>> {

  private readonly elems: Collection | Promise<Collection>;

  public constructor(elems: Collection | Promise<Collection>) {
    this.elems = elems;
  }

  public static iter<T, I extends Iterable<T>>(elems: I): AsyncIterable<T, I> {
    return new AsyncIterable<T, I>(elems);
  }

  private chain<T, I extends Iterable<T>>(elems: I | Promise<I>): AsyncIterable<T, I> {
    return new AsyncIterable<T, I>(elems);
  }

  public get(): Promise<Collection> {
    if (this.elems instanceof Promise) {
      return this.elems;
    }
    else {
      return Promise.resolve(this.elems);
    }
  }

  public forEach(fn: ForEachFunction<T, Collection>) {
    if (this.elems instanceof Promise) {
      const promise = this.elems
        .then(innerElems => this.runInParallel(innerElems, fn))
        .then(() => this.elems);

      return this.chain<T, Collection>(promise);
    }
    else {
      const promise = this.runInParallel(this.elems, fn)
        .then(() => this.elems);

      return this.chain<T, Collection>(promise);
    }
  }

  public map<R>(fn: MapFunction<T, R, Collection>) {
    if (this.elems instanceof Promise) {
      const promise = this.elems
        .then(innerElems => this.runInParallel(innerElems, fn));

      return this.chain<R, R[]>(promise);
    }
    else {
      const promise = this.runInParallel(this.elems, fn);
      return this.chain<R, R[]>(promise);
    }
  }

  private async runInSync<R>(elems: Collection, fn: MapFunction<T, R, Collection>): Promise<R[]> {
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

  private runInParallel<R>(elems: Collection, fn: MapFunction<T, R, Collection>): Promise<R[]> {
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