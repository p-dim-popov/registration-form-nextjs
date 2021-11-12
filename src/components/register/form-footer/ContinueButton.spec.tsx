import {
    getNextRegisterPage,
    getRegisterPageContextDefaultValue,
    RegisterContextProvider,
} from "@src/contexts/register/RegisterContext";
import { render } from "@testing-library/react";
import RegisterFormFooter from "@src/components/register/form-footer/RegisterFormFooter";
import userEvent from "@testing-library/user-event";
import React from "react";

const onClickMock = jest.fn();
jest.mock("next/link", () => ({
    default: (({ children, href }) => {
        onClickMock(href);
        return <>{children}</>;
    }) as React.FC<{ href: string }>,
    __esModule: true,
}));

afterEach(() => {
    jest.resetAllMocks();
});

describe("ContinueButton", () => {
    it("should navigate to next register page", () => {
        const data = getRegisterPageContextDefaultValue();
        const initialPage = data.page;
        const { container } = render(
            <RegisterContextProvider value={data}>
                <RegisterFormFooter />
            </RegisterContextProvider>,
        );
        const button = container.querySelector("a");

        userEvent.click(button!);

        expect(onClickMock).toBeCalledWith(getNextRegisterPage(initialPage));
    });
});
