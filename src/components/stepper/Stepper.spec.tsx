import React from "react";
import { render, screen } from "@testing-library/react";
import Stepper from "@src/components/stepper/Stepper";

describe("Stepper", () => {
    it("should render children", () => {
        render(<Stepper>123</Stepper>);

        expect(screen.queryByText("123")).toBeInTheDocument();
    });

    it("should divide children with div", () => {
        const { container } = render(
            <Stepper>
                123
                <div>4321</div>
                <div>1243</div>
            </Stepper>,
        );

        const dividers = container.querySelectorAll("div.border-t-2.border-gray-500.w-20.self-baseline.m-8");
        expect(dividers).toHaveLength(2);
        Array.from(dividers).forEach((divider) => expect(divider).toBeInTheDocument());
    });
});
