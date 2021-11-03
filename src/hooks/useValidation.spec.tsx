import { IUseValidationOptions, useValidation, ValidationStatus } from "@src/hooks/useValidation";
import Field from "@src/features/rule-creators/ruleCreators";
import React, { useContext, useEffect } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("useValidation", () => {
    it("should return tuple with onChange, status, error", () => {
        const Mock: React.FC = () => {
            const result = useValidation<string>({ rules: [Field().isRequired] });

            expect(result).toBeInstanceOf(Array);
            const [onChange, startValidating, errorMessages, status] = result;
            expect(onChange).toBeInstanceOf(Function);
            expect(startValidating).toBeInstanceOf(Function);
            expect(errorMessages).toBeInstanceOf(Array);
            expect(typeof status).toEqual("string");

            return <></>;
        };

        render(<Mock />);
    });

    it("should have initial state pending", () => {
        const Mock: React.FC = () => {
            const [,,, status] = useValidation<string>({ rules: [Field().isRequired] });
            expect(status).toEqual(ValidationStatus.Pending);

            return <></>;
        };

        render(<Mock />);
    });

    describe("status changes", () => {
        const Mock: React.FC<IUseValidationOptions<number>> = ({ onValid, onError, rules }) => {
            const [onChange, startValidating, errors, status] = useValidation<number>({
                rules,
                onValid,
                onError,
            });

            useEffect(() => {
                startValidating();
            }, []);

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
            render(<Mock rules={[Field().isEqualOrGreaterThan(18)]} />);
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
                rules={[Field({ name: "Age" }).isEqualOrGreaterThan(18)]}
                onValid={onValidMock}
                onError={onErrorMock}
            />);
            const inputElement = screen.getByTestId("TEST_INPUT");

            userEvent.type(inputElement, String(value));

            expect(expectedStatus === ValidationStatus.Valid ? onValidMock : onErrorMock).toBeCalled();
        });
    });

    it.each([
        [true],
        [false],
    ])("should have early return - %s", (earlyReturn) => {
        const Mock: React.FC = () => {
            const [onChange, start, errors] = useValidation({ rules: [[() => false, "TEST-1"], [() => false, "TEST-2"]], earlyReturn });

            useEffect(start, []);

            return (
                <div>
                    <input data-testid="INPUT" onChange={(event) => onChange(event.target.value)} />
                    <div data-testid="ERROR_DIV">{errors}</div>
                </div>
            );
        };
        render(<Mock />);

        userEvent.type(screen.getByTestId("INPUT"), "TEST");

        const errorDiv = screen.getByTestId("ERROR_DIV");
        expect(errorDiv.textContent).toMatch("TEST-1");
        const expectSecondMessage = expect(errorDiv.textContent);
        if (earlyReturn) {
            expectSecondMessage.not.toMatch("TEST-2");
        } else {
            expectSecondMessage.toMatch("TEST-2");
        }
    });

    it("should receive optional context", () => {
        const predicateMock = jest.fn();
        const TestContext = React.createContext("CONTEXT_DATA");
        const Mock: React.FC = () => {
            const context = useContext(TestContext);
            const [onChange, start, status, errors] = useValidation({ rules: [[predicateMock, "TEST-1"]], context });
            useEffect(start, [start]);

            return (
                <div>
                    <input data-testid="INPUT" onChange={(event) => onChange(event.target.value)} />
                    <div data-testid="ERROR_DIV">{errors}</div>
                </div>
            );
        };
        render(<Mock />);

        userEvent.type(screen.getByTestId("INPUT"), "T");
        expect(predicateMock).toBeCalledWith("T", "CONTEXT_DATA");
    });

    it.each([
        ["TEST", false],
        ["NOT_TEST", true],
    ])("should work with context as expected", (val: string, isDifferent: boolean) => {
        const TestContext = React.createContext({ value: "TEST" });
        const Mock: React.FC = () => {
            const context = useContext(TestContext);
            const [onChange, start, errors] = useValidation({
                rules: [Field<string, typeof context>().isDifferentThan((c) => c.value, "ERROR_HERE")],
                context,
            });
            useEffect(start, [start]);

            return (
                <div>
                    <input data-testid="INPUT" onChange={(event) => onChange(event.target.value)} />
                    <div data-testid="ERROR_DIV">{errors}</div>
                </div>
            );
        };
        render(<Mock />);

        userEvent.type(screen.getByTestId("INPUT"), val);
        const errorDiv = screen.getByTestId("ERROR_DIV");
        const expectErrorDiv = expect(errorDiv.textContent);
        if (isDifferent) {
            expectErrorDiv.not.toMatch("ERROR_HERE");
        } else {
            expectErrorDiv.toMatch("ERROR_HERE");
        }
    });

    it("should have startValidating method", () => {
        const Mock: React.FC = () => {
            const [onChange, startValidating,, status] = useValidation({
                rules: [Field().isRequired],
            });

            return (
                <div>
                    <input data-testid="INPUT" onChange={(event) => onChange(event.target.value)} />
                    <div data-testid="STATUS">{status}</div>
                    <button type="button" onClick={startValidating} data-testid="BUTTON" />
                </div>
            );
        };
        render(<Mock />);

        userEvent.type(screen.getByTestId("INPUT"), "TEST");

        const statusDiv = screen.getByTestId("STATUS");
        expect(statusDiv.textContent).toEqual(ValidationStatus.Pending);

        const startValidatingButton = screen.getByTestId("BUTTON");
        userEvent.click(startValidatingButton);

        userEvent.type(screen.getByTestId("INPUT"), "TEST");
        expect(statusDiv.textContent).toEqual(ValidationStatus.Valid);
    });
});
