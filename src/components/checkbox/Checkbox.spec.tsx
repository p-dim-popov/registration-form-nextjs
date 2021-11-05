import React from "react";
import { render, screen } from "@testing-library/react";
import Checkbox from "@src/components/checkbox/Checkbox";

describe("Checkbox", () => {
    it("should render input with id", () => {
        const { container } = render(<Checkbox id="TEST" />);

        expect(container.querySelector("input[type=checkbox]")).toBeInTheDocument();
        expect(container.querySelector("#TEST")).toBeInTheDocument();
    });

    it.each([
        ["TEST_ID", undefined, "TEST_ID"],
        ["TEST_ID", "TEST_LABEL", "TEST_LABEL"],
    ])("should have label", (id: string, label: string | undefined, expectedLabel: string) => {
        render(<Checkbox id={id} label={label} />);

        expect(screen.getByLabelText(expectedLabel)).toBeInTheDocument();
    });
});
