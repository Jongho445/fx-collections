import AsyncIterable from "@libs/async-iterable/AsyncIterable";

export default class AsyncList<T> extends AsyncIterable<T, T[]>{

  constructor(elems: T[] | Promise<T[]>) {
    super(elems);
  }

  public static of<T>(elems: T[] | Promise<T[]>) {
    return new AsyncList(elems);
  }
}