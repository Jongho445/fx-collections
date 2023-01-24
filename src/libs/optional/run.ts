import Optional from "@libs/optional/Optional";

function run<T>(elem: T): Optional<T> {
  return Optional.of(elem);
}

export default run;