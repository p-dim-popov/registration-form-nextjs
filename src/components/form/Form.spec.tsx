import { render, screen } from "@testing-library/react";
import React from "react";
import Form from "./Form";

describe("Form", () => {
  it("should render children", () => {
    render(<Form>TEST</Form>);

    const element = screen.queryByText("TEST");
    expect(element).toBeInTheDocument();
  });
});
