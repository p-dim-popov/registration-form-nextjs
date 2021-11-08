import React, { useState } from "react";
import { IHaveLabel } from "@src/interfaces/IHaveLabel";
import { ICanBeControlled } from "@src/interfaces/ICanBeControlled";
import { ICanHaveValidation } from "@src/interfaces/ICanHaveValidation";
import useFormContextState from "@src/hooks/form/useFormContextState/useFormContextState";
import useValidation from "@src/hooks/useValidation/useValidation";
import useFormContextDefinitions
    from "@src/hooks/form/useFormContextDefinitions/useFormContextDefinitions";
import { IFormContext } from "@src/contexts/form/FormContext";
import ValidationErrors from "@src/components/validation-error/ValidationErrors";

export interface ISelectorProps
    extends
    IHaveLabel,
    ICanBeControlled<string | number>,
    ICanHaveValidation<string | number> {
    id: string;
    definitions: { value: string, label?: string }[];
}

function Selector<TContext extends IFormContext<string | number>>({
    definitions,
    id, name = id, label = id,
    value, onChange,
    validation, showValidationStatus,
}: React.PropsWithChildren<ISelectorProps>) {
    const [state, setState, isInitializedInContext] = useFormContextState(name, {
        initialValue: "", value, onChange,
    });
    const [shouldValidate, setShouldValidate] = useState(isInitializedInContext);
    const errorMessages = useValidation(validation ?? { rules: [] }, state, shouldValidate);
    useFormContextDefinitions<string | number, TContext>(id, validation?.rules ?? []);

    return (
        <div id={id}>
            <ValidationErrors
                isHidden={showValidationStatus}
                errorMessages={errorMessages}
            />
            {label}
            {definitions.map((definition) => (
                <label htmlFor={name} key={definition.value}>
                    <input
                        type="radio"
                        value={definition.value}
                        name={name}
                        checked={state === definition.value}
                        onChange={() => {
                            setShouldValidate((isValidating) => isValidating || true);
                            setState(definition.value);
                        }}
                    />
                    {definition.label ?? definition.value}
                </label>
            ))}
        </div>
    );
}

export default Selector;
