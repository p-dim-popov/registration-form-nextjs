import React, { useCallback, useState } from "react";

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

export type IUseValidationRule<T = any> = [
  test: (value: T) => boolean,
  message: string,
];

interface IUseValidationOptions<T = any, U = null> {
  rules: IUseValidationRule[];
  onValid?: () => T;
  onError?: () => string;
  context?: [_: React.Context<U>, fieldName: string];
}

export const useValidation = <T> (options: IUseValidationOptions): IUseValidation<T> => {
  const [status, setStatus] = useState(ValidationStatus.Pending);
  const [error, setError] = useState<string>("");

  const onChange = useCallback((value: T) => {
    const [, errorMessage] = options.rules.find(([test]) => !test(value)) || [];
    if (errorMessage) {
      setStatus(ValidationStatus.Error);
      setError(errorMessage);
    } else {
      setStatus(ValidationStatus.Valid);
    }
  }, [options.rules]);

  return [onChange, status, error];
};

export default useValidation;
