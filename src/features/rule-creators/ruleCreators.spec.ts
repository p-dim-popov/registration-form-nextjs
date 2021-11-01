import { createMessage, ICreateMessageOptions } from "@src/features/rule-creators/ruleCreators";

describe("ruleCreators", () => {
  describe("createMessage", () => {
    it.each([
      [{}, "Field is required!"],
      [{ name: "name" }, "Name is required!"],
      [{ message: "lowercase message" }, "lowercase message"],
      [{ name: "TEST", message: "TEST TEST!" }, "TEST TEST!"],
    ])("should work as expected %s -> %s", (options: ICreateMessageOptions, expected: string) => {
      const defaultCreator = (field: string) => `${field} is required!`;
      expect(createMessage(options, defaultCreator)).toEqual(expected);
    });
  });
});
