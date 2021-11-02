import React from "react";
import { render, screen } from "@testing-library/react";
import Stepper from "@src/components/stepper/Stepper";

describe("Stepper", () => {
    it("should render children", () => {
        render(<Stepper>123</Stepper>);

        expect(screen.queryByText("123")).toBeInTheDocument();
    });
});
