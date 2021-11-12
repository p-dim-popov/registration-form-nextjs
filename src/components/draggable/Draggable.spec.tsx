import React, { useContext } from "react";
import { render, screen } from "@testing-library/react";
import Draggable from "@src/components/draggable/Draggable";
import DraggableContext, { IDraggableContext } from "@src/contexts/DraggableContext";

const renderAndGetStateOfDraggable = (): IDraggableContext => {
    const Mock: React.FC = () => (
        <input placeholder={JSON.stringify(useContext(DraggableContext))} />
    );
    const {
        container,
    } = render(<Draggable><Mock /></Draggable>);
    return JSON.parse(container.querySelector("input")!.placeholder);
};

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

    it("should have initial position: { x: 0, y: vh / 2 }", () => {
        const state = renderAndGetStateOfDraggable();
        expect(state.x).toEqual(0);
        expect(state.y).toEqual(window.innerHeight / 2);
    });
});
