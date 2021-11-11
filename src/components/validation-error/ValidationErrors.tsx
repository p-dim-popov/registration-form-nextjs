import React from "react";
import { ValidationStatus } from "@src/hooks/useValidation/useValidation";
import { ICanBeHidden } from "@src/interfaces/ICanBeHidden";
import ValidationError from "./ValidationError";

export interface IValidationErrorsProps extends ICanBeHidden {
    errorMessages: string[];
}

const ValidationErrors: React.FC<IValidationErrorsProps> = ({
    isHidden, errorMessages,
}) => (
    <ul>
        {
            !isHidden && errorMessages
                .map((m) => (<ValidationError message={m} key={m} />))
        }
    </ul>
);

export default ValidationErrors;
