import React from "react";
import { IFormContext, IFormDefinitions } from "@src/contexts/form/FormContext";

export interface IRegisterContext extends IFormContext<string | number | boolean | undefined> {
    page: RegisterPage;
    definitions: { [page in RegisterPage]?: IFormDefinitions<string | number | boolean | undefined, IFormContext<string | number | boolean | undefined>> }
}

export enum RegisterPage {
    AccountDetails = "/register/account-details",
    ContactDetails = "/register/contact-details",
    UserDetails = "/register/user-details",
}

export const RegisterPagesOrder = [
    RegisterPage.AccountDetails,
    RegisterPage.UserDetails,
    RegisterPage.ContactDetails,
];

export const getNextRegisterPage = (page?: RegisterPage): RegisterPage | "" => RegisterPagesOrder[(!page ? -1 : RegisterPagesOrder.indexOf(page)) + 1] ?? "";

export const getRegisterPageContextDefaultValue = (): IRegisterContext => ({
    data: {},
    set: () => () => {},
    page: RegisterPage.AccountDetails,
    definitions: {},
    setDefinitionFor: () => () => {},
    getDefinitionFor: () => [],
});

const RegisterContext = React.createContext<IRegisterContext>(getRegisterPageContextDefaultValue());

RegisterContext.displayName = "RegisterContext";

export const RegisterContextProvider = RegisterContext.Provider;
export const RegisterContextConsumer = RegisterContext.Consumer;

export default RegisterContext;
