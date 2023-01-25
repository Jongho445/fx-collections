import Optional from "@libs/optional/Optional";

export default abstract class OptionalSpec<T> {

  abstract run(): Optional<T>;

  public also(fn: (elem: NonNullable<T>) => void): T {
    return this.run().also(fn);
  }

  public let<R>(fn: (elem: NonNullable<T>) => R): R | Extract<T, undefined | null> {
    return this.run().let(fn);
  }

  public filter(fn: (elem: NonNullable<T>) => boolean): Optional<T | null> {
    return this.run().filter(fn);
  }

  public peek(fn: (elem: NonNullable<T>) => void): Optional<T> {
    return this.run().peek(fn);
  }

  public map<R>(fn: (elem: NonNullable<T>) => R): Optional<R | undefined | null> {
    return this.run().map(fn);
  }
}
