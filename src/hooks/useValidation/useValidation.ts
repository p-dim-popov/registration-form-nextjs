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

export type IUseValidation = string[];

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
    rules, earlyReturn,
    onError, onValid,
    Context,
}: IUseValidationOptions<T, TContext>,
    value: T, shouldValidate: boolean = true,
): IUseValidation => {
    const [errors, setErrors] = useState<string[]>([]);
    const context = useContext((Context ?? FormContext) as React.Context<TContext | undefined>);

    useEffect(() => {
        if (!shouldValidate) return;

        const errorMessages = earlyReturn
            ? [rules.find(([test]) => !test(value, context))?.[1] ?? ""]
                .filter((x) => !!x)
            : rules.filter(([test]) => !test(value, context))
                .map(([, message]) => message);

        if (errorMessages.length) {
            setErrors((prevErrors) => (
                !errorMessages.every(prevErrors.includes.bind(prevErrors))
              || !prevErrors.every(errorMessages.includes.bind(errorMessages))
                    ? errorMessages
                    : prevErrors
            ));
            onError?.(errorMessages, value!);
        } else if (!errorMessages.length) {
            setErrors((prevErrors) => (!prevErrors.length ? prevErrors : []));
            onValid?.(value!);
        }
    }, [context, earlyReturn, onError, onValid, rules, shouldValidate, value]);

    return errors;
};

export default useValidation;
