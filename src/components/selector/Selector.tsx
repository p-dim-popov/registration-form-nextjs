import React from "react";
import { IHaveLabel } from "@src/interfaces/IHaveLabel";

export interface ISelectorProps extends IHaveLabel {
    id: string;
    definitions: { value: string, label?: string }[]
}

const Selector: React.FC<ISelectorProps> = ({
    definitions,
    id, name = id, label = id,
}) => (
    <>
        {label}
        {definitions.map((definition) => (
            <div key={definition.value}>
                <input type="radio" value={definition.value} name={name} />
                <label htmlFor={name}>{definition.label ?? definition.value}</label>
            </div>
        ))}
    </>
);

export default Selector;
