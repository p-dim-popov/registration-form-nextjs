import React from "react";
import useValidation, { IUseValidationOptions, ValidationStatus } from "@src/hooks/useValidation/useValidation";
import classNames from "classnames";
import useFormContextDefinitions
    from "@src/hooks/form/useFormContextDefinitions/useFormContextDefinitions";
import { IFormContext } from "@src/contexts/form/FormContext";
import ValidationErrors from "@src/components/validation-error/ValidationErrors";
import ValidationStatusPreview from "@src/components/validation-status-preview/ValidationStatusPreview";

export interface IInputProps<T> {
    id: string;
    label?: string;
    validation?: IUseValidationOptions<T>;
    showValidationStatus?: boolean;
    inlineLabel?: boolean;
}

function Input<T, TContext extends IFormContext<T>>({
    id, label = id, validation, showValidationStatus, inlineLabel,
}: React.PropsWithChildren<IInputProps<T>>) {
    const validationMessages = validation?.rules.map(([,e]) => e);
    const [
        onChange, startValidating, errorMessages, status,
    ] = useValidation(validation ?? { rules: [] });
    useFormContextDefinitions<T, TContext>(id, validation?.rules ?? []);

    return (
        <div>
            {!inlineLabel && <label htmlFor={id}>{label}</label>}
            <ValidationErrors
                showValidationStatus={showValidationStatus}
                status={status}
                errorMessages={errorMessages}
            />
            <input
                onChange={(event) => onChange(event.target.value as unknown as T)}
                id={id}
                name={id}
                placeholder={label}
                onBlur={startValidating}
                className="border p-3"
            />
            <ValidationStatusPreview
                validationMessages={validationMessages}
                status={status}
                errorMessages={errorMessages}
                showValidationStatus={showValidationStatus}
            />
        </div>
    );
}

export default Input;
