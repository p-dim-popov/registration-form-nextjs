import { useValidation } from "@src/features/hooks/useValidation";

describe("useValidation", () => {
  it("should return tuple with onChange, status, error", () => {
    const result = useValidation<string>({
      rules: [
        [(value) => !!value, "Field is required!"],
      ],
    });
    expect(result).toBeInstanceOf(Array);
    const [onChange, state, errorMessage] = result;
    expect(onChange).toBeInstanceOf(Function);
    expect(typeof state).toEqual("string");
    expect(typeof errorMessage).toEqual("string");
  });
});
