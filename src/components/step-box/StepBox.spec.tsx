import React from "react";
import { render, screen } from "@testing-library/react";
import StepBox from "@src/components/step-box/StepBox";
import RegisterContext, {
    IRegisterContext,
    RegisterPage,
} from "@src/contexts/register/RegisterContext";
import userEvent from "@testing-library/user-event";

const routePushMock = jest.fn();
jest.mock("next/router", () => ({
    useRouter: () => ({
        push: routePushMock,
    }),
}));

afterEach(() => {
    jest.resetAllMocks();
});

describe("StepBox", () => {
    it("should render div with role button", () => {
        const { container } = render(<StepBox forPage={RegisterPage.UserDetails}>2</StepBox>);
        const box = container.querySelector("div");
        expect(box).toBeInTheDocument();
        expect(box).toHaveClass("cursor-pointer");
    });

    it("should have title and box content", () => {
        render(<StepBox forPage={RegisterPage.UserDetails} title="Account Details">1</StepBox>);

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
                <StepBox title="TEST" forPage={RegisterPage.UserDetails}>1</StepBox>
            </RegisterContext.Provider>,
        );

        const expectWrapper = expect(container.firstElementChild?.firstElementChild);
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

    it("should navigate through click", () => {
        const { container } = render(
            <RegisterContext.Provider
                value={{ page: RegisterPage.ContactDetails } as IRegisterContext}
            >
                <StepBox title="TEST" forPage={RegisterPage.UserDetails}>1</StepBox>
            </RegisterContext.Provider>,
        );

        const button = container.querySelector(".cursor-pointer");
        userEvent.click(button!);

        expect(routePushMock).toBeCalledWith(RegisterPage.UserDetails);
    });
});
