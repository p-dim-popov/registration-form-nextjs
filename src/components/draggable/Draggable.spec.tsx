import React from "react";
import { render, screen } from "@testing-library/react";
import Draggable from "@src/components/draggable/Draggable";

describe("Draggable", () => {
    it("should render children in a div", () => {
        render(<Draggable>test</Draggable>);
        expect(screen.queryByText(/test/i)?.parentElement).toBeInstanceOf(HTMLDivElement);
    });

    it("should be marked draggable", () => {
        const { container } = render(<Draggable />);
        expect(container.querySelector("div")).toHaveAttribute("draggable", "true");
    });
});
