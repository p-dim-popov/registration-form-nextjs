import React from "react";
import useValidation, { IUseValidationOptions, ValidationStatus } from "@src/hooks/useValidation";
import classNames from "classnames";
import { IFormContext } from "@src/contexts/form/FormContext";

export interface IInputProps<T, TContext extends IFormContext = any> {
    id: string;
    label?: string;
    validation?: IUseValidationOptions<T, TContext>;
    showValidationStatus?: boolean;
    inlineLabel?: boolean;
}

function Input<T, TContext extends IFormContext = any>({
    id, label = id, validation, showValidationStatus, inlineLabel,
}: React.PropsWithChildren<IInputProps<T, TContext>>) {
    const validationMessages = validation?.rules.map(([,e]) => e);
    const [
        onChange, startValidating, errorMessages, status,
    ] = useValidation(validation ?? { rules: [] });

    return (
        <div>
            {!inlineLabel && <label htmlFor={id}>{label}</label>}
            {status === ValidationStatus.Error && !showValidationStatus && errorMessages
                .map((m) => (<div className="bg-red-300 text-white">{m}</div>))}
            <input
                onChange={(event) => onChange(event.target.value as unknown as T)}
                id={id}
                name={id}
                placeholder={label}
                onBlur={startValidating}
                className="border p-3"
            />
            {showValidationStatus && (
                <div>
                    {validationMessages?.map((m) => {
                        const showError = status === ValidationStatus.Pending
                          || (status === ValidationStatus.Error && errorMessages.includes(m));
                        const className = classNames({
                            "text-gray-400": showError,
                            "text-green-700": !showError,
                        });

                        return (<div key={m} className={className}>{m}</div>);
                    })}
                </div>
            )}
        </div>
    );
}

export default Input;
