import React from "react";
import useValidation, { IUseValidationOptions } from "@src/hooks/useValidation";

export interface IInputProps {
    id: string;
    label?: string;
    validation?: IUseValidationOptions<string>;
    showValidationStatus?: boolean;
    inlineLabel?: boolean;
}

const Input: React.FC<IInputProps> = ({
    id, label = id, validation, showValidationStatus, inlineLabel,
}) => {
    const [onChange,, errorMessage] = useValidation(validation ?? { rules: [] });

    return (
        <>
            {!inlineLabel && <label htmlFor={id}>{label}</label>}
            <input
                onChange={(event) => onChange(event.target.value)}
                id={id}
                name={id}
                placeholder={label}
            />
            <div>{errorMessage}</div>
        </>
    );
}

export default Input;
