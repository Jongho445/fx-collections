export default class Optional<T> {

  private readonly elem: T;

  private constructor(elem: T) {
    this.elem = elem;
  }

  public static of<T>(elem: T) {
    return new Optional(elem);
  }

  public get(): T {
    return this.elem;
  }

  public also(fn: (elem: NonNullable<T>) => void): T {
    if (this.elem !== undefined && this.elem !== null) {
      fn(this.elem);
    }

    return this.elem;
  }

  public let<R>(fn: (elem: NonNullable<T>) => R): R | Extract<T, undefined | null> {
    if (this.elem === undefined || this.elem === null) {
      return this.elem as Extract<T, undefined | null>;
    }
    // this.elem이 NonNullable<T>인 case
    else {
      return fn(this.elem);
    }
  }

  public filter(fn: (elem: NonNullable<T>) => boolean): Optional<T | null> {
    if (this.elem === undefined || this.elem === null) {
      return Optional.of(null);
    }

    if (fn(this.elem)) {
      return this;
    } else {
      return Optional.of(null);
    }
  }

  public peek(fn: (elem: NonNullable<T>) => void): Optional<T> {
    if (this.elem !== undefined && this.elem !== null) {
      fn(this.elem);
    }

    return this;
  }

  public flatMap<R>(fn: (elem: NonNullable<T>) => Optional<R>): Optional<R | undefined | null> {
    if (this.elem === undefined) {
      return Optional.of(undefined);
    }
    else if(this.elem === null) {
      return Optional.of(null)
    }
    else {
      return Optional.of(fn(this.elem).get());
    }
  }

  public map<R>(fn: (elem: NonNullable<T>) => R): Optional<R | undefined | null> {
    if (this.elem === undefined) {
      return Optional.of(undefined);
    }
    else if(this.elem === null) {
      return Optional.of(null)
    }
    else {
      return Optional.of(fn(this.elem));
    }
  }

  public orElse<R>(param: Error): NonNullable<T>;
  public orElse<R>(param: () => R): R | NonNullable<T>;
  public orElse<R>(param: R): R | NonNullable<T>;

  public orElse<R>(param: R): R | NonNullable<T> {
    if (param instanceof Error) {
      return this.orElseThrow(param);
    }
    if (typeof param === "function") {
      return this.orElseRun(param as () => R);
    }
    else {
      return this.orElseGet(param);
    }
  }

  private orElseThrow(err: Error): NonNullable<T> {
    if (this.elem === null || this.elem === undefined) {
      throw err;
    }
    else {
      return this.elem as NonNullable<T>;
    }
  }

  private orElseRun<R>(param: () => R): R | NonNullable<T> {
    if (this.elem === null || this.elem === undefined) {
      return param();
    }
    else {
      return this.elem as NonNullable<T>;
    }
  }

  private orElseGet<R>(param: R): R | NonNullable<T> {
    if (this.elem === null || this.elem === undefined) {
      return param;
    }
    else {
      return this.elem as NonNullable<T>;
    }
  }
}