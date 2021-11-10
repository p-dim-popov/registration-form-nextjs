import React from "react";
import { render, screen } from "@testing-library/react";
import Checkbox from "@src/components/checkbox/Checkbox";
import userEvent from "@testing-library/user-event";
import FieldDefinition, { isRequired } from "@src/features/rule-creators/FieldDefinition";

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

    it("should have controlled optional controlled value", () => {
        const onChangeMock = jest.fn();
        const { container } = render(<Checkbox id="test" value={false} onChange={onChangeMock} />);

        userEvent.click(container.querySelector("input[type=checkbox]")!);

        expect(onChangeMock).toBeCalledWith(true);
    });

    it.each([
        [true],
        [false],
    ])("should have validation (test required, initial not clicked, double click => %s)", (shouldDbClick: boolean) => {
        const [rule] = FieldDefinition({ rules: [[isRequired]] });
        const { container } = render(<Checkbox id="test" validation={{ rules: [rule] }} />);

        const element = container.querySelector("input");
        userEvent.click(element!);
        if (shouldDbClick) {
            userEvent.click(element!);
        }

        const expectErrorElement = expect(screen.queryByText(rule.message));
        if (shouldDbClick) {
            expectErrorElement.toBeInTheDocument();
        } else {
            expectErrorElement.not.toBeInTheDocument();
        }
    });

    it("should have correct order of elements - error, checkbox, label", () => {
        const [rule] = FieldDefinition({ rules: [[isRequired]] });
        const id = "test-id";
        const { container } = render(<Checkbox id={id} validation={{ rules: [rule] }} />);

        const inputElement = container.querySelector("input");
        userEvent.click(inputElement!);
        userEvent.click(inputElement!);

        expect(inputElement?.previousElementSibling?.innerHTML).toMatch(rule.message);
        expect(inputElement?.nextElementSibling?.innerHTML).toMatch(id);
    });
});
