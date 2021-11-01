import { useValidation, ValidationStatus } from "@src/features/hooks/useValidation";
import { isRequired } from "@src/features/rule-creators/ruleCreators";

describe("useValidation", () => {
  it("should return tuple with onChange, status, error", () => {
    const result = useValidation<string>({
      rules: [
        isRequired(),
      ],
    });
    expect(result).toBeInstanceOf(Array);
    const [onChange, state, errorMessage] = result;
    expect(onChange).toBeInstanceOf(Function);
    expect(typeof state).toEqual("string");
    expect(typeof errorMessage).toEqual("string");
  });

  it("should have initial state pending", () => {
    const [, status] = useValidation<string>({ rules: [isRequired()] });
    expect(status).toEqual(ValidationStatus.Pending);
  });
});
