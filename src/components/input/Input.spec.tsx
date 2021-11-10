import React from "react";
import { render, screen } from "@testing-library/react";
import Input from "@src/components/input/Input";
import Rule from "@src/features/rule-creators/ruleCreators";
import userEvent from "@testing-library/user-event";
import FormContext, {
    getFormContextDefaultValue,
    IFormContext,
} from "@src/contexts/form/FormContext";

describe("Input", () => {
    it("should render input Rule()", () => {
        const { container } = render(<Input id="TEST" />);

        expect(container.querySelector("input")).toBeInTheDocument();
    });

    it.each([
        [{ id: "TEST" }, "TEST"],
        [{ id: "TEST", label: "TEST_LABEL" }, "TEST_LABEL"],
    ])("should show correct label: (%s) (%s)", (props, expectedLabel) => {
        render(<Input {...props} />);

        const input = screen.queryByLabelText(expectedLabel);

        expect(input).toBeInTheDocument();
    });

    it.each([
        [{ id: "TEST" }, "TEST"],
        [{ id: "TEST", label: "TEST_LABEL" }, "TEST_LABEL"],
    ])("should show correct placeholder: (%s) (%s)", (props, expectedLabel) => {
        render(<Input {...props} inlineLabel />);

        const input = screen.queryByPlaceholderText(expectedLabel);

        expect(input).toBeInTheDocument();
    });

    it.each([
        [true],
        [false],
    ])("should show validation status - %s", (showValidationStatus) => {
        const rule = Rule<string>().isEqualOrGreaterThan("18");
        render(<Input id="TEST" validation={{ rules: [rule] }} showValidationStatus={showValidationStatus} />);

        const { message: errorMessage } = rule;
        let element = screen.queryByText(errorMessage);
        const expectElement = expect(element);
        if (showValidationStatus) {
            expectElement.toBeInTheDocument();
            expect(element).toHaveClass("text-gray-400");
        } else {
            expectElement.not.toBeInTheDocument();
        }

        const input = screen.getByLabelText("TEST");
        input.focus();
        userEvent.type(input, "4");
        userEvent.tab();

        element = screen.queryByText(errorMessage);
        expect(element).toBeInTheDocument();
    });

    it("should have ordered elements error - label - input - summary", () => {
        const rule = Rule<string>().isEqualOrGreaterThan("18");
        render(<Input id="TEST" validation={{ rules: [rule] }} />);

        const input = screen.getByLabelText("TEST");
        input.focus();
        userEvent.type(input, "4");
        userEvent.tab();

        const { message: errorMessage } = rule;
        expect(input).toBeInTheDocument();
        expect(input?.previousElementSibling?.previousElementSibling?.innerHTML).toMatch(errorMessage);
        expect(input?.previousElementSibling).toBeInstanceOf(HTMLLabelElement);
    });

    it("should register in context on mount", () => {
        const rules = [Rule<string>().isEqualOrGreaterThan("18")];
        const formContextMock: IFormContext<string> = {
            data: {},
            definitions: { _: {} },
            setDefinitionFor(fieldName: string) {
                return (definition) => {
                    formContextMock.definitions._[fieldName] = definition;
                };
            },
            getDefinitionFor: (fieldName) => formContextMock.definitions._[fieldName],
            set: () => () => {},
        };

        render(
            <FormContext.Provider
                value={formContextMock}
            >
                <Input id="TEST" validation={{ rules }} />
            </FormContext.Provider>,
        );

        expect(formContextMock.definitions._.TEST).toEqual(rules);
    });

    it("should be optionally controllable input", () => {
        const onChangeMock = jest.fn();
        const initialValue = "initialValue";
        const { container } = render(<Input
            id="test-id"
            value={initialValue}
            onChange={onChangeMock}
        />);

        const addedValue = "+other";
        userEvent.type(container.querySelector("input")!, addedValue);
        expect(onChangeMock).toBeCalledTimes(addedValue.length);
        for (let i = 0; i < addedValue.length; i++) {
            expect(onChangeMock).toHaveBeenNthCalledWith(i + 1, `${initialValue}${addedValue[i]}`);
        }
    });

    it("should persist data to the context if available", () => {
        const state = getFormContextDefaultValue();
        state.set = (fieldName) => (value) => {
            state.data[fieldName] = value;
        };

        const { container } = render(
            <FormContext.Provider value={state}>
                <Input id="test-id" />
            </FormContext.Provider>,
        );

        const inputElement = container.querySelector("input");
        const dataInInput = "data in input";
        userEvent.type(inputElement!, dataInInput);

        expect(state.data["test-id"]).toEqual(dataInInput);
    });

    it("should have render previous value if available", () => {
        const state = getFormContextDefaultValue();
        state.data.age = 123;

        const { container } = render(
            <FormContext.Provider value={state}>
                <Input id="age" />
            </FormContext.Provider>,
        );

        const inputElement = container.querySelector("input");
        expect(inputElement?.value).toBe(`${state.data.age}`);
    });

    describe("password", () => {
        it("should have password option", () => {
            const { container } = render(<Input id="password" isPassword />);
            expect(container.querySelector("input")).toHaveAttribute("type", "password");
        });

        it("should be able to show password", () => {
            const { container } = render(<Input id="password" isPassword />);
            const inputField = container.querySelector("input");
            expect(inputField).toHaveAttribute("type", "password");

            userEvent.click(inputField!.nextElementSibling!);

            expect(inputField).toHaveAttribute("type", "text");
        });
    });
});
