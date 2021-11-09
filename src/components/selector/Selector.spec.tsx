import React from "react";
import { render, screen } from "@testing-library/react";
import Selector, { ISelectorProps } from "@src/components/selector/Selector";
import userEvent from "@testing-library/user-event";
import FormContext, { getFormContextDefaultValue } from "@src/contexts/form/FormContext";
import Rule from "@src/features/rule-creators/ruleCreators";

describe("Selector", () => {
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
        expect(container.querySelectorAll("label")).toHaveLength(3);
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

    it("should be controlled", () => {
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

        expect(container.querySelector("input[value=option-2]")).toBeChecked();
    });

    it("should have id", () => {
        const data = {
            id: "test-selector",
        };
        const { container } = render(<Selector {...data} definitions={[]} />);

        expect(container.querySelector(`#${data.id}`)).toBeInTheDocument();
    });

    it("should have validation", () => {
        const props = {
            id: "test-id",
            definitions: [{ value: "option-1" }],
            validation: { rules: [Rule().isRequired] },
        } as ISelectorProps;
        const fcData = getFormContextDefaultValue();
        fcData.data[props.id] = "";
        render(
            <FormContext.Provider value={fcData}>
                <Selector {...props} />
            </FormContext.Provider>,
        );

        const error = screen.queryByText(props.validation!.rules[0][1]);
        expect(error).toBeInTheDocument();
    });
});
