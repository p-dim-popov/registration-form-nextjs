import React from "react";

export interface ILabelProps {
    isHidden?: boolean;
    htmlFor: string;
    label: string;
}

const Label: React.FC<ILabelProps> = ({ isHidden, htmlFor, label }) => (
    !isHidden ? <label htmlFor={htmlFor}>{label}</label> : null
);

export default Label;
