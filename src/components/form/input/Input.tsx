import React from "react";
import { IUseValidationOptions } from "@src/hooks/useValidation";

export interface IInputProps<T> {
    id: string;
    label?: string;
    validation?: IUseValidationOptions<T>;
    showValidationStatus?: boolean;
}

function Input<T>(props: React.PropsWithChildren<IInputProps<T>>) {
    return <input />;
}

export default Input;
