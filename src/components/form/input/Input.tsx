import React from "react";
import { IUseValidationOptions } from "@src/hooks/useValidation";

export interface IInputProps<T> {
    id: string;
    label?: string;
    validation?: IUseValidationOptions<T>;
    showValidationStatus?: boolean;
    inlineLabel?: boolean;
}

function Input<T>({
    id, label = id, validation, showValidationStatus, inlineLabel,
}: React.PropsWithChildren<IInputProps<T>>) {
    return (
        <>
            {!inlineLabel && <label htmlFor={id}>{label}</label>}
            <input id={id} name={id} placeholder={label} />
        </>
    );
}

export default Input;
