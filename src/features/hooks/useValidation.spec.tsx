import { useValidation, ValidationStatus } from "@src/features/hooks/useValidation";
import { isEqualOrGraterThan, isRequired } from "@src/features/rule-creators/ruleCreators";
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("useValidation", () => {
  it("should return tuple with onChange, status, error", () => {
    const Mock: React.FC = () => {
      const result = useValidation<string>({ rules: [isRequired()] });

      expect(result).toBeInstanceOf(Array);
      const [onChange, state, errorMessage] = result;
      expect(onChange).toBeInstanceOf(Function);
      expect(typeof state).toEqual("string");
      expect(typeof errorMessage).toEqual("string");

      return <></>;
    };

    render(<Mock />);
  });

  it("should have initial state pending", () => {
    const Mock: React.FC = () => {
      const [, status] = useValidation<string>({ rules: [isRequired()] });
      expect(status).toEqual(ValidationStatus.Pending);

      return <></>;
    };

    render(<Mock />);
  });

  it.each([
    [ValidationStatus.Valid, 20],
    [ValidationStatus.Error, 4],
  ])("should have %s status", (expectedStatus: ValidationStatus, value: number) => {
    const Mock: React.FC = () => {
      const [onChange, status] = useValidation<number>({ rules: [isEqualOrGraterThan(18)()] });

      return (
        <>
          <div data-testid="TEST_STATUS">{status}</div>
          <input type="text" data-testid="TEST_INPUT" onChange={(event) => onChange(+event.target.value)} />
        </>
      );
    };
    render(<Mock />);
    const inputElement = screen.getByTestId("TEST_INPUT");

    userEvent.type(inputElement, String(value));

    const statusElement = screen.getByTestId("TEST_STATUS");
    const status = statusElement.textContent;
    expect(status).toEqual(expectedStatus);
  });
});
