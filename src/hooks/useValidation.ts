import { useCallback, useEffect, useState } from "react";

export enum ValidationStatus {
    Pending = "Pending",
    Valid = "Valid",
    Error = "Error",
    Validating = "Validating",
}

export type IUseValidation<T> = [
  onChange: (value: T) => void,
  startValidating: () => void,
  errorMessages: string[],
  status: ValidationStatus,
];

export type IUseValidationRule<T, TContext = null> = [
  test: (value?: T, context?: TContext) => boolean,
  message: string,
];

export interface IUseValidationOptions<T, TContext = null> {
    rules: IUseValidationRule<T, TContext>[];
    onValid?: (value: T) => void;
    onError?: (messages: string[], value: T) => void;
    earlyReturn?: boolean;
    context?: TContext,
}

export const useValidation = <T, TContext = null> ({
    rules,
    context,
    earlyReturn,
    onError,
    onValid,
}: IUseValidationOptions<T, TContext>,
): IUseValidation<T> => {
    const [status, setStatus] = useState<ValidationStatus>(ValidationStatus.Pending);
    const [errors, setErrors] = useState<string[]>([]);
    const [value, setValue] = useState<T>();

    const startValidating = useCallback(() => setStatus(ValidationStatus.Validating), []);

    useEffect(() => {
        if (status === ValidationStatus.Pending) return;

        const errorMessages = earlyReturn
            ? [rules.find(([test]) => !test(value, context))?.[1] ?? ""]
                .filter((x) => !!x)
            : rules.filter(([test]) => !test(value, context))
                .map(([, message]) => message);

        if (errorMessages.length && status !== ValidationStatus.Error) {
            setErrors(errorMessages);
            onError?.(errorMessages, value!);

            setStatus(ValidationStatus.Error);
        } else if (!errorMessages.length && status !== ValidationStatus.Valid) {
            onValid?.(value!);

            setStatus(ValidationStatus.Valid);
        }
    }, [context, earlyReturn, onError, onValid, rules, status, value]);

    return [setValue, startValidating, errors, status];
};

export default useValidation;
