import React from "react";
import { render, screen } from "@testing-library/react";
import Register from "@src/pages/register";

describe("Register", () => {
  it("should have begin button", () => {
    render(<Register />);

    expect(screen.queryByText(/begin/i)).toBeInTheDocument();
  });
});
