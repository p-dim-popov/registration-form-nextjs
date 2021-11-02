import React from "react";
import { render, screen } from "@testing-library/react";
import ContactDetails from "@src/pages/register/contact-details";

describe("ContactDetails", () => {
    it("should have items", () => {
        render(<ContactDetails />);

        expect(screen.queryByText(/one last thing/i)).toBeInTheDocument();
        expect(screen.queryByText(/i confirm that:/i)).toBeInTheDocument();
    });
});
