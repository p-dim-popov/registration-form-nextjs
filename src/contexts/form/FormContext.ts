import React from "react";
import { IUseValidationRule, ValidationStatus } from "@src/hooks/useValidation/useValidation";
import {
    IRegisterLayoutState,
} from "@src/components/register/layout/RegisterLayout";

export interface IFormData {
    status: ValidationStatus;
    value?: string | number | boolean;
}

export type IFormDefinitions<T> = {
    [fieldName: string]: IUseValidationRule<T>[]
};

export interface IFormContext {
    data: IRegisterLayoutState;
    set: (fieldName: string) => (value: IFormData) => void;
    definitions: { [slice: string]: IFormDefinitions<any> };
    setDefinitionFor: <T> (fieldName: string) => (definition: IUseValidationRule<T>[]) => void;
    getDefinitionFor: <T> (fieldName: string) => IUseValidationRule<T>[],
}

const FormContext = React.createContext<IFormContext>({
    definitions: {},
    data: {},
    set: () => () => {},
    setDefinitionFor: () => () => {},
    getDefinitionFor: () => [],
});

export default FormContext;
