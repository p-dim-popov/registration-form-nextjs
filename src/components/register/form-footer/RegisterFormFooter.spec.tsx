import React from "react";
import { render } from "@testing-library/react";
import RegisterFormFooter from "@src/components/register/form-footer/RegisterFormFooter";

describe("RegisterFormFooter", () => {
    it("should have continue button and contact us link separated by line", () => {
        const { container } = render(<RegisterFormFooter />);

        const button = container.querySelector("a");
        expect(button).toBeInTheDocument();
        const separator = button!.nextElementSibling;
        expect(separator).toBeInstanceOf(HTMLDivElement);
        expect(separator).toHaveClass("border-t-2 border-gray-200 min-w-full self-baseline my-8");
        expect(separator).toBeInTheDocument();
        expect(button!.nextElementSibling).toBeInTheDocument();
        expect(container.querySelector("a")).toBeInTheDocument();
    });
});
