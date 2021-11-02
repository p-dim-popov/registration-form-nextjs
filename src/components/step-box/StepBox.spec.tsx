import React from "react";
import { render } from "@testing-library/react";
import StepBox from "@src/components/step-box/StepBox";

describe("StepBox", () => {
    it("should render div with role button", () => {
        const { container } = render(<StepBox />);
        const box = container.querySelector("div");
        expect(box).toBeInTheDocument();
        expect(box).toHaveClass("cursor-pointer");
    });
});
