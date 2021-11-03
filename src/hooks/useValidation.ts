import { useCallback, useState } from "react";

export enum ValidationStatus {
    Pending = "Pending",
    Valid = "Valid",
    Error = "Error",
}

export type IUseValidation<T> = [
  onChange: (value: T) => void,
  status: ValidationStatus,
  errorMessages: string[],
];

export type IUseValidationRule<TContext = null> = [
  test: (value: any, context?: TContext) => boolean,
  message: string,
];

export interface IUseValidationOptions<T, TContext = null> {
    rules: IUseValidationRule<TContext>[];
    onValid?: (value: T) => void;
    onError?: (messages: string[], value: T) => void;
    earlyReturn?: boolean;
    context?: TContext,
}

export const useValidation = <T, TContext = null> (options: IUseValidationOptions<T, TContext>): IUseValidation<T> => {
    const [status, setStatus] = useState(ValidationStatus.Pending);
    const [errors, setErrors] = useState<string[]>([]);

    const onChange = useCallback((value: T) => {
        const errorMessages = options.earlyReturn
            ? [options.rules.find(([test]) => !test(value, options?.context))?.[1] ?? ""]
                .filter((x) => !!x)
            : options.rules.filter(([test]) => !test(value, options?.context))
                .map(([, message]) => message);
        if (errorMessages.length) {
            setStatus(ValidationStatus.Error);
            setErrors(errorMessages);
            options.onError?.(errorMessages, value);
        } else {
            setStatus(ValidationStatus.Valid);
            options.onValid?.(value);
        }
    }, [options.rules, options.onValid, options.onError, options.context]);

    return [onChange, status, errors];
};

export default useValidation;
