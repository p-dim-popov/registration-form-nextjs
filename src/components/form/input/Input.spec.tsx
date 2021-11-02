import React from "react";
import { render } from "@testing-library/react";
import Input from "@src/components/form/input/Input";

describe("Input", () => {
    it("should render input field", () => {
        const { container } = render(<Input id="TEST" />);

        expect(container.querySelector("input")).toBeInTheDocument();
    });

    it("should have props: id, <IUseValidationOptions>validation?, showValidationStatus?, label?", () => {
        render(<Input<string> id="Name" validation={{ rules: [] }} label="Full Name" />);
    });
});
