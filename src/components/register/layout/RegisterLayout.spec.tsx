import React from "react";
import { render, screen } from "@testing-library/react";
import RegisterLayout from "@src/components/register/layout/RegisterLayout";
import { RegisterPages } from "@src/contexts/register-context/RegisterContext";

describe("Layout", () => {
    it("should have 3 navigation buttons, 1 submit button, contact us link and children", () => {
        render(<RegisterLayout page={RegisterPages.AccountDetails}>CHILDREN</RegisterLayout>);

        const navigationButtons = screen.queryAllByText(/[123]/);
        expect(navigationButtons).toHaveLength(3);

        const submitButton = screen.queryByText(/continue/i);
        expect(submitButton).toBeInTheDocument();

        const contactUsLink = screen.queryByText(/contact us/i);
        expect(contactUsLink).toBeInTheDocument();
    });
});
