import SuperAbstractPerson from "./SuperAbstractPerson";

export default abstract class SubAbstractPerson<T> extends SuperAbstractPerson<T> {

  protected constructor(
    public readonly name: string,
    public readonly age: number
  ) {
    super(name);
  }

}