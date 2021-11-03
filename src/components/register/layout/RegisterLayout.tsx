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

export type IFormDefinitions = { [fieldName: string]: IUseValidationRule<any>[] };

export interface IRegisterLayoutProps {
    page: RegisterPage;
    formDefinitions?: IFormDefinitions;
}

const RegisterLayout: React.FC<IRegisterLayoutProps> = ({
    children,
    page,
    formDefinitions,
}) => {
    const [formData, setFormData] = useState<IRegisterLayoutState>({});
    const [
        allFormDefinitions, setAllFormDefinitions,
    ] = useState<{ [page in RegisterPage]?: IFormDefinitions }>({});

    useEffect(() => {
        if (formDefinitions && !allFormDefinitions[page]) {
            setAllFormDefinitions({ ...allFormDefinitions, [page]: formDefinitions });
        }
    }, [allFormDefinitions, formDefinitions, page]);

    useEffect(() => {
        Object.keys(formDefinitions ?? {}).forEach((fieldName) => {
            if (!formData[fieldName]) {
                setFormData({ ...formData, [fieldName]: { status: ValidationStatus.Pending } });
            }
        });
    }, [formDefinitions, formData]);

    return (
        <RegisterContext.Provider
            value={{
                formData,
                set: (fieldName) => (value) => setFormData({ ...formData, [fieldName]: value }),
                page,
                allFormDefinitions,
            }}
        >
            <RegisterFormHeader />
            {children}
            <RegisterFormFooter />
        </RegisterContext.Provider>
    );
};

export default RegisterLayout;
