import React, { useEffect, useState } from "react";
import RegisterFormHeader from "@src/components/register/form-header/RegisterFormHeader";
import RegisterContext, { RegisterPage } from "@src/contexts/register/RegisterContext";
import RegisterFormFooter from "@src/components/register/form-footer/RegisterFormFooter";
import { IUseValidationRule, ValidationStatus } from "@src/hooks/useValidation";

export interface IFormData {
    status: ValidationStatus;
    value?: string | number | boolean;
}

export type IRegisterLayoutState = ({ [fieldName: string]: IFormData });

export interface IRegisterLayoutProps {
    page: RegisterPage;
    formDefinitions?: { [fieldName: string]: IUseValidationRule[] };
}

const RegisterLayout: React.FC<IRegisterLayoutProps> = ({
    children,
    page,
    formDefinitions,
}) => {
    const [state, setState] = useState<IRegisterLayoutState>({});

    useEffect(() => {
        Object.keys(formDefinitions ?? {}).forEach((fieldName) => {
            if (!state[fieldName]) {
                setState({ ...state, [fieldName]: { status: ValidationStatus.Pending } });
            }
        });
    }, [formDefinitions, state]);

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
