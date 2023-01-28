import State from "@libs/optional/State";

export default abstract class StateSpec<T> {

  abstract run(): State<T>;

  public also(fn: (elem: NonNullable<T>) => void): T {
    return this.run().also(fn);
  }

  public let<R>(fn: (elem: NonNullable<T>) => R): R | Extract<T, undefined | null> {
    return this.run().let(fn);
  }

  public filter(fn: (elem: NonNullable<T>) => boolean): State<T | null> {
    return this.run().filter(fn);
  }

  public peek(fn: (elem: NonNullable<T>) => void): State<T> {
    return this.run().peek(fn);
  }

  public map<R>(fn: (elem: NonNullable<T>) => R): State<R | undefined | null> {
    return this.run().map(fn);
  }
}
