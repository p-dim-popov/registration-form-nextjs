import FormContext, { IFormContext } from "@src/contexts/form/FormContext";
import React, {
    useCallback, useContext, useEffect, useState,
} from "react";

const useFormContextState = <T, TContext extends IFormContext<T>>(
    fieldName: string, initialValue: T, Context?: React.Context<TContext>,
): [T, (value: T) => void] => {
    const context = useContext((Context ?? FormContext) as React.Context<TContext | undefined>);
    const contextValue = context?.data?.[fieldName];

    const setValueInContext = useCallback((val: T) => context?.set(fieldName)(val), [context, fieldName]);

    useEffect(() => {
        const isInitialized = (context && typeof contextValue !== "undefined") || !context;
        if (!isInitialized) {
            context?.set(fieldName)(initialValue);
        }
    }, [context, contextValue, fieldName, initialValue]);

    const [value, setValue] = useState<T>(initialValue);

    return [contextValue ?? value, setValueInContext ?? setValue];
};

export default useFormContextState;
