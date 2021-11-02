import React from "react";
import { IUseValidationOptions } from "@src/hooks/useValidation";

export interface IInputProps<T> {
    id: string;
    label?: string;
    validation?: IUseValidationOptions<T>;
    showValidationStatus?: boolean;
}

function Input<T>({
    id, label = id, validation, showValidationStatus,
}: React.PropsWithChildren<IInputProps<T>>) {
    return (
        <>
            <label htmlFor={id}>{label}</label>
            <input id={id} name={id} />
        </>
    );
}

export default Input;
