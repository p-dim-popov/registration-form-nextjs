import React from "react";
import { ICanBeHidden } from "@src/interfaces/ICanBeHidden";

export interface ILabelProps extends ICanBeHidden {
    htmlFor: string;
    label: string;
}

const Label: React.FC<ILabelProps> = ({ isHidden, htmlFor, label }) => (
    !isHidden ? <label htmlFor={htmlFor}>{label}</label> : null
);

export default Label;
