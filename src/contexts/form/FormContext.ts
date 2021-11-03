import React from "react";
import { IUseValidationRule, ValidationStatus } from "@src/hooks/useValidation";
import {
    IRegisterLayoutState,
} from "@src/components/register/layout/RegisterLayout";

export interface IFormData {
    status: ValidationStatus;
    value?: string | number | boolean;
}

export type IFormDefinitions = {
    [fieldName: string]: (
        IUseValidationRule<string, IFormContext>
        | IUseValidationRule<number, IFormContext>
        | IUseValidationRule<boolean, IFormContext>
        | IUseValidationRule<string>
        | IUseValidationRule<number>
        | IUseValidationRule<boolean>
    )[] };

export interface IFormContext {
    data: IRegisterLayoutState;
    set: (fieldName: string) => (value: IFormData) => void;
    definitions: { [slice: string]: IFormDefinitions }
}

const FormContext = React.createContext<IFormContext>({
    definitions: {},
    data: {},
    set: () => () => {},
});

export default FormContext;
