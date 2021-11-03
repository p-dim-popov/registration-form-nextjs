import React from "react";
import {
    IFormData, IFormDefinitions,
    IRegisterLayoutState,
} from "@src/components/register/layout/RegisterLayout";

export interface IRegisterContext {
    formData: IRegisterLayoutState;
    set: (fieldName: string) => (value: IFormData) => void;
    page: RegisterPage;
    allFormDefinitions: { [page in RegisterPage]?: IFormDefinitions }
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
    allFormDefinitions: {},
});

export default RegisterContext;
