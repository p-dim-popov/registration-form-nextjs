import React from "react";
import { IHaveLabel } from "@src/interfaces/IHaveLabel";
import { ICanHaveValidation } from "@src/interfaces/ICanHaveValidation";
import { ICanHaveContext } from "@src/interfaces/ICanHaveContext";
import { IFormContext } from "@src/contexts/form/FormContext";
import Label from "@src/components/label/Label";

export interface ICheckboxProps<TContext extends IFormContext<boolean>>
    extends IHaveLabel, ICanHaveValidation<boolean>, ICanHaveContext<TContext> {
    id: string;
}

function Checkbox<TContext extends IFormContext<boolean>>({
    id, label = id, name = id, inlineLabel,
}: React.PropsWithChildren<ICheckboxProps<TContext>>) {
    return (
        <div>
            <Label htmlFor={name} label={label} isHidden={!!inlineLabel} />
            <input
                id={id}
                name={name}
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gray-600"
            />
        </div>
    );
}

export default Checkbox;
