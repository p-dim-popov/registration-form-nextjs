import React from "react";
import { render } from "@testing-library/react";
import DateInput from "@src/components/date-input/DateInput";

describe("DateInput", () => {
    it("should have 3 input fields", () => {
        const { container } = render(<DateInput />);

        expect(container.querySelectorAll("input")).toHaveLength(3);
    });
});
