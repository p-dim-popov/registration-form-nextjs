import React from "react";
import { render, screen } from "@testing-library/react";
import RegisterFormHeader from "@src/components/register/RegisterFormHeader/RegisterFormHeader";

describe("RegisterFormHeader", () => {
    it("should have three buttons", () => {
        render(<RegisterFormHeader />);

        const buttons = screen.queryAllByText(/[123]/i);
        expect(buttons).toHaveLength(3);
    });
});
