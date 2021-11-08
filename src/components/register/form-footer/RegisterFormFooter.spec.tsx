import React from "react";
import { render } from "@testing-library/react";
import RegisterFormFooter from "@src/components/register/form-footer/RegisterFormFooter";
import userEvent from "@testing-library/user-event";
import {
    getNextRegisterPage,
    getRegisterPageContextDefaultValue,
    RegisterContextProvider,
} from "@src/contexts/register/RegisterContext";

const routePushMock = jest.fn();
jest.mock("next/router", () => ({
    useRouter: () => ({
        push: routePushMock,
    }),
}));

afterEach(() => {
    jest.resetAllMocks();
});

describe("RegisterFormFooter", () => {
    it("should have continue button and contact us link separated by line", () => {
        const { container } = render(<RegisterFormFooter />);

        const button = container.querySelector("button");
        expect(button).toBeInTheDocument();
        const separator = button!.nextElementSibling;
        expect(separator).toBeInstanceOf(HTMLDivElement);
        expect(separator).toHaveClass("border-t-2 border-gray-200 min-w-full self-baseline my-8");
        expect(separator).toBeInTheDocument();
        expect(button!.nextElementSibling).toBeInTheDocument();
        expect(container.querySelector("a")).toBeInTheDocument();
    });

    describe("continue button", () => {
        it("should navigate to next register page", () => {
            const data = getRegisterPageContextDefaultValue();
            const initialPage = data.page;
            const { container } = render(
                <RegisterContextProvider value={data}>
                    <RegisterFormFooter />
                </RegisterContextProvider>,
            );
            const button = container.querySelector("button");

            userEvent.click(button!);

            expect(routePushMock).toBeCalledWith(getNextRegisterPage(initialPage));
        });
    });
});
