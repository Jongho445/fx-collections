import Optionalable from "@libs/optional/Optionalable";

export default abstract class SuperAbstractPerson<T> extends Optionalable<T> {

  protected constructor(
    public readonly name: string
  ) {
    super();
  }

}