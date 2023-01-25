import {MapFunction, ForEachFunction} from "@libs/async-iterable/types";
import ForEachMapExecutor from "@libs/async-iterable/executor/ForEachMapExecutor";

export default class AsyncIterable<T, Collection extends Iterable<T>> {

  private readonly elems: Collection | Promise<Collection>;

  private readonly fe = new ForEachMapExecutor();

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
    if (this.elems instanceof Promise<Collection>) {
      return this.elems;
    }
    else {
      return Promise.resolve(this.elems);
    }
  }

  public forEach(fn: ForEachFunction<T, Collection>): AsyncIterable<T, Collection> {
    return this.fe.forEach(this.elems, fn, promise => this.chain(promise));
  }

  public map<R>(fn: MapFunction<T, R, Collection>): AsyncIterable<R, R[]> {
    return this.fe.map(this.elems, fn, promise => this.chain(promise));
  }

}