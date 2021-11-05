import React from "react";
import { ValidationStatus } from "@src/hooks/useValidation/useValidation";
import ValidationError from "./ValidationError";

export interface IValidationErrorsProps {
    show: boolean;
    status: ValidationStatus;
    errorMessages: string[];
}

const ValidationErrors: React.FC<IValidationErrorsProps> = ({
    status, show, errorMessages,
}) => (
    <>
        {
            status === ValidationStatus.Error && show && errorMessages
                .map((m) => (<ValidationError message={m} key={m} />))
        }
    </>
);

export default ValidationErrors;
