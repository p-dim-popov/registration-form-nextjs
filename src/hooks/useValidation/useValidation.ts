import React, {
    useCallback, useContext, useEffect, useState,
} from "react";
import FormContext, { IFormContext } from "@src/contexts/form/FormContext";

export enum ValidationStatus {
    Pending = "Pending",
    Valid = "Valid",
    Error = "Error",
    Validating = "Validating",
}

export type IUseValidation = [
  forceValidate: () => void,
  errorMessages: string[],
  status: ValidationStatus,
];

export type IUseValidationRule<T, TContext extends IFormContext<T> = IFormContext<T>> = [
  test: (value?: T, context?: TContext) => boolean,
  message: string,
];

export interface IUseValidationOptions<T, TContext extends IFormContext<T> = IFormContext<T>> {
    rules: IUseValidationRule<T, TContext>[];
    onValid?: (value: T) => void;
    onError?: (messages: string[], value: T) => void;
    earlyReturn?: boolean;
    Context?: React.Context<TContext> | React.Context<TContext & IFormContext<T>>;
}

export const useValidation = <T, TContext extends IFormContext<T> = IFormContext<T>> ({
    rules,
    earlyReturn,
    onError,
    onValid,
    Context,
}: IUseValidationOptions<T, TContext>, value: T,
): IUseValidation => {
    const [status, setStatus] = useState<ValidationStatus>(ValidationStatus.Pending);
    const [errors, setErrors] = useState<string[]>([]);
    const context = useContext((Context ?? FormContext) as React.Context<TContext>);

    const forceValidate = useCallback(() => setStatus(ValidationStatus.Valid), []);

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

    return [forceValidate, errors, status];
};

export default useValidation;
