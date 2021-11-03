import React from "react";
import useValidation, { IUseValidationOptions, ValidationStatus } from "@src/hooks/useValidation";

export interface IInputProps<T, TContext> {
    id: string;
    label?: string;
    validation?: IUseValidationOptions<T, TContext>;
    showValidationStatus?: boolean;
    inlineLabel?: boolean;
}

function Input<T, TContext>({
    id, label = id, validation, showValidationStatus, inlineLabel,
}: React.PropsWithChildren<IInputProps<T, TContext>>) {
    const validationMessages = validation?.rules.map(([,e]) => e);
    const [
        onChange, startValidating, errorMessages, status,
    ] = useValidation(validation ?? { rules: [] });

    return (
        <div>
            {!inlineLabel && <label htmlFor={id}>{label}</label>}
            {status === ValidationStatus.Error && !showValidationStatus && (
                <div className="bg-red-300">{errorMessages}</div>
            )}
            <input
                onChange={(event) => onChange(event.target.value as unknown as T)}
                id={id}
                name={id}
                placeholder={label}
                onBlur={startValidating}
            />
            {showValidationStatus && (
                <div>
                    {validationMessages?.map((m) => (<div key={m} className="text-gray-900">{m}</div>))}
                </div>
            )}
        </div>
    );
}

export default Input;
