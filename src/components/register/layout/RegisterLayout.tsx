import React, { useState } from "react";
import RegisterFormHeader from "@src/components/register/form-header/RegisterFormHeader";
import RegisterContext, { RegisterPages } from "@src/contexts/register/RegisterContext";
import RegisterFormFooter from "@src/components/register/form-footer/RegisterFormFooter";

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
            <RegisterFormFooter />
        </RegisterContext.Provider>
    );
}

export default RegisterLayout;
