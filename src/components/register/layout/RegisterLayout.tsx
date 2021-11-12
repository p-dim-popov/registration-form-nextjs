import React, { useCallback, useEffect, useState } from "react";
import RegisterFormHeader from "@src/components/register/form-header/RegisterFormHeader";
import RegisterContext, {
    IRegisterContext,
    RegisterPage,
} from "@src/contexts/register/RegisterContext";
import RegisterFormFooter from "@src/components/register/form-footer/RegisterFormFooter";
import FormContext, {
    IFormContext,
    IFormDefinitions,
    IFormData,
} from "@src/contexts/form/FormContext";
import { IUseValidationRule } from "@src/hooks/useValidation/useValidation";
import Image from "next/image";
import starSmiling from "@public/star-smiling.png";

export interface IRegisterLayoutProps {
    page: RegisterPage;
}

const RegisterLayout: React.FC<IRegisterLayoutProps> = ({
    children,
    page,
}) => {
    const [formData, setFormData] = useState<IFormData<string | number | boolean | undefined>>({});
    const [
        allPagesFormDefinitions, setAllPagesFormDefinitions,
    ] = useState<{ [page in RegisterPage]?: IFormDefinitions<string | number | boolean | undefined, IFormContext<string | number | boolean | undefined>> }>({});

    useEffect(() => {
        if (!allPagesFormDefinitions[page]) {
            setAllPagesFormDefinitions((prevAllPagesFormDefinitions) => ({
                ...prevAllPagesFormDefinitions,
                [page]: {},
            }));
        }
    }, [allPagesFormDefinitions, page]);

    const setDefinitionFor = useCallback((fieldName) => (
        rules: IUseValidationRule<string | number | boolean | undefined, IRegisterContext>[],
    ) => setAllPagesFormDefinitions((prevAllPagesFormDefinitions) => ({
        ...prevAllPagesFormDefinitions,
        [page]: {
            ...prevAllPagesFormDefinitions[page],
            [fieldName]: rules,
        },
    })), [page]);

    const getDefinitionFor = useCallback((
        fieldName: string,
    ) => allPagesFormDefinitions[page]?.[fieldName], [allPagesFormDefinitions, page]);

    return (
        <div className="lg:bg-gradient-to-b from-blue-100 to-blue-50 bg-blue-100 flex items-center justify-center bg-white">
            <Image alt="star smiling" src={starSmiling} width={75} height={75} className="border rounded-full shadow-inner cursor-grab" />
            <RegisterContext.Provider
                value={{
                    data: formData,
                    set: (fieldName) => (value) => setFormData({ ...formData, [fieldName]: value }),
                    page,
                    definitions: allPagesFormDefinitions,
                    setDefinitionFor,
                    getDefinitionFor,
                }}
            >
                <div className="lg:rounded-3xl lg:m-15 bg-white lg:max-w-2xl lg:mt-5 p-20">
                    <RegisterFormHeader />
                    <section className="flex flex-col items-center">
                        <RegisterContext.Consumer>
                            {(value) => (
                                <FormContext.Provider value={value}>
                                    {children}
                                </FormContext.Provider>
                            )}
                        </RegisterContext.Consumer>
                    </section>
                    <RegisterFormFooter />
                </div>
            </RegisterContext.Provider>
        </div>
    );
};

export default RegisterLayout;
