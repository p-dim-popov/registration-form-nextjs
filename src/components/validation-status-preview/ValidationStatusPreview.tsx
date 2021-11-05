import React from "react";
import classNames from "classnames";
import { ValidationStatus } from "@src/hooks/useValidation/useValidation";
import { ICanBeHidden } from "@src/interfaces/ICanBeHidden";

export interface IValidationStatusProps extends ICanBeHidden {
    validationMessages?: string[];
    status: ValidationStatus;
    errorMessages: string[];
}

const ValidationStatusPreview: React.FC<IValidationStatusProps> = ({
    isHidden, validationMessages, status, errorMessages,
}) => (
    <>
        {!isHidden && (
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
