import { IUseValidationOptions, useValidation, ValidationStatus } from "@src/hooks/useValidation";
import Field from "@src/features/rule-creators/ruleCreators";
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("useValidation", () => {
    it("should return tuple with onChange, status, error", () => {
        const Mock: React.FC = () => {
            const result = useValidation<string>({ rules: [Field.isRequired] });

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
            const [, status] = useValidation<string>({ rules: [Field.isRequired] });
            expect(status).toEqual(ValidationStatus.Pending);

            return <></>;
        };

        render(<Mock />);
    });

    describe("status changes", () => {
        const Mock: React.FC<IUseValidationOptions<number>> = ({ onValid, onError, rules }) => {
            const [onChange, status] = useValidation<number>({
                rules,
                onValid,
                onError,
            });

            return (
                <>
                    <div data-testid="TEST_STATUS">{status}</div>
                    <input type="text" data-testid="TEST_INPUT" onChange={(event) => onChange(+event.target.value)} />
                </>
            );
        };

        it.each([
            [ValidationStatus.Valid, 20],
            [ValidationStatus.Error, 4],
        ])("should have %s status", (expectedStatus: ValidationStatus, value: number) => {
            render(<Mock rules={[Field().isEqualOrGraterThan(18)]} />);
            const inputElement = screen.getByTestId("TEST_INPUT");

            userEvent.type(inputElement, String(value));

            const statusElement = screen.getByTestId("TEST_STATUS");
            const status = statusElement.textContent;
            expect(status).toEqual(expectedStatus);
        });

        it.each([
            [ValidationStatus.Valid, 20],
            [ValidationStatus.Error, 4],
        ])("should call function for %s status", (expectedStatus: ValidationStatus, value: number) => {
            const onValidMock = jest.fn();
            const onErrorMock = jest.fn();
            render(<Mock
                rules={[Field({ name: "Age" }).isEqualOrGraterThan(18)]}
                onValid={onValidMock}
                onError={onErrorMock}
            />);
            const inputElement = screen.getByTestId("TEST_INPUT");

            userEvent.type(inputElement, String(value));

            expect(expectedStatus === ValidationStatus.Valid ? onValidMock : onErrorMock).toBeCalled();
        });
    });
});
