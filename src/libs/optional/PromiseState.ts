export default class PromiseState<T> {

  private readonly elem: T | Promise<T>;

  private constructor(elem: T | Promise<T>) {
    this.elem = elem;
  }

  public static of<T>(elem: T | Promise<T>) {
    return new PromiseState(elem);
  }

  public get(): Promise<T> {
    if (this.elem instanceof Promise<T>) {
      return this.elem;
    } else {
      return Promise.resolve(this.elem);
    }
  }

  private chain<T>(elem: T | Promise<T>) {
    return PromiseState.of(elem);
  }

  public map<R>(fn: (elem: NonNullable<T>) => Promise<R>): PromiseState<R | undefined | null> {
    if (this.elem instanceof Promise<T>) {
      const promise = this.elem.then(value => {
        if (value === undefined || value === null) {
          return value as undefined | null
        } else {
          return fn(value);
        }
      });

      return this.chain(promise);
    }
    else {
      if (this.elem === undefined || this.elem === null) {
        const elem = this.elem as undefined | null;
        return this.chain(Promise.resolve(elem));
      } else {
        const result = fn(this.elem);
        return this.chain(result);
      }
    }
  }

  public orElseThrow(err: Error): Promise<NonNullable<T>> {
    if (this.elem instanceof Promise<T>) {
      const promise = this.elem.then(elem => {
        if (elem === null || elem === undefined) {
          throw err;
        } else {
          return elem;
        }
      });

      return promise;
    }
    else {
      if (this.elem === null || this.elem === undefined) {
        throw err;
      } else {
        return Promise.resolve(this.elem);
      }
    }
  }

}