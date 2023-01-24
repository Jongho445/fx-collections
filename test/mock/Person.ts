import Optionalable from "@libs/optional/Optionalable";
import Optional from "@libs/optional/Optional";

export default class Person extends Optionalable<Person> {

  constructor(
    public readonly name: string,
    public readonly age: number
  ) {
    super();
  }

  run = () => Optional.of(this);

}