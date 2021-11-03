import React, { useState } from "react";
import RegisterFormHeader from "@src/components/register/form-header/RegisterFormHeader";
import RegisterContext, { RegisterPage } from "@src/contexts/register/RegisterContext";
import RegisterFormFooter from "@src/components/register/form-footer/RegisterFormFooter";
import { ValidationStatus } from "@src/hooks/useValidation";

export interface IFormData {
    value: string | number | boolean;
    status: ValidationStatus;
}

export type IRegisterLayoutState = ({ [fieldName: string]: IFormData });

export interface IRegisterLayoutProps {
    page: RegisterPage;
}

const RegisterLayout: React.FC<IRegisterLayoutProps> = ({
    children,
    page,
}) => {
    const [state, setState] = useState<IRegisterLayoutState>({});

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
};

export default RegisterLayout;
