import { render } from "@testing-library/react";
import React from "react";
import RegisterContext, { RegisterPages } from "@src/contexts/register/RegisterContext";

describe("RegisterContext", () => {
    it("should have default page (account-details)", () => {
        const {
            container,
        } = render(<RegisterContext.Consumer>{(props) => JSON.stringify(props)}</RegisterContext.Consumer>);

        expect(container.textContent).toMatch(new RegExp(RegisterPages.AccountDetails, "i"));
    });
});
