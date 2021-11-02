import React, { useState } from "react";
import RegisterFormHeader from "@src/components/register/RegisterFormHeader/RegisterFormHeader";
import RegisterContext from "@src/features/contexts/register-context/RegisterContext";

export type IFormDataValue = string | number | boolean;
export type IRegisterLayoutState = ({ [fieldName: string]: IFormDataValue });

// declared as function to be used generic (eslint breaks if arrow is used/mistaken for JSX)
function RegisterLayout<TProps, TFormState extends IRegisterLayoutState>({
  children,
}: React.PropsWithChildren<TProps>) {
  const [state, setState] = useState<TFormState>({} as unknown as TFormState);

  return (
    <RegisterContext.Provider
      value={{
        formData: state,
        set: (fieldName) => (value) => setState({ ...state, [fieldName]: value }),
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
