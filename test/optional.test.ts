import run from "@libs/optional/run";
import Optional from "@libs/optional/Optional";
import Person from "./mock/Person";

describe("describe", () => {

  it("test1", () => {
    const person = Optional
      .of(Person.of("john", 22))
      .filter(({ age }) => age > 20)
      .also(() => console.log("이 콘솔이 실행되었다면 미성년자가 아닙니다."));


    expect(person?.name).toBe("john");
  });

  it("test2", () => {
    const person = Person
      .of("peter", 29)
      .filter(it => it.age > 20)
      .map(it => it.name)
      .flatMap(name =>
        Person
          .of(name + "!", 20)
          .peek(it => console.log(it.name + " 하하"))
      )
      .orElse(Error("미성년자 입니다."));

    expect(person.name).toBe("peter!");
  });

  it("test3", () => {
    const personOrStr = run(getPerson(false))
      .peek(({ name }) => console.log(`이름은 ${name} 입니다. (null이면 실행되지 않음)`))
      .orElse(() => "null");

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