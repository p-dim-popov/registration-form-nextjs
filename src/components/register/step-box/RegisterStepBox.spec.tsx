import React from "react";
import { render, screen } from "@testing-library/react";
import RegisterStepBox from "@src/components/register/step-box/RegisterStepBox";
import RegisterContext, {
    getRegisterPageContextDefaultValue,
    RegisterPage,
} from "@src/contexts/register/RegisterContext";
import userEvent from "@testing-library/user-event";
import describeField, { isRequired } from "@src/features/rule-creators/FieldDescriptor";
import { IUseValidationRule } from "@src/hooks/useValidation/useValidation";

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

    it.each([
        [describeField({ rules: [[isRequired]] }), "123"],
        [describeField({ rules: [[isRequired]] }), undefined],
        [undefined, undefined],
    ])("should validate visited not active steps: %s %s", (rule?, value?: string) => {
        const data = getRegisterPageContextDefaultValue();
        data.page = RegisterPage.AccountDetails;
        if (rule) {
            data.definitions[RegisterPage.UserDetails] = {
                // I know I pass undefined value
                // @ts-ignore
                age: [rule],
            };
        }

        if (value) {
            data.data.age = value;
        }

        render(
            <RegisterContext.Provider value={data}>
                <RegisterStepBox title="TEST" forPage={RegisterPage.UserDetails}>TEST-STEP</RegisterStepBox>
            </RegisterContext.Provider>,
        );

        const circleElement = screen.getByText("TEST-STEP");

        expect(circleElement).toBeInTheDocument();

        const expectCircleElement = expect(circleElement);
        if (rule && value) {
            expectCircleElement.toHaveClass(..."bg-green-200".split(" "));
        } else if (rule && !value) {
            expectCircleElement.toHaveClass(..."bg-red-200".split(" "));
        } else if (!rule && !value) {
            expectCircleElement.toHaveClass(..."bg-gray-300 text-gray-400".split(" "));
        }
    });
});
