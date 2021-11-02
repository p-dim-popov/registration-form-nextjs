import { render, screen } from "@testing-library/react";
import React from "react";
import Form from "./Form";

describe("Form", () => {
    it.each([
        ["TEST"],
        [(
            <>
                <label htmlFor="test">
                    TEST
                    <input name="test" />
                </label>
            </>
        )],
    ])("should render children", (children) => {
        render(<Form>{children}</Form>);

        const element = screen.queryByText("TEST");
        expect(element).toBeInTheDocument();
    });
});
