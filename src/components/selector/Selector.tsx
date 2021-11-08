import React from "react";
import { IHaveLabel } from "@src/interfaces/IHaveLabel";
import { ICanBeControlled } from "@src/interfaces/ICanBeControlled";

export interface ISelectorProps extends IHaveLabel, ICanBeControlled<string | number> {
    id: string;
    definitions: { value: string, label?: string }[];
}

const Selector: React.FC<ISelectorProps> = ({
    definitions,
    id, name = id, label = id,
    value, onChange,
}) => (
    <div id={id}>
        {label}
        {definitions.map((definition) => {
            return (
                <label htmlFor={name} key={definition.value}>
                    <input
                        type="radio"
                        value={definition.value}
                        name={name}
                        checked={value === definition.value}
                        onChange={() => onChange?.(definition.value)}
                    />
                    {definition.label ?? definition.value}
                </label>
            );
        })}
    </div>
);

export default Selector;
