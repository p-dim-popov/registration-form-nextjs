import React from "react";
import { render } from "@testing-library/react";
import Selector from "@src/components/selector/Selector";
import userEvent from "@testing-library/user-event";

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

    it("should react to changes", () => {
        const data = {
            id: "test-selector",
            label: "Test Selector",
            value: "option-2",
            onChange: jest.fn(),
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

        const option1 = container.querySelector("input[value=option-1]") as HTMLInputElement;
        userEvent.click(option1!);

        expect(data.onChange).toHaveBeenCalledWith(option1?.value);
    });
});
