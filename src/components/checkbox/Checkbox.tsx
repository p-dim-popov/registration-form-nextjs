import React, { useState } from "react";
import { IHaveLabel } from "@src/interfaces/IHaveLabel";
import { ICanHaveValidation } from "@src/interfaces/ICanHaveValidation";
import { ICanHaveContext } from "@src/interfaces/ICanHaveContext";
import { IFormContext } from "@src/contexts/form/FormContext";
import Label from "@src/components/label/Label";
import { ICanBeControlled } from "@src/interfaces/ICanBeControlled";
import useValidation, { ValidationStatus } from "@src/hooks/useValidation/useValidation";
import ValidationErrors from "@src/components/validation-error/ValidationErrors";
import useFormContextState from "@src/hooks/form/useFormContextState/useFormContextState";

export interface ICheckboxProps<TContext extends IFormContext<boolean>>
    extends
    IHaveLabel,
    ICanHaveValidation<boolean>,
    ICanHaveContext<TContext>,
    ICanBeControlled<boolean> {
    id: string;
}

function Checkbox<TContext extends IFormContext<boolean>>({
    id, label = id, name = id, inlineLabel,
    value, onChange,
    validation, showValidationStatus,
}: React.PropsWithChildren<ICheckboxProps<TContext>>) {
    const [nonControlledValue, setNonControlledValue] = useFormContextState(name, { initialValue: false });
    const [
        forceValidation, errorMessages, status,
    ] = useValidation(validation ?? { rules: [] }, value ?? nonControlledValue);

    return (
        <div>
            <ValidationErrors
                status={status}
                errorMessages={errorMessages}
                isHidden={showValidationStatus}
            />
            <input
                id={id}
                name={name}
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gray-600"
                checked={value ?? nonControlledValue}
                onChange={(event) => {
                    if (status === ValidationStatus.Pending) {
                        forceValidation();
                    }
                    (onChange ?? setNonControlledValue)(event.target.checked);
                }}
            />
            <Label htmlFor={name} label={label} isHidden={!!inlineLabel} />
        </div>
    );
}

export default Checkbox;
