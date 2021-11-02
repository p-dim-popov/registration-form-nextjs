import React from "react";
import { render, screen } from "@testing-library/react";
import UserDetails from "@src/pages/register/user-details";

describe("UserDetails", () => {
    it("should show items", () => {
        render(<UserDetails />);
        expect(screen.queryAllByPlaceholderText(/(first|last) name/i)).toHaveLength(2);
        screen.queryAllByText(/gender/i).forEach((el) => expect(el).toBeInTheDocument());
    });
});
