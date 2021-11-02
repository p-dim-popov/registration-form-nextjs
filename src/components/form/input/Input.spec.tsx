import React from "react";
import { render, screen } from "@testing-library/react";
import Input from "@src/components/form/input/Input";
import Field from "@src/features/rule-creators/ruleCreators";
import userEvent from "@testing-library/user-event";

describe("Input", () => {
    it("should render input field", () => {
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

    it("should show validation status", () => {
        const rule = Field.isEqualOrGraterThan(18);
        render(<Input id="TEST" validation={{ rules: [rule] }} />);

        const input = screen.getByLabelText("TEST");
        userEvent.type(input, "4");

        const [, errorMessage] = rule;
        const element = screen.queryByText(errorMessage);
        expect(element).toBeInTheDocument();
    });
});
