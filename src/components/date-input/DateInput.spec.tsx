import React, { useState } from "react";
import { render, screen } from "@testing-library/react";
import DateInput, { set, DateGroupType, get } from "@src/components/date-input/DateInput";
import userEvent from "@testing-library/user-event";

describe("DateInput", () => {
    it("should have 3 input fields", () => {
        const { container } = render(<DateInput />);

        expect(container.querySelectorAll("input")).toHaveLength(3);
    });

    it("should have first two inputs width for 2 digits only", () => {
        const { container } = render(<DateInput />);

        Array.from(container.querySelectorAll("input"))
            .slice(0, 2)
            .forEach((inputElement) => {
                expect(inputElement).toHaveClass("w-14");
            });
    });

    it("should last field styled for only 4 digits", () => {
        const { container } = render(<DateInput />);

        const lastInput = Array.from(container.querySelectorAll("input")).pop();
        expect(lastInput).toHaveClass("w-20");
    });

    const Mock: React.FC = () => {
        const [value, setValue] = useState("12-34-5678");
        return (
            <>
                <DateInput value={value} onChange={setValue} />
                <div data-testid="test-id">{value}</div>
            </>
        );
    };

    it("should have value in format dd-M-yyyy", () => {
        render(<Mock />);

        const monthsInput = screen.queryByPlaceholderText("MM");
        userEvent.clear(monthsInput!);
        userEvent.type(monthsInput!, "2");

        const state = screen.getByTestId("test-id");
        expect(state.textContent).toEqual("12-2-5678");
    });

    it.each([
        ["1-10-1900", DateGroupType.Days, "3", "3-10-1900"],
        ["1-10-1900", DateGroupType.Months, "3", "1-3-1900"],
        ["1-10-1900", DateGroupType.Year, "3", "1-10-3"],
        ["1-10-1900", DateGroupType.Year, "123", "1-10-123"],
        ["1-10-1900", DateGroupType.Year, "1123", "1-10-1123"],
    ])("should have set function which returns date set correctly: %s %s %s, expected: %s", (
        fullDate: string, changedGroup: DateGroupType, value: string, expectedResult: string,
    ) => {
        expect(set(changedGroup)(fullDate)(value)).toEqual(expectedResult);
    });

    it.each([
        ["12-34-5678", DateGroupType.Days, "12"],
        ["12-34-5678", DateGroupType.Months, "34"],
        ["12-34-5678", DateGroupType.Year, "5678"],
    ])("should have get function which returns wanted group: %s %s", (fullDate: string, dateGroup: DateGroupType, expectedValue: string) => {
        expect(get(dateGroup)(fullDate)).toEqual(expectedValue);
    });
});
