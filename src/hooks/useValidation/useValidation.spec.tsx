import { IUseValidationOptions, useValidation } from "@src/hooks/useValidation/useValidation";
import React, { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FormContext, { IFormContext } from "@src/contexts/form/FormContext";
import FieldDefinition, {
    isDifferentThan,
    isEqualOrGreaterThan, isRequired,
} from "@src/features/rule-creators/FieldDefinition";

describe("useValidation", () => {
    it("should return tuple with onChange, status, error", () => {
        const Mock: React.FC = () => {
            const [value] = useState("");
            const result = useValidation({
                rules: FieldDefinition({ rules: [[isRequired]] }),
            }, value);

            expect(result).toBeInstanceOf(Array);

            return <></>;
        };

        render(<Mock />);
    });

    describe("status changes", () => {
        const Mock: React.FC<IUseValidationOptions<number>> = ({ onValid, onError, rules }) => {
            const [value, setValue] = useState(0);
            const errors = useValidation<number>({
                rules, onValid, onError,
            }, value);

            return (
                <>
                    <div data-testid="TEST_STATUS">{errors}</div>
                    <input type="text" data-testid="TEST_INPUT" onChange={(event) => setValue(+event.target.value)} />
                </>
            );
        };

        it.each([
            [20, 18],
            [4, 18],
        ])("should show error when !(%s >= %s)", (value: number, comparable: number) => {
            const [rule] = FieldDefinition({ rules: [[isEqualOrGreaterThan(comparable)]] });
            render(<Mock rules={[rule]} />);
            const inputElement = screen.getByTestId("TEST_INPUT");

            userEvent.type(inputElement, String(value));

            const statusElement = screen.getByTestId("TEST_STATUS");
            const expectError = expect(statusElement.textContent);
            const { test, message: errorMessage } = rule;
            if (test(value)) {
                expectError.not.toEqual(errorMessage);
            } else {
                expectError.toEqual(errorMessage);
            }
        });

        it.each([
            [20],
            [4],
        ])("should call function for based on valid or invalid, test >= 18, value %s", (value: number) => {
            const onValidMock = jest.fn();
            const onErrorMock = jest.fn();
            render(<Mock
                rules={FieldDefinition({ name: "Age", rules: [[isEqualOrGreaterThan(18)]] })}
                onValid={onValidMock}
                onError={onErrorMock}
            />);
            const inputElement = screen.getByTestId("TEST_INPUT");

            userEvent.type(inputElement, String(value));

            expect(value >= 18 ? onValidMock : onErrorMock).toBeCalled();
        });
    });

    it.each([
        [true],
        [false],
    ])("should have early return - %s", (earlyReturn) => {
        const Mock: React.FC = () => {
            const [value, setValue] = useState("");
            const errors = useValidation({
                rules: [{ test: () => false, message: "TEST-1" }, { test: () => false, message: "TEST-2" }],
                earlyReturn,
            }, value);

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
            const errors = useValidation({ rules: [{ test: predicateMock, message: "TEST-1" }] }, value);

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
        const [rule] = FieldDefinition<string, ITestContext>({
            rules: [[isDifferentThan({ selector: (c) => c.value, description: valueInContext })]],
        });

        const Mock: React.FC = () => {
            const [inputValue, setInputValue] = useState("");
            const errors = useValidation({
                rules: [rule],
                Context: TestContext,
            }, inputValue);

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
            expectErrorDiv.not.toMatch(rule.message);
        } else {
            expectErrorDiv.toMatch(rule.message);
        }
    });

    it("should not validate if not started", () => {
        const [rule] = FieldDefinition({ rules: [[isRequired]] });
        const Mock: React.FC = () => {
            const [value, setValue] = useState("");
            const [validate, setValidate] = useState(false);
            const errors = useValidation({
                rules: [rule],
            }, value, validate);

            return (
                <div>
                    <input data-testid="INPUT" onChange={(event) => setValue(event.target.value)} />
                    <div data-testid="STATUS">{errors}</div>
                    <button type="button" onClick={() => setValidate(true)} data-testid="BUTTON" />
                </div>
            );
        };
        render(<Mock />);

        userEvent.type(screen.getByTestId("INPUT"), "T{backspace}");

        const statusDiv = screen.getByTestId("STATUS");
        expect(statusDiv.textContent).toEqual("");

        const startValidatingButton = screen.getByTestId("BUTTON");
        userEvent.click(startValidatingButton);

        userEvent.type(screen.getByTestId("INPUT"), "T{backspace}");
        expect(statusDiv.textContent).toEqual(rule.message);
    });
});
