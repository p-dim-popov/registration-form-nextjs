import React from "react";
import { render, screen } from "@testing-library/react";
import RegisterLayout from "@src/components/register/layout/RegisterLayout";
import { RegisterPage } from "@src/contexts/register/RegisterContext";

describe("Layout", () => {
    it("should have 3 navigation buttons, 1 submit button, contact us link and children", () => {
        render(<RegisterLayout page={RegisterPage.AccountDetails}>CHILDREN</RegisterLayout>);

        const navigationButtons = screen.queryAllByText(/[123]/);
        expect(navigationButtons).toHaveLength(3);

        const submitButton = screen.queryByText(/continue/i);
        expect(submitButton).toBeInTheDocument();

        const contactUsLink = screen.queryByText(/contact us/i);
        expect(contactUsLink).toBeInTheDocument();
    });

    it("should have form borders on lg devices and gradient bg", () => {
        const { container } = render(<RegisterLayout page={RegisterPage.AccountDetails} />);
        const wrapperDiv = container.firstElementChild;
        expect(wrapperDiv).toHaveClass(..."lg:bg-gradient-to-b from-blue-100 to-blue-50 bg-blue-100 flex items-center justify-center bg-white".split(" "));

        const headerFormFooterSection = wrapperDiv?.firstElementChild;
        expect(headerFormFooterSection).toHaveClass(..."lg:rounded-3xl lg:m-15 bg-white lg:max-w-2xl lg:mt-5 p-20".split(" "));

        const formSection = headerFormFooterSection?.querySelector("section:nth-child(2)");
        expect(formSection).toHaveClass(..."flex flex-col items-center".split(" "));
    });

    it("should have star image", () => {
        const { container } = render(<RegisterLayout page={RegisterPage.AccountDetails} />);

        expect(container.querySelector("img")).toBeInTheDocument();
    });
});
