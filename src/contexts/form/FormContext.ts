import React from "react";
import { IUseValidationRule, ValidationStatus } from "@src/hooks/useValidation/useValidation";

export interface IFormDataValue<T> {
    status: ValidationStatus;
    value?: T;
}

export type IFormDefinitions<T, TContext extends IFormContext<T>> = {
    [fieldName: string]: IUseValidationRule<T, TContext>[]
};

export type IFormData<T> = ({ [fieldName: string]: IFormDataValue<T> });

export interface IFormContext<T> {
    data: IFormData<T>;
    set: (fieldName: string) => (value: IFormDataValue<T>) => void;
    definitions: { [slice: string]: IFormDefinitions<T, IFormContext<T>> };
    setDefinitionFor: (fieldName: string) => (definition: IUseValidationRule<T, IFormContext<T>>[]) => void;
    getDefinitionFor: (fieldName: string) => IUseValidationRule<T, IFormContext<T>>[] | undefined,
}

export const getFormContextDefaultValue = <T>(): IFormContext<T> => ({
    definitions: {},
    data: {},
    set: () => () => {},
    setDefinitionFor: () => () => {},
    getDefinitionFor: () => [],
});

const FormContext = React.createContext<IFormContext<any>>(getFormContextDefaultValue());

export default FormContext;
