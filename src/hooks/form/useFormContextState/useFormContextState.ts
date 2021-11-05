import FormContext, { IFormContext } from "@src/contexts/form/FormContext";
import React, { useContext, useEffect, useState } from "react";
import { ValidationStatus } from "@src/hooks/useValidation/useValidation";

const useFormContextState = <T, TContext extends IFormContext<T>>(
    fieldName: string, initialValue: T, Context?: React.Context<TContext>,
): [T, (value: T) => void] => {
    const context = useContext((Context ?? FormContext) as React.Context<TContext | undefined>);
    const contextValue = context?.data?.[fieldName]?.value;

    useEffect(() => {
        const isInitialized = (context && typeof contextValue !== "undefined") || !context;
        if (!isInitialized) {
            context?.set(fieldName)({ value: initialValue, status: ValidationStatus.Pending });
        }
    }, [context, contextValue, fieldName, initialValue]);

    const [value, setValue] = useState<T>(initialValue);

    return [contextValue ?? value, setValue];
};

export default useFormContextState;
