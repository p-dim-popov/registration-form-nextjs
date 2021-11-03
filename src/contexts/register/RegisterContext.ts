import React from "react";
import { IFormContext, IFormDefinitions } from "@src/contexts/form/FormContext";

export interface IRegisterContext extends IFormContext {
    page: RegisterPage;
    definitions: { [page in RegisterPage]?: IFormDefinitions }
}

export enum RegisterPage {
    AccountDetails = "/register/account-details",
    ContactDetails = "/register/contact-details",
    UserDetails = "/register/user-details",
}

const RegisterContext = React.createContext<IRegisterContext>({
    data: {},
    set: () => () => {},
    page: RegisterPage.AccountDetails,
    definitions: {},
});

RegisterContext.displayName = "RegisterContext";

export default RegisterContext;
