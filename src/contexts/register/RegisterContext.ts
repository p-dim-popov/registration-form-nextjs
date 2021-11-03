import React from "react";
import {
    IFormData,
    IRegisterLayoutState,
} from "@src/components/register/layout/RegisterLayout";

export interface IRegisterContext {
    formData: IRegisterLayoutState;
    set: (fieldName: string) => (value: IFormData) => void;
    page: RegisterPage;
}

export enum RegisterPage {
    AccountDetails = "/register/account-details",
    ContactDetails = "/register/contact-details",
    UserDetails = "/register/user-details",
}

const RegisterContext = React.createContext<IRegisterContext>({
    formData: {},
    set: () => () => {},
    page: RegisterPage.AccountDetails,
});

export default RegisterContext;
