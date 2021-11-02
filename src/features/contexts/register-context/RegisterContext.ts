import React from "react";
import {
  IFormDataValue,
  IRegisterLayoutState,
} from "@src/components/register/layout/RegisterLayout";

export interface IRegisterContext {
  formData: IRegisterLayoutState;
  set: (fieldName: string) => <T extends IFormDataValue>(value: T) => void;
  page: RegisterPages;
}

export enum RegisterPages {
  AccountDetails = "AccountDetails",
  ContactDetails = "ContactDetails",
  UserDetails = "UserDetails",
}

const RegisterContext = React.createContext<IRegisterContext>({
  formData: {},
  set: (fieldName) => (value) => {},
  page: RegisterPages.AccountDetails,
});

export default RegisterContext;
