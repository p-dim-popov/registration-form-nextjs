import Rule, { createMessage, ICreateMessageOptions } from "@src/features/rule-creators/ruleCreators";

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

    it("should create rule with correct message when used function", () => {
        const [, errorMessage] = Rule({ name: "Age" }).isEqualOrGreaterThan(18);
        expect(errorMessage).toEqual("Age should be equal or greater than 18!");
    });

    it("should create rule with correct message when used default", () => {
        const [, errorMessage] = Rule().isEqualOrGreaterThan(18);
        expect(errorMessage).toEqual("Field should be equal or greater than 18!");
    });
});
