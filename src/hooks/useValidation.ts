import { useCallback, useState } from "react";

export enum ValidationStatus {
    Pending = "Pending",
    Valid = "Valid",
    Error = "Error",
}

export type IUseValidation<T> = [
  onChange: (value: T) => void,
  status: ValidationStatus,
  errorMessage: string,
];

export type IUseValidationRule<T> = [
  test: (value: T) => boolean,
  message: string,
];

export interface IUseValidationOptions<T> {
    rules: IUseValidationRule<T>[];
    onValid?: (value: T) => void;
    onError?: (message: string, value: T) => void;
}

export const useValidation = <T> (options: IUseValidationOptions<T>): IUseValidation<T> => {
    const [status, setStatus] = useState(ValidationStatus.Pending);
    const [error, setError] = useState<string>("");

    const onChange = useCallback((value: T) => {
        const [, errorMessage] = options.rules.find(([test]) => !test(value)) || [];
        if (errorMessage) {
            setStatus(ValidationStatus.Error);
            setError(errorMessage);
            options.onError?.(errorMessage, value);
        } else {
            setStatus(ValidationStatus.Valid);
            options.onValid?.(value);
        }
    }, [options.rules, options.onValid, options.onError]);

    return [onChange, status, error];
};

export default useValidation;
