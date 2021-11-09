import React, { useState } from "react";
import useValidation from "@src/hooks/useValidation/useValidation";
import useFormContextDefinitions from "@src/hooks/form/useFormContextDefinitions/useFormContextDefinitions";
import { IFormContext } from "@src/contexts/form/FormContext";
import ValidationErrors from "@src/components/validation-error/ValidationErrors";
import ValidationStatusPreview from "@src/components/validation-status-preview/ValidationStatusPreview";
import { IHaveLabel } from "@src/interfaces/IHaveLabel";
import { ICanHaveValidation } from "@src/interfaces/ICanHaveValidation";
import { ICanHaveContext } from "@src/interfaces/ICanHaveContext";
import Label from "@src/components/label/Label";
import { ICanBeControlled } from "@src/interfaces/ICanBeControlled";
import useFormContextState from "@src/hooks/form/useFormContextState/useFormContextState";
import EyeOpened from "@src/components/EyeOpened";
import EyeShut from "@src/components/EyeShut";
import { ICanShowValidationStatus } from "@src/interfaces/ICanShowValidationStatus";
import { ICanHaveInlineLabel } from "@src/interfaces/ICanHaveInlineLabel";

export interface IInputProps<TContext extends IFormContext<string>>
    extends
    IHaveLabel,
    ICanHaveInlineLabel,
    ICanHaveValidation<string>,
    ICanShowValidationStatus,
    ICanHaveContext<TContext>,
    ICanBeControlled<string> {
    id: string;
    isPassword?: boolean;
}

function Input<TContext extends IFormContext<string>>({
    id, label = id, name = id, inlineLabel,
    validation, showValidationStatus,
    Context,
    value, onChange,
    isPassword,
}: React.PropsWithChildren<IInputProps<TContext>>) {
    const validationMessages = validation?.rules.map(([,e]) => e) ?? [];
    const [state, setState, isInitializedInContext] = useFormContextState(name, { initialValue: "", value, onChange }, Context);
    const [shouldValidate, setShouldValidate] = useState(isInitializedInContext);
    const errorMessages = useValidation(validation ?? { rules: [] }, state, shouldValidate);
    useFormContextDefinitions<string, TContext>(id, validation?.rules ?? [], Context);
    const [showPassword, setShowPassword] = useState(!isPassword);

    return (
        <div>
            <ValidationErrors
                isHidden={showValidationStatus}
                errorMessages={errorMessages}
            />
            <Label htmlFor={name} label={label} isHidden={!!inlineLabel} />
            <input
                onChange={(event) => setState(event.target.value)}
                id={id}
                name={name}
                placeholder={label}
                onBlur={() => setShouldValidate((isValidating) => isValidating || true)}
                className="border p-3"
                value={state}
                type={showPassword ? "text" : "password"}
            />
            {!!isPassword && (
                <button
                    type="button"
                    onClick={() => setShowPassword((prevShowPassword) => !prevShowPassword)}
                >
                    {showPassword ? <EyeOpened /> : <EyeShut />}
                </button>
            )}
            <ValidationStatusPreview
                validationMessages={validationMessages}
                errorMessages={errorMessages}
                isHidden={!showValidationStatus}
                isValidationStarted={shouldValidate}
            />
        </div>
    );
}

export default Input;
