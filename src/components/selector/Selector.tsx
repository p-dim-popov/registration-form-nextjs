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
import { ICanShowValidationStatus } from "@src/interfaces/ICanShowValidationStatus";
import Label from "@src/components/label/Label";
import classNames from "classnames";

export interface ISelectorProps
    extends
    IHaveLabel,
    ICanBeControlled<string>,
    ICanHaveValidation<string>,
    ICanShowValidationStatus {
    id: string;
    definitions: { value: string, label?: string }[];
}

function Selector<TContext extends IFormContext<string>>({
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
    useFormContextDefinitions<string, TContext>(id, validation?.rules ?? []);

    return (
        <div id={id} className="flex flex-col">
            <Label htmlFor={name} label={label} />
            <ValidationErrors
                isHidden={showValidationStatus}
                errorMessages={errorMessages}
            />
            <div className="flex flex-row">
                {definitions.map((definition, index) => {
                    const onClickHandler = () => {
                        setShouldValidate((isValidating) => isValidating || true);
                        setState(definition.value);
                    };

                    return (
                        <label
                            htmlFor={name}
                            key={definition.value}
                            onClick={onClickHandler}
                            className={classNames({
                                "py-2": true,
                                "px-3": !!index,
                            })}
                        >
                            <input
                                type="radio"
                                value={definition.value}
                                name={name}
                                checked={state === definition.value}
                                onChange={onClickHandler}
                                className="transform scale-150"
                            />
                            <span className="pl-3">{definition.label ?? definition.value}</span>
                        </label>
                    );
                })}
            </div>
        </div>
    );
}

export default Selector;
