import PromiseState from "@libs/optional/PromiseState";

describe("describe", () => {
  it("it", async () => {
    const result = await PromiseState
      .of(1)
      .map(elem => Promise.resolve(elem * 2))
      .map(elem => Promise.resolve(elem + 1))
      .map(elem => Promise.resolve(elem + "!!"))
      .orElseThrow(Error("null"));

    console.log(result);
  })
})