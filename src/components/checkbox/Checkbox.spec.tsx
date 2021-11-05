import React from "react";
import { render, screen } from "@testing-library/react";
import Checkbox from "@src/components/checkbox/Checkbox";
import userEvent from "@testing-library/user-event";
import Rule from "@src/features/rule-creators/ruleCreators";

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
        render(<Checkbox id="test" value={false} onChange={onChangeMock} />);

        expect(onChangeMock).toBeCalledWith(true);
    });

    it.each([
        [true],
        [false],
    ])("should have validation", (shouldDbClick: boolean) => {
        const [test, error] = Rule<boolean>().isRequired;
        const { container } = render(<Checkbox id="test" validation={{ rules: [[test, error]] }} />);

        userEvent.click(container.querySelector("input")!);
        if (shouldDbClick) {
            userEvent.click(container.querySelector("input")!);
        }

        const expectErrorElement = expect(screen.queryByText(error));
        if (shouldDbClick) {
            expectErrorElement.toBeInTheDocument();
        } else {
            expectErrorElement.not.toBeInTheDocument();
        }
    });

    it("should have correct order of elements - error, checkbox, label", () => {
        const [test, error] = Rule<boolean>().isRequired;
        const id = "test-id";
        const { container } = render(<Checkbox id={id} validation={{ rules: [[test, error]] }} />);

        const inputElement = container.querySelector("input");
        userEvent.click(inputElement!);
        userEvent.click(inputElement!);

        expect(inputElement?.previousElementSibling?.innerHTML).toMatch(error);
        expect(inputElement?.nextElementSibling?.innerHTML).toMatch(id);
    });
});
