import React from "react";
import { render, screen } from "@testing-library/react";
import UserDetails from "@src/pages/register/user-details";
import userEvent from "@testing-library/user-event";

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
                const getLayout = UserDetails.getLayout || ((page) => page);
                const Page = getLayout(<UserDetails />);
                const { container } = render(Page);
                const nameInput = container.querySelector(`#${fieldName}`);
                userEvent.type(nameInput!, value);
                userEvent.tab();

                const errorsList = container.querySelectorAll("ul li em");
                const expectErrorsListInnerHtml = expect(Array.from(errorsList).map((e) => e.innerHTML).join(""));
                if (isValid) {
                    expectErrorsListInnerHtml.not.toMatch(new RegExp(label, "i"));
                } else {
                    expectErrorsListInnerHtml.toMatch(new RegExp(label, "i"));
                }
            });
        });
    });
});
