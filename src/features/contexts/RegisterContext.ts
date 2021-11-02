import React from "react";
import {
  IFormDataValue,
  IRegisterLayoutState,
} from "@src/components/register/layout/RegisterLayout";

export interface IRegisterContext {
  formData: IRegisterLayoutState;
  set: (fieldName: string) => <T extends IFormDataValue>(value: T) => void;
}

const RegisterContext = React.createContext<IRegisterContext>({
  formData: {},
  set: (fieldName) => (value) => {},
});

export default RegisterContext;
