import React from "react";
import { render } from "@testing-library/react";
import Checkbox from "@src/components/checkbox/Checkbox";

describe("Checkbox", () => {
    it("should render input", () => {
        const { container } = render(<Checkbox />);

        expect(container.querySelector("input[type=checkbox]")).toBeInTheDocument();
    });
});
