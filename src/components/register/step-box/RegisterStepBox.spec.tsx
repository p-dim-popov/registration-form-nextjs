import React from "react";
import { render, screen } from "@testing-library/react";
import RegisterStepBox from "@src/components/register/step-box/RegisterStepBox";
import RegisterContext, {
    getRegisterPageContextDefaultValue,
    IRegisterContext,
    RegisterPage,
} from "@src/contexts/register/RegisterContext";
import userEvent from "@testing-library/user-event";
import Rule from "@src/features/rule-creators/ruleCreators";

const routePushMock = jest.fn();
jest.mock("next/router", () => ({
    useRouter: () => ({
        push: routePushMock,
    }),
}));

afterEach(() => {
    jest.resetAllMocks();
});

describe("RegisterStepBox", () => {
    it("should render div with role button", () => {
        const { container } = render(<RegisterStepBox forPage={RegisterPage.UserDetails}>2</RegisterStepBox>);
        const box = container.querySelector("div");
        expect(box).toBeInTheDocument();
        expect(box).toHaveClass("cursor-pointer");
    });

    it("should have title and box content", () => {
        render(<RegisterStepBox forPage={RegisterPage.UserDetails} title="Account Details">1</RegisterStepBox>);

        expect(screen.queryByText("Account Details")).toBeInTheDocument();
        expect(screen.queryByText("1")).toBeInTheDocument();
    });

    it.each([
        // [RegisterPage.AccountDetails],
        [RegisterPage.UserDetails],
        [RegisterPage.ContactDetails],
    ])("should have state from provider - %s", (page: RegisterPage) => {
        const data = getRegisterPageContextDefaultValue();
        data.page = page;
        const { container } = render(
            <RegisterContext.Provider
                value={data}
            >
                <RegisterStepBox title="TEST" forPage={RegisterPage.UserDetails}>1</RegisterStepBox>
            </RegisterContext.Provider>,
        );

        const expectWrapper = expect(container.firstElementChild?.firstElementChild);
        switch (page) {
            // TODO: check if step is valid/completed and mark it green
            // case RegisterPage.AccountDetails:
            //     expectWrapper.toHaveClass("bg-green");
            //     break;
            case RegisterPage.UserDetails:
                expectWrapper.toHaveClass(..."bg-gray-700 text-white".split(" "));
                break;
            case RegisterPage.ContactDetails:
                expectWrapper.toHaveClass(..."bg-gray-300 text-gray-400".split(" "));
                break;
            default:
                throw Error();
        }
    });

    it("should navigate through click", () => {
        const data = getRegisterPageContextDefaultValue();
        data.page = RegisterPage.ContactDetails;
        const { container } = render(
            <RegisterContext.Provider
                value={data}
            >
                <RegisterStepBox title="TEST" forPage={RegisterPage.UserDetails}>1</RegisterStepBox>
            </RegisterContext.Provider>,
        );

        const button = container.querySelector(".cursor-pointer");
        userEvent.click(button!);

        expect(routePushMock).toBeCalledWith(RegisterPage.UserDetails);
    });

    it("should validate past not active steps", () => {
        const data = getRegisterPageContextDefaultValue();
        data.page = RegisterPage.AccountDetails;
        data.definitions[RegisterPage.UserDetails] = {
            age: [Rule<string | number | boolean | undefined>().isRequired],
        };
        data.data.age = "123";

        render(
            <RegisterContext.Provider value={data}>
                <RegisterStepBox title="TEST" forPage={RegisterPage.UserDetails}>TEST-STEP</RegisterStepBox>
            </RegisterContext.Provider>,
        );

        const circleElement = screen.getByText("TEST-STEP");

        expect(circleElement).toBeInTheDocument();
        expect(circleElement).toHaveClass(..."bg-blue-200".split(" "));
    });
});
