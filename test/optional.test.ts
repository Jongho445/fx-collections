import run from "@libs/optional/run";
import Person from "./mock/Person";

describe("describe", () => {
  it("it", () => {
    const person = run(new Person("john", 22))
      .filter(({ age }) => age > 20)
      .also(() => console.log("이 콘솔이 실행되었다면 미성년자가 아닙니다."));

    const personName = new Person("peter", 29)
      .run()
      .filter(it => it.age > 20)
      .map(it => it.name)
      .orElse(Error("미성년자 입니다."));

    const personOrStr = run(getPerson(false))
      .peek(({ name }) => console.log(`이름은 ${name} 입니다. (null이면 실행되지 않음)`))
      .orElse(() => "null");

    expect(person?.name).toBe("john");
    expect(personName).toBe("peter");
    expect(personOrStr).toBe("null");
  });
});

function getPerson(bool: boolean): Person | null {
  if (bool) {
    return new Person("john", 20);
  }
  else {
    return null;
  }
}