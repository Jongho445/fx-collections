import AsyncList from "@libs/async-iterable/AsyncList";
import AsyncIterable from "@libs/async-iterable/AsyncIterable";

describe("describe", () => {
  it("list", async () => {
    const result = await AsyncList
      .of([1, 2, 3])
      .map((elem, index, prev, iterable) => Promise.resolve(elem * 2))
      .map(elem => Promise.resolve(elem + 1))
      .get()

    console.log(result);
  });


  it("map", async () => {
    const map = new Map<number, string>();
    // const result = await new AsyncIterable<[number, string], Map<number, string>>(map)
    const result = await AsyncIterable
      .iter<[number, string], Map<number, string>>(map)
      .map(elem => Promise.resolve(elem))
      .get();

  });
});