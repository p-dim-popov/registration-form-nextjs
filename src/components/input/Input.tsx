import React, { useState } from "react";
import useValidation from "@src/hooks/useValidation/useValidation";
import useFormContextDefinitions
    from "@src/hooks/form/useFormContextDefinitions/useFormContextDefinitions";
import { IFormContext } from "@src/contexts/form/FormContext";
import ValidationErrors from "@src/components/validation-error/ValidationErrors";
import ValidationStatusPreview from "@src/components/validation-status-preview/ValidationStatusPreview";
import { IHaveLabel } from "@src/interfaces/IHaveLabel";
import { ICanHaveValidation } from "@src/interfaces/ICanHaveValidation";
import { ICanHaveContext } from "@src/interfaces/ICanHaveContext";

export interface IInputProps<TContext extends IFormContext<string>>
    extends IHaveLabel, ICanHaveValidation<string>, ICanHaveContext<TContext> {
    id: string;
}

function Input<TContext extends IFormContext<string>>({
    id, label = id, name = id, validation, showValidationStatus, inlineLabel, Context,
}: React.PropsWithChildren<IInputProps<TContext>>) {
    const validationMessages = validation?.rules.map(([,e]) => e);
    const [value, setValue] = useState("");
    const [
        allowValidation, errorMessages, status,
    ] = useValidation(validation ?? { rules: [] }, value);
    useFormContextDefinitions<string, TContext>(id, validation?.rules ?? [], Context);

    return (
        <div>
            {!inlineLabel && <label htmlFor={name}>{label}</label>}
            <ValidationErrors
                isHidden={showValidationStatus}
                status={status}
                errorMessages={errorMessages}
            />
            <input
                onChange={(event) => setValue(event.target.value)}
                id={id}
                name={name}
                placeholder={label}
                onBlur={allowValidation}
                className="border p-3"
            />
            <ValidationStatusPreview
                validationMessages={validationMessages}
                status={status}
                errorMessages={errorMessages}
                isHidden={!showValidationStatus}
            />
        </div>
    );
}

export default Input;
