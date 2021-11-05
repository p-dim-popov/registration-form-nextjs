import React from "react";
import { ValidationStatus } from "@src/hooks/useValidation/useValidation";
import { ICanBeHidden } from "@src/interfaces/ICanBeHidden";
import ValidationError from "./ValidationError";

export interface IValidationErrorsProps extends ICanBeHidden {
    status: ValidationStatus;
    errorMessages: string[];
}

const ValidationErrors: React.FC<IValidationErrorsProps> = ({
    status, isHidden, errorMessages,
}) => (
    <>
        {
            status === ValidationStatus.Error && !isHidden && errorMessages
                .map((m) => (<ValidationError message={m} key={m} />))
        }
    </>
);

export default ValidationErrors;
