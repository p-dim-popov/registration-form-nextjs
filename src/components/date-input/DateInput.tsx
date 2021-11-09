import React, { useState } from "react";
import { IFormContext } from "@src/contexts/form/FormContext";
import { ICanBeControlled } from "@src/interfaces/ICanBeControlled";
import { ICanHaveValidation } from "@src/interfaces/ICanHaveValidation";
import { ICanHaveContext } from "@src/interfaces/ICanHaveContext";
import { ICanShowValidationStatus } from "@src/interfaces/ICanShowValidationStatus";
import ValidationErrors from "@src/components/validation-error/ValidationErrors";
import Label from "@src/components/label/Label";
import useFormContextState from "@src/hooks/form/useFormContextState/useFormContextState";
import useValidation from "@src/hooks/useValidation/useValidation";
import useFormContextDefinitions
    from "@src/hooks/form/useFormContextDefinitions/useFormContextDefinitions";
import { IHaveLabel } from "@src/interfaces/IHaveLabel";

export enum DateGroupType {
    Days = "days",
    Months = "months",
    Year = "year",
}

export interface IDateInputProps<TContext extends IFormContext<string>>
    extends
    ICanBeControlled<string>,
    ICanHaveValidation<string>,
    ICanHaveContext<TContext>,
    IHaveLabel,
    ICanHaveContext<TContext> {
    id: string;
}

export const DateInputTools = ({
    alter: (group: DateGroupType) => (prevState: string = "") => (value: string) => {
        let [day = "", month = "", year = ""] = prevState.split("-");
        switch (group) {
            case DateGroupType.Days:
                day = value.substring(value.length - 2);
                break;
            case DateGroupType.Months:
                month = value.substring(value.length - 2);
                break;
            case DateGroupType.Year:
                year = value.substring(value.length - 4);
                break;
            default: break;
        }

        return [day, month, year].join("-");
    },

    select: (group: DateGroupType) => (state: string = ""): string => {
        const [day = "", month = "", year = ""] = state.split("-");
        const value = {
            [DateGroupType.Days]: day,
            [DateGroupType.Months]: month,
            [DateGroupType.Year]: year,
        }[group];

        switch (value) {
            case "00":
            case "0000":
                return "";
            default: return value;
        }
    },
});

function DateInput<TContext extends IFormContext<string>>({
    id, name = id, label = id,
    value, onChange,
    validation,
    Context,
}: React.PropsWithChildren<IDateInputProps<TContext>>) {
    const [state, setState, isInitializedInContext] = useFormContextState(name, { initialValue: "", value, onChange }, Context);
    const [shouldValidate, setShouldValidate] = useState(isInitializedInContext);
    const errorMessages = useValidation(validation ?? { rules: [] }, state, shouldValidate);
    useFormContextDefinitions<string, TContext>(id, validation?.rules ?? [], Context);

    return (
        <div onBlur={() => setShouldValidate(true)} className="flex flex-col">
            <ValidationErrors errorMessages={errorMessages} />
            <Label htmlFor={name} label={label} />
            <div className="flex flex-row">
                <input
                    className="w-14 border p-3 mx-1"
                    placeholder="DD"
                    onChange={(event) => setState(
                        DateInputTools.alter(DateGroupType.Days)(state)(event.target.value),
                    )}
                    value={DateInputTools.select(DateGroupType.Days)(state)}
                />
                <input
                    className="w-14 border p-3 mx-1"
                    placeholder="MM"
                    onChange={(event) => setState(
                        DateInputTools.alter(DateGroupType.Months)(state)(event.target.value),
                    )}
                    value={DateInputTools.select(DateGroupType.Months)(state)}
                />
                <input
                    className="w-20 border p-3 mx-1"
                    placeholder="YYYY"
                    onChange={(event) => setState(
                        DateInputTools.alter(DateGroupType.Year)(state)(event.target.value),
                    )}
                    value={DateInputTools.select(DateGroupType.Year)(state)}
                />
            </div>
        </div>
    );
}

export default DateInput;
