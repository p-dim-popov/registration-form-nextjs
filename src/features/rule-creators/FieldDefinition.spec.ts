import FieldDefinition, { isEqualOrGreaterThan } from "@src/features/rule-creators/FieldDefinition";

describe("FieldDefinition", () => {
    it("should create rule with correct message", () => {
        const [{ message: errorMessage }] = FieldDefinition({
            name: "age",
            rules: [[isEqualOrGreaterThan(18)]],
        });
        expect(errorMessage).toEqual("Age should be equal or greater than 18");
    });

    it("should create rule with correct message when used default", () => {
        const [{ message: errorMessage }] = FieldDefinition({
            rules: [[isEqualOrGreaterThan(18)]],
        });
        expect(errorMessage).toEqual("Field should be equal or greater than 18");
    });
});
