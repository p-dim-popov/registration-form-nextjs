import React from "react";
import classNames from "classnames";
import { ICanBeHidden } from "@src/interfaces/ICanBeHidden";

export interface IValidationStatusProps extends ICanBeHidden {
    validationMessages: string[];
    errorMessages: string[];
    isValidationStarted?: boolean;
}

const ValidationStatusPreview: React.FC<IValidationStatusProps> = ({
    isHidden, validationMessages, errorMessages, isValidationStarted,
}) => (
    <>
        {!isHidden && (
            <div>
                {validationMessages?.map((m) => {
                    const showError = !isValidationStarted || (errorMessages.includes(m));
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
