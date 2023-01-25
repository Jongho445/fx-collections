import MapExecutor from "@libs/async-iterable/executor/MapExecutor";
import {Elems, ForEachFunction} from "@libs/async-iterable/types";
import AsyncIterable from "@libs/async-iterable/AsyncIterable";

type ForEachChain<T, Collection extends Iterable<T>> = (promise: Promise<Collection>) => AsyncIterable<T, Collection>

export default class ForEachMapExecutor extends MapExecutor {

  public forEach<T, Collection extends Iterable<T>>(
    elems: Elems<Collection>, fn: ForEachFunction<T, Collection>, chain: ForEachChain<T, Collection>
  ): AsyncIterable<T, Collection> {
    if (elems instanceof Promise<Collection>) {
      const promise = elems
        .then(innerElems => this.runInParallel(innerElems, fn))
        .then(() => elems);

      return chain(promise);
    }
    else {
      const promise = this.runInParallel(elems, fn)
        .then(() => elems);

      return chain(promise);
    }
  }
}