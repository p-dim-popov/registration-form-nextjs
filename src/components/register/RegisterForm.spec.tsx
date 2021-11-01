import React from "react";
import { render, screen } from "@testing-library/react";
import RegisterForm from "@src/components/register/RegisterForm";

describe("RegisterForm", () => {
  it("should show register text", () => {
    render(<RegisterForm />);

    const element = screen.queryByText(/register/i);
    expect(element).toBeInTheDocument();
  });
});
