import Optional from "@libs/optional/Optional";

export default abstract class Optionalable<T> {

  abstract run(): Optional<T>;

  public also(fx: (elem: NonNullable<T>) => void): T {
    return this.run().also(fx);
  }

  public let<R>(fx: (elem: NonNullable<T>) => R): R | Extract<T, undefined | null> {
    return this.run().let(fx);
  }

  public filter(fx: (elem: NonNullable<T>) => boolean): Optional<T | null> {
    return this.run().filter(fx);
  }

  public peek(fx: (elem: NonNullable<T>) => void): Optional<T> {
    return this.run().peek(fx);
  }

  public map<R>(fx: (elem: NonNullable<T>) => R): Optional<R | undefined | null> {
    return this.run().map(fx);
  }
}
