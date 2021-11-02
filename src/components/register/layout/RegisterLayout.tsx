import React, { useState } from "react";
import RegisterFormHeader from "@src/components/register/RegisterFormHeader/RegisterFormHeader";
import RegisterContext, { RegisterPages } from "@src/features/contexts/register-context/RegisterContext";

export type IFormDataValue = string | number | boolean;
export type IRegisterLayoutState = ({ [fieldName: string]: IFormDataValue });

export interface IRegisterLayoutProps {
  page: RegisterPages;
}

// declared as function to be used generic (eslint breaks if arrow is used/mistaken for JSX)
function RegisterLayout<TFormState extends IRegisterLayoutState>({
  children,
  page,
}: React.PropsWithChildren<IRegisterLayoutProps>) {
  const [state, setState] = useState<TFormState>({} as unknown as TFormState);

  return (
    <RegisterContext.Provider
      value={{
        formData: state,
        set: (fieldName) => (value) => setState({ ...state, [fieldName]: value }),
        page,
      }}
    >
      <RegisterFormHeader />
      {children}
      <button type="button">Continue</button>
      {/* This is intended to be opened as external link */}
      <a target="_blank" href="/contact-us">Contact us</a>
    </RegisterContext.Provider>
  );
}

export default RegisterLayout;
