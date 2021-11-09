import React from "react";
import { render } from "@testing-library/react";
import DateInput from "@src/components/date-input/DateInput";

describe("DateInput", () => {
    it("should have 3 input fields", () => {
        const { container } = render(<DateInput />);

        expect(container.querySelectorAll("input")).toHaveLength(3);
    });

    it("should have first two inputs width for 2 digits only", () => {
        const { container } = render(<DateInput />);

        Array.from(container.querySelectorAll("input"))
            .slice(0, 2)
            .forEach((inputElement) => {
                expect(inputElement).toHaveClass("w-11");
            });
    });
});
