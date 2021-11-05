import React from "react";
import useValidation, { IUseValidationOptions } from "@src/hooks/useValidation/useValidation";
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

function Input<TContext extends IFormContext<string>>({
    id, label = id, validation, showValidationStatus, inlineLabel,
}: React.PropsWithChildren<IInputProps<string>>) {
    const validationMessages = validation?.rules.map(([,e]) => e);
    const [
        onChange, startValidating, errorMessages, status,
    ] = useValidation(validation ?? { rules: [] });
    useFormContextDefinitions<string, TContext>(id, validation?.rules ?? []);

    return (
        <div>
            {!inlineLabel && <label htmlFor={id}>{label}</label>}
            <ValidationErrors
                showValidationStatus={showValidationStatus}
                status={status}
                errorMessages={errorMessages}
            />
            <input
                onChange={(event) => onChange(event.target.value)}
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
