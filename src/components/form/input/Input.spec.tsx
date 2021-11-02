import React from "react";
import { render, screen } from "@testing-library/react";
import Input from "@src/components/form/input/Input";

describe("Input", () => {
    it("should render input field", () => {
        const { container } = render(<Input id="TEST" />);

        expect(container.querySelector("input")).toBeInTheDocument();
    });

    it("should have props: id, <IUseValidationOptions>validation?, showValidationStatus?, label?", () => {
        render(<Input<string> id="Name" validation={{ rules: [] }} label="Full Name" />);
    });

    it.each([
        [{ id: "TEST" }, "TEST"],
        [{ id: "TEST", label: "TEST_LABEL" }, "TEST_LABEL"],
    ])("should show correct label: (%s) (%s)", (props, expectedLabel) => {
        // eslint-disable-next-line react/jsx-props-no-spreading
        render(<Input<string> {...props} />);

        const input = screen.queryByLabelText(expectedLabel);

        expect(input).toBeInTheDocument();
    });

    it.each([
        [{ id: "TEST" }, "TEST"],
        [{ id: "TEST", label: "TEST_LABEL" }, "TEST_LABEL"],
    ])("should show correct placeholder: (%s) (%s)", (props, expectedLabel) => {
        // eslint-disable-next-line react/jsx-props-no-spreading
        render(<Input<string> {...props} inlineLabel />);

        const input = screen.queryByPlaceholderText(expectedLabel);

        expect(input).toBeInTheDocument();
    });
});
