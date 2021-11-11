import React from "react";
import { render, screen } from "@testing-library/react";
import UserDetails from "@src/pages/register/user-details";
import userEvent from "@testing-library/user-event";
import { parseISO } from "date-fns";

const renderPage = () => {
    const getLayout = UserDetails.getLayout || ((page) => page);
    const Page = getLayout(<UserDetails />);
    return render(Page);
};

const collectErrorElements = (container: HTMLElement) => Array.from(container.querySelectorAll("ul li em"));

afterEach(() => {
    jest.useRealTimers();
});

describe("UserDetails", () => {
    it("should show items", () => {
        render(<UserDetails />);
        expect(screen.queryAllByPlaceholderText(/(first|last) name/i)).toHaveLength(2);
        screen.queryAllByText(/gender/i).forEach((el) => expect(el).toBeInTheDocument());
    });

    describe("validations", () => {
        describe("first/last name", () => {
            it.each([
                ["first name", "va lid-", "firstName", true],
                ["first name", "valid--not", "firstName", false],
                ["first name", "valid n0t", "firstName", false],
                ["first name", "no", "firstName", false],
                ["last name", "va lid-", "lastName", true],
                ["last name", "valid--not", "lastName", false],
                ["last name", "valid n0t", "lastName", false],
                ["last name", "no", "lastName", false],
            ])("%s should be only letters, spaces, apostrophes, dashes and between 2 - 30, value: %s", (label: string, value: string, fieldName: string, isValid: boolean) => {
                const { container } = renderPage();
                const nameInput = container.querySelector(`#${fieldName}`);
                userEvent.type(nameInput!, value);
                userEvent.tab();

                const errorsList = collectErrorElements(container);
                const expectErrorsListInnerHtml = expect(Array.from(errorsList).map((e) => e.innerHTML).join(""));
                if (isValid) {
                    expectErrorsListInnerHtml.not.toMatch(new RegExp(label, "i"));
                } else {
                    expectErrorsListInnerHtml.toMatch(new RegExp(label, "i"));
                }
            });
        });

        describe("date of birth", () => {
            const getInput = (container: HTMLElement) => ({
                day: container.querySelector("input[placeholder=DD]"),
                month: container.querySelector("input[placeholder=MM]"),
                year: container.querySelector("input[placeholder=YYYY]"),
            });

            const inputDate = (date: string, container: HTMLElement) => {
                const input = getInput(container);
                const [day, month, year] = date.split("-");

                userEvent.type(input.day!, day);
                userEvent.type(input.month!, month);
                userEvent.type(input.year!, year);
                userEvent.tab();
            };

            it.each([
                ["1-2-1900", true],
                ["91-22-1900", false],
                ["2-10-", false],
            ])("should be valid date: %s", (date: string, isValid: boolean) => {
                const { container } = renderPage();
                inputDate(date, container);

                const errorElements = collectErrorElements(container);
                const expectErrorElementsCount = expect(errorElements.length);

                if (isValid) {
                    expectErrorElementsCount.not.toBeGreaterThanOrEqual(1);
                } else {
                    expectErrorElementsCount.toBeGreaterThanOrEqual(1);
                }
            });

            it.each([
                ["1-12-1900", true],
                ["1-12-2005", false],
            ])("should be over 18 years %s", (birthDate: string, isValid) => {
                jest.useFakeTimers().setSystemTime(parseISO("2020-01-01T00:00:00.000Z"));

                const { container } = renderPage();
                inputDate(birthDate, container);

                const errorElements = collectErrorElements(container);
                const expectErrorElementsCount = expect(errorElements.length);

                if (isValid) {
                    expectErrorElementsCount.not.toBeGreaterThanOrEqual(1);
                } else {
                    expectErrorElementsCount.toBeGreaterThanOrEqual(1);
                }
            });
        });
    });
});
