import React from "react";
import { render, screen } from "@testing-library/react";
import StepBox from "@src/components/step-box/StepBox";
import RegisterContext, {
    IRegisterContext,
    RegisterPage,
} from "@src/contexts/register/RegisterContext";

describe("StepBox", () => {
    it("should render div with role button", () => {
        const { container } = render(<StepBox forPage={RegisterPage.UserDetails} />);
        const box = container.querySelector("div");
        expect(box).toBeInTheDocument();
        expect(box).toHaveClass("cursor-pointer");
    });

    it("should have title and box content", () => {
        render(<StepBox forPage={RegisterPage.UserDetails} title="Account Details" boxContent="1" />);

        expect(screen.queryByText("Account Details")).toBeInTheDocument();
        expect(screen.queryByText("1")).toBeInTheDocument();
    });

    it.each([
        // [RegisterPage.AccountDetails],
        [RegisterPage.UserDetails],
        [RegisterPage.ContactDetails],
    ])("should have state from provider - %s", (page: RegisterPage) => {
        const { container } = render(
            <RegisterContext.Provider
                value={{ page } as IRegisterContext}
            >
                <StepBox boxContent="1" title="TEST" forPage={RegisterPage.UserDetails} />
            </RegisterContext.Provider>,
        );

        const expectWrapper = expect(container.firstElementChild);
        switch (page) {
            // TODO: check if step is valid/completed and mark it green
            // case RegisterPage.AccountDetails:
            //     expectWrapper.toHaveClass("bg-green");
            //     break;
            case RegisterPage.UserDetails:
                expectWrapper.toHaveClass("bg-blue");
                break;
            case RegisterPage.ContactDetails:
                expectWrapper.toHaveClass("bg-gray");
                break;
            default:
                throw Error();
        }
    });
});
