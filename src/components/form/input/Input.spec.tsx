import React from "react";
import { render } from "@testing-library/react";
import Input from "@src/components/form/input/Input";

describe("Input", () => {
    it("should render input field", () => {
        const { container } = render(<Input />);

        expect(container.querySelector("input")).toBeInTheDocument();
    });
});
