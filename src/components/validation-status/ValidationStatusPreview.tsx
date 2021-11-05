import React from "react";
import classNames from "classnames";
import { ValidationStatus } from "@src/hooks/useValidation/useValidation";

export interface IValidationStatusProps {
    showValidationStatus?: boolean;
    validationMessages?: string[];
    status: ValidationStatus;
    errorMessages: string[];
}

const ValidationStatusPreview: React.FC<IValidationStatusProps> = ({
    showValidationStatus, validationMessages, status, errorMessages,
}) => (
    <>
        {showValidationStatus && (
            <div>
                {validationMessages?.map((m) => {
                    const showError = status === ValidationStatus.Pending
            || (status === ValidationStatus.Error && errorMessages.includes(m));
                    const className = classNames({
                        "text-gray-400": showError,
                        "text-green-700": !showError,
                    });

                    return (<div key={m} className={className}>{m}</div>);
                })}
            </div>
        )}
    </>
);

export default ValidationStatusPreview;
