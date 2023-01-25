import OptionalSpec from "@libs/optional/OptionalSpec";

export default abstract class SuperAbstractPerson<T> extends OptionalSpec<T> {

  protected constructor(
    public readonly name: string
  ) {
    super();
  }

}