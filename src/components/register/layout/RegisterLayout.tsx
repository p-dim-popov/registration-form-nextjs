import React, { useEffect, useState } from "react";
import RegisterFormHeader from "@src/components/register/form-header/RegisterFormHeader";
import RegisterContext, {
    RegisterPage,
} from "@src/contexts/register/RegisterContext";
import RegisterFormFooter from "@src/components/register/form-footer/RegisterFormFooter";
import { ValidationStatus } from "@src/hooks/useValidation/useValidation";
import { IFormData, IFormDefinitions } from "@src/contexts/form/FormContext";

export type IRegisterLayoutState = ({ [fieldName: string]: IFormData });

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
        allPagesFormDefinitions, setAllPagesFormDefinitions,
    ] = useState<{ [page in RegisterPage]?: IFormDefinitions }>({});

    useEffect(() => {
        if (formDefinitions && !allPagesFormDefinitions[page]) {
            setAllPagesFormDefinitions({ ...allPagesFormDefinitions, [page]: formDefinitions });
        }
    }, [allPagesFormDefinitions, formDefinitions, page]);

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
                data: formData,
                set: (fieldName) => (value) => setFormData({ ...formData, [fieldName]: value }),
                page,
                definitions: allPagesFormDefinitions,
            }}
        >
            <RegisterFormHeader />
            {children}
            <RegisterFormFooter />
        </RegisterContext.Provider>
    );
};

export default RegisterLayout;
