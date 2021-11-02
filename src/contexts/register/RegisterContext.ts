import React from "react";
import {
    IFormDataValue,
    IRegisterLayoutState,
} from "@src/components/register/layout/RegisterLayout";

export interface IRegisterContext {
    formData: IRegisterLayoutState;
    set: (fieldName: string) => <T extends IFormDataValue>(value: T) => void;
    page: RegisterPage;
}

export enum RegisterPage {
    AccountDetails = "/register/account-details",
    ContactDetails = "/register/contact-details",
    UserDetails = "/register/user-details",
}

const RegisterContext = React.createContext<IRegisterContext>({
    formData: {},
    set: (fieldName) => (value) => {},
    page: RegisterPage.AccountDetails,
});

export default RegisterContext;
