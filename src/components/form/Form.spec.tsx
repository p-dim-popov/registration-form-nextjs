import { render, screen } from "@testing-library/react";
import React from "react";
import Form from "./Form";

describe("Form", () => {
    it.each([
        ["TEST"],
    ])("should render children", (children) => {
        render(<Form>{children}</Form>);

        const element = screen.queryByText("TEST");
        expect(element).toBeInTheDocument();
    });
});
