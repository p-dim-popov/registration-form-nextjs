import { render } from "@testing-library/react";
import React from "react";
import RegisterContext, { RegisterPages } from "@src/features/contexts/register-context/RegisterContext";

describe("RegisterContext", () => {
  it("should have default page (account-details)", () => {
    const {
      container,
    } = render(<RegisterContext.Consumer>{(props) => JSON.stringify(props)}</RegisterContext.Consumer>);

    expect(container.textContent).toMatch(new RegExp(RegisterPages.AccountDetails, "i"));
  });
});
