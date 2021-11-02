import React from "react";
import { render, screen } from "@testing-library/react";
import AccountDetails from "@src/pages/register/account-details";

describe("AccountDetails", () => {
  it("should display email & password fields, security questions section and marketing preferences", () => {
    render(<AccountDetails />);
    expect(screen.queryByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.queryByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.queryByText(/security questions/i)).toBeInTheDocument();
    expect(screen.queryByText(/marketing preferences/i)).toBeInTheDocument();
  });
});
