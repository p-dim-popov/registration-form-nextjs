import React, { useState } from "react";
import { IHaveLabel } from "@src/interfaces/IHaveLabel";
import { ICanHaveValidation } from "@src/interfaces/ICanHaveValidation";
import { ICanHaveContext } from "@src/interfaces/ICanHaveContext";
import { IFormContext } from "@src/contexts/form/FormContext";
import Label from "@src/components/label/Label";
import { ICanBeControlled } from "@src/interfaces/ICanBeControlled";
import useValidation from "@src/hooks/useValidation/useValidation";
import ValidationErrors from "@src/components/validation-error/ValidationErrors";
import useFormContextState from "@src/hooks/form/useFormContextState/useFormContextState";
import { ICanShowValidationStatus } from "@src/interfaces/ICanShowValidationStatus";
import { ICanHaveInlineLabel } from "@src/interfaces/ICanHaveInlineLabel";

export interface ICheckboxProps<TContext extends IFormContext<boolean>>
    extends
    IHaveLabel,
    ICanHaveInlineLabel,
    ICanHaveValidation<boolean>,
    ICanShowValidationStatus,
    ICanHaveContext<TContext>,
    ICanBeControlled<boolean> {
    id: string;
}

function Checkbox<TContext extends IFormContext<boolean>>({
    id, label = id, name = id, inlineLabel,
    value, onChange,
    validation, showValidationStatus,
}: React.PropsWithChildren<ICheckboxProps<TContext>>) {
    const [state, setState, isInitializedInContext] = useFormContextState(name, { initialValue: false, value, onChange });
    const [shouldValidate, setShouldValidate] = useState(isInitializedInContext);
    const errorMessages = useValidation(validation ?? { rules: [] }, state, shouldValidate);

    return (
        <div>
            <ValidationErrors
                errorMessages={errorMessages}
                isHidden={showValidationStatus}
            />
            <input
                id={id}
                name={name}
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gray-600"
                checked={state}
                onChange={(event) => {
                    if (!shouldValidate) {
                        setShouldValidate(true);
                    }
                    setState(event.target.checked);
                }}
            />
            <Label htmlFor={name} label={label} isHidden={!!inlineLabel} />
        </div>
    );
}

export default Checkbox;
