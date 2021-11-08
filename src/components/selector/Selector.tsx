import React from "react";

export interface ISelectorProps {
    definitions: { value: string, label?: string }[]
}

const Selector: React.FC<ISelectorProps> = ({ definitions }) => (
    <div>
        {definitions.map((definition) => (
            <div key={definition.value}>
                <input type="radio" value={definition.value} />
                <label>{definition.label ?? definition.value}</label>
            </div>

        ))}
    </div>
);

export default Selector;
