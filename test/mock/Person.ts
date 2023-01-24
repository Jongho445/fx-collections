import Optionalable from "@libs/optional/Optionalable";

export default class Person extends Optionalable {

  constructor(
    public readonly name: string,
    public readonly age: number
  ) {
    super();
  }

}