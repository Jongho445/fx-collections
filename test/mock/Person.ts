import Optional from "@libs/optional/Optional";

export default class Person {

  constructor(
    public readonly name: string,
    public readonly age: number
  ) {}

  public run() {
    return Optional.of(this)
  }
}