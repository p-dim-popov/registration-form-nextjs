import React from "react";
import { render } from "@testing-library/react";
import Selector from "@src/components/selector/Selector";

describe("Select", () => {
    it("should render options", () => {
        const data = {
            id: "test-selector",
            label: "Test Selector",
        };

        const { container } = render(
            <Selector
                {...data}
                definitions={[
                    { value: "option-1", label: "Option 1" },
                    { value: "option-2", label: "Option 2" },
                ]}
            />,
        );

        container.querySelectorAll("input").forEach((element) => {
            expect(element).toHaveAttribute("name", data.id);
        });
        expect(container.querySelectorAll("label")).toHaveLength(2);
    });
});
