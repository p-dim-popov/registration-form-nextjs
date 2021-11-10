import React from "react";
import { IUseValidationRule, ValidationStatus } from "@src/hooks/useValidation/useValidation";

export type IFormDefinitions<T, TContext extends IFormContext<T>> = {
    [fieldName: string]: IUseValidationRule<T, TContext>[]
};

export type IFormData<T> = ({ [fieldName: string]: T });

export interface IFormContext<T> {
    data: IFormData<T>;
    set: (fieldName: string) => (value: T) => void;
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

export const FormContextProvider = FormContext.Provider;
export const FormContextConsumer = FormContext.Consumer;

FormContext.displayName = "FormContext";

export default FormContext;
