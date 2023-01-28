import State from "@libs/optional/State";

function run<T>(elem: T): State<T> {
  return State.of(elem);
}

export default run;