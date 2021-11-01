import { useValidation } from "@src/features/hooks/useValidation";

describe("useValidation", () => {
  it("should return tuple with onChange, value, error", () => {
    const result = useValidation();
    expect(result).toBeInstanceOf(Array);
    const [onChange, value, state, errorMessage] = result;
    expect(onChange).toBeInstanceOf(Function);
    expect(typeof value).toEqual("string");
    expect(typeof state).toEqual("string");
    expect(typeof errorMessage).toEqual("string");
  });
});
