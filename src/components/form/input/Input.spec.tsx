import React from "react";
import { render, screen } from "@testing-library/react";
import Input from "@src/components/form/input/Input";
import Rule from "@src/features/rule-creators/ruleCreators";
import userEvent from "@testing-library/user-event";

describe("Input", () => {
    it("should render input Rule()", () => {
        const { container } = render(<Input id="TEST" />);

        expect(container.querySelector("input")).toBeInTheDocument();
    });

    it("should have props: id, <IUseValidationOptions>validation?, showValidationStatus?, label?", () => {
        render(<Input id="Name" validation={{ rules: [] }} label="Full Name" />);
    });

    it.each([
        [{ id: "TEST" }, "TEST"],
        [{ id: "TEST", label: "TEST_LABEL" }, "TEST_LABEL"],
    ])("should show correct label: (%s) (%s)", (props, expectedLabel) => {
        // eslint-disable-next-line react/jsx-props-no-spreading
        render(<Input {...props} />);

        const input = screen.queryByLabelText(expectedLabel);

        expect(input).toBeInTheDocument();
    });

    it.each([
        [{ id: "TEST" }, "TEST"],
        [{ id: "TEST", label: "TEST_LABEL" }, "TEST_LABEL"],
    ])("should show correct placeholder: (%s) (%s)", (props, expectedLabel) => {
        // eslint-disable-next-line react/jsx-props-no-spreading
        render(<Input {...props} inlineLabel />);

        const input = screen.queryByPlaceholderText(expectedLabel);

        expect(input).toBeInTheDocument();
    });

    it.each([
        [true],
        [false],
    ])("should show validation status - %s", (showValidationStatus) => {
        const rule = Rule().isEqualOrGreaterThan(18);
        render(<Input id="TEST" validation={{ rules: [rule] }} showValidationStatus={showValidationStatus} />);

        const [, errorMessage] = rule;
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

    it("should show error between label and input", () => {
        const rule = Rule().isEqualOrGreaterThan(18);
        render(<Input id="TEST" validation={{ rules: [rule] }} />);

        const input = screen.getByLabelText("TEST");
        input.focus();
        userEvent.type(input, "4");
        userEvent.tab();

        const [, errorMessage] = rule;
        const element = screen.queryByText(errorMessage);
        expect(element).toBeInTheDocument();
        expect(element?.previousElementSibling).toBeInstanceOf(HTMLLabelElement);
        expect(element?.nextElementSibling).toBeInstanceOf(HTMLInputElement);
    });
});
