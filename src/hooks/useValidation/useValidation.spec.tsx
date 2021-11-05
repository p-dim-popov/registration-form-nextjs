import { IUseValidationOptions, useValidation, ValidationStatus } from "@src/hooks/useValidation/useValidation";
import Rule from "@src/features/rule-creators/ruleCreators";
import React, { useEffect, useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FormContext, { IFormContext } from "@src/contexts/form/FormContext";

describe("useValidation", () => {
    it("should return tuple with onChange, status, error", () => {
        const Mock: React.FC = () => {
            const [value, setValue] = useState("");
            const result = useValidation({ rules: [Rule<string>().isRequired] }, value);

            expect(result).toBeInstanceOf(Array);
            const [startValidating, errorMessages, status] = result;
            expect(startValidating).toBeInstanceOf(Function);
            expect(errorMessages).toBeInstanceOf(Array);
            expect(typeof status).toEqual("string");

            return <></>;
        };

        render(<Mock />);
    });

    it("should have initial state pending", () => {
        const Mock: React.FC = () => {
            const [value] = useState("");
            const [,, status] = useValidation<string>({ rules: [Rule<string>().isRequired] }, value);
            expect(status).toEqual(ValidationStatus.Pending);

            return <></>;
        };

        render(<Mock />);
    });

    describe("status changes", () => {
        const Mock: React.FC<IUseValidationOptions<number>> = ({ onValid, onError, rules }) => {
            const [value, setValue] = useState(0);
            const [startValidating, errors, status] = useValidation<number>({
                rules,
                onValid,
                onError,
            }, value);

            useEffect(startValidating, [startValidating]);

            return (
                <>
                    <div data-testid="TEST_STATUS">{status}</div>
                    <input type="text" data-testid="TEST_INPUT" onChange={(event) => setValue(+event.target.value)} />
                </>
            );
        };

        it.each([
            [ValidationStatus.Valid, 20],
            [ValidationStatus.Error, 4],
        ])("should have %s status", (expectedStatus: ValidationStatus, value: number) => {
            render(<Mock rules={[Rule<number>().isEqualOrGreaterThan(18)]} />);
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
                rules={[Rule<number>({ name: "Age" }).isEqualOrGreaterThan(18)]}
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
            const [value, setValue] = useState("");
            const [start, errors] = useValidation({ rules: [[() => false, "TEST-1"], [() => false, "TEST-2"]], earlyReturn }, value);

            useEffect(start, [start]);

            return (
                <div>
                    <input data-testid="INPUT" onChange={(event) => setValue(event.target.value)} />
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
        const testData = {
            data: {}, definitions: {}, set: () => () => {}, setDefinitionFor: () => () => {}, value: "TEST", getDefinitionFor: () => [],
        };
        const Mock: React.FC = () => {
            const [value, setValue] = useState("");
            const [start,, errors] = useValidation({ rules: [[predicateMock, "TEST-1"]] }, value);
            useEffect(start, [start]);

            return (
                <div>
                    <input data-testid="INPUT" onChange={(event) => setValue(event.target.value)} />
                    <div data-testid="ERROR_DIV">{errors}</div>
                </div>
            );
        };
        render(<FormContext.Provider value={testData}><Mock /></FormContext.Provider>);

        userEvent.type(screen.getByTestId("INPUT"), "T");
        expect(predicateMock).toBeCalledWith("T", testData);
    });

    it.each([
        ["apples", "pears"],
        ["apples", "apples"],
    ])("should work with context (show error when different) - (%s) (%s)", (value: string, valueInContext) => {
        interface ITestContext extends IFormContext<string> {
            value: string,
        }
        const contextData: ITestContext = {
            data: {},
            definitions: {},
            set: () => () => {},
            setDefinitionFor: () => () => {},
            getDefinitionFor: () => [],
            value: valueInContext,
        };
        const TestContext = React.createContext(contextData);
        const [test, errorMessage] = Rule<string, ITestContext>()
            .withContext
            .isDifferentThan({ selector: (c) => c.value, description: valueInContext });

        const Mock: React.FC = () => {
            const [inputValue, setInputValue] = useState("");
            const [start, errors, status] = useValidation({
                rules: [[test, errorMessage]],
                Context: TestContext,
            }, inputValue);
            useEffect(start, [start]);

            return (
                <div>
                    <input data-testid="INPUT" onChange={(event) => setInputValue(event.target.value)} />
                    <div data-testid="ERROR_DIV">{errors}</div>
                </div>
            );
        };
        render(<TestContext.Provider value={contextData}><Mock /></TestContext.Provider>);

        userEvent.type(screen.getByTestId("INPUT"), value);
        const errorDiv = screen.getByTestId("ERROR_DIV");
        const expectErrorDiv = expect(errorDiv.textContent);
        if (value !== valueInContext) {
            expectErrorDiv.not.toMatch(errorMessage);
        } else {
            expectErrorDiv.toMatch(errorMessage);
        }
    });

    it("should have forceValidation method", () => {
        const Mock: React.FC = () => {
            const [value, setValue] = useState("");
            const [forceValidation,, status] = useValidation({
                rules: [Rule<string>().isRequired],
            }, value);

            return (
                <div>
                    <input data-testid="INPUT" onChange={(event) => setValue(event.target.value)} />
                    <div data-testid="STATUS">{status}</div>
                    <button type="button" onClick={forceValidation} data-testid="BUTTON" />
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
