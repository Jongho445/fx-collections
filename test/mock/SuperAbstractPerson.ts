import StateSpec from "@libs/optional/StateSpec";

export default abstract class SuperAbstractPerson<T> extends StateSpec<T> {

  protected constructor(
    public readonly name: string
  ) {
    super();
  }

}