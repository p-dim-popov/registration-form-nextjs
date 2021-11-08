import React from "react";
import { render } from "@testing-library/react";
import Selector from "@src/components/selector/Selector";

describe("Select", () => {
    it("should render options", () => {
        const { container } = render(
            <Selector
                definitions={[
                    { value: "option-1", label: "Option 1" },
                    { value: "option-2", label: "Option 2" },
                ]}
            />,
        );

        expect(container.querySelectorAll("input")).toHaveLength(2);
    });
});
