import Optional from "@libs/optional/Optional";
import SubAbstractPerson from "./SubAbstractPerson";

export default class Student extends SubAbstractPerson<Student> {

  constructor(
    public readonly name: string,
    public readonly age: number,
    public readonly studentNumber: number
  ) {
    super(name, age);
  }

  run = () => Optional.of(this as Student);
}