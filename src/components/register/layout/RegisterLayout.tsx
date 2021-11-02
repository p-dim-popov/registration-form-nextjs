import React, { useReducer } from "react";
import RegisterFormHeader from "@src/components/register/RegisterFormHeader";
import RegisterContext from "@src/features/contexts/RegisterContext";

export type IFormDataValue = string | number | boolean;
export type IRegisterLayoutState = { [name: string]: IFormDataValue };

// declared as function to be used generic (eslint breaks if arrow is used/mistaken for JSX)
function RegisterLayout<T>({ children }: React.PropsWithChildren<T>) {
  const [state, setState] = useReducer(
    (prevState: IRegisterLayoutState = {}, action: IRegisterLayoutState) => ({
      ...prevState,
      ...action,
    }),
    {},
  );

  return (
    <RegisterContext.Provider
      value={{
        formData: state,
        set: (fieldName) => (value) => setState({ [fieldName]: value }),
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
