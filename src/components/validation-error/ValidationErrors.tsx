import React from "react";
import { ValidationStatus } from "@src/hooks/useValidation/useValidation";
import ValidationError from "./ValidationError";

export interface IValidationErrorsProps {
    status: ValidationStatus;
    showValidationStatus?: boolean;
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
