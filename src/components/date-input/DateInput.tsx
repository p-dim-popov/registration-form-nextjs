import React from "react";
import { IFormContext } from "@src/contexts/form/FormContext";
import { ICanBeControlled } from "@src/interfaces/ICanBeControlled";

export enum DateGroupType {
    Days = "days",
    Months = "months",
    Year = "year",
}

export interface IDateInputProps
    extends
    ICanBeControlled<string> {

}

export const set = (group: DateGroupType) => (prevState: string = "") => (value: string) => {
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
};

export const get = (group: DateGroupType) => (state: string = ""): string => {
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
};

function DateInput<TContext extends IFormContext<string>>({
    value, onChange,
}: React.PropsWithChildren<IDateInputProps>) {
    return (
        <div>
            <input
                className="w-14 border p-3 mx-1"
                placeholder="DD"
                onChange={(event) => onChange?.(
                    set(DateGroupType.Days)(value)(event.target.value),
                )}
                value={get(DateGroupType.Days)(value)}
            />
            <input
                className="w-14 border p-3 mx-1"
                placeholder="MM"
                onChange={(event) => onChange?.(
                    set(DateGroupType.Months)(value)(event.target.value),
                )}
                value={get(DateGroupType.Months)(value)}
            />
            <input
                className="w-20 border p-3 mx-1"
                placeholder="YYYY"
                onChange={(event) => onChange?.(
                    set(DateGroupType.Year)(value)(event.target.value),
                )}
                value={get(DateGroupType.Year)(value)}
            />
        </div>
    );
}

export default DateInput;
