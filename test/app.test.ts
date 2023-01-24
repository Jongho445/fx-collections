import TestModule from "@libs/TestModule";

describe("describe", () => {
  it("it", () => {
    const t = new TestModule("hello")
    expect(t.value).toBe("hello");
  });
});