import React from "react";
import { render, screen } from "@testing-library/react";
import StepBox from "@src/components/step-box/StepBox";

describe("StepBox", () => {
    it("should render div with role button", () => {
        const { container } = render(<StepBox />);
        const box = container.querySelector("div");
        expect(box).toBeInTheDocument();
        expect(box).toHaveClass("cursor-pointer");
    });

    it("should have title and box content", () => {
        render(<StepBox title="Account Details" boxContent="1" />);

        expect(screen.queryByText("Account Details")).toBeInTheDocument();
        expect(screen.queryByText("1")).toBeInTheDocument();
    });
});
