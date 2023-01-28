import State from "@libs/optional/State";
import SubAbstractPerson from "./SubAbstractPerson";

export default class Person extends SubAbstractPerson<Person> {

  constructor(
    public readonly name: string,
    public readonly age: number
  ) {
    super(name, age);
  }

  public static of(name: string, age: number) {
    return new Person(name, age);
  }

  run = () => State.of(this as Person);
}