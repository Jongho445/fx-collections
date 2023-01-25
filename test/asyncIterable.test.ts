import AsyncList from "@libs/async-iterable/AsyncList";

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
    const result = await AsyncList
      .of(map)
      .map(elem => Promise.resolve(elem))
      .get()
  })
})