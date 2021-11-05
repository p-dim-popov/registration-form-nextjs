import React from "react";
import { ValidationStatus } from "@src/hooks/useValidation/useValidation";
import { ICanHaveValidation } from "@src/interfaces/ICanHaveValidation";
import ValidationError from "./ValidationError";

export interface IValidationErrorsProps extends ICanHaveValidation<any> {
    status: ValidationStatus;
    errorMessages: string[];
}

const ValidationErrors: React.FC<IValidationErrorsProps> = ({
    status, showValidationStatus, errorMessages,
}) => (
    <>
        {
            status === ValidationStatus.Error && !showValidationStatus && errorMessages
                .map((m) => (<ValidationError message={m} key={m} />))
        }
    </>
);

export default ValidationErrors;
