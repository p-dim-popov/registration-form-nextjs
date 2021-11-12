import React, { useContext } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Draggable from "@src/components/draggable/Draggable";
import userEvent from "@testing-library/user-event";
import DraggableContext from "@src/contexts/DraggableContext";

describe("Draggable", () => {
    it("should render children in a div", () => {
        render(<Draggable>test</Draggable>);
        expect(screen.queryByText(/test/i)?.parentElement).toBeInstanceOf(HTMLDivElement);
    });

    it("should be marked draggable", () => {
        const { container } = render(<Draggable />);
        expect(container.querySelector("div")).toHaveAttribute("draggable", "true");
    });

    it("should pass state to children via context", () => {
        const Mock: React.FC = () => (
            <input placeholder={JSON.stringify(useContext(DraggableContext))} />
        );
        const {
            container,
        } = render(<Draggable><Mock /></Draggable>);
        const value = container.querySelector("input")!.placeholder;
        expect(JSON.parse(value)).toBeInstanceOf(Object);
    });
});
