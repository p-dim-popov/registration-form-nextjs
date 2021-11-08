import FormContext, { IFormContext } from "@src/contexts/form/FormContext";
import React, {
    useCallback, useContext, useEffect, useState,
} from "react";

const useFormContextState = <T, TContext extends IFormContext<T>>(
    fieldName: string,
    { initialValue, value, onChange }: { initialValue: T, value?: T, onChange?: (val: T) => void },
    Context?: React.Context<TContext>,
): [T, (value: T) => void] => {
    const context = useContext((Context ?? FormContext) as React.Context<TContext | undefined>);
    const contextValue = context?.data?.[fieldName];

    const [innerStateValue, setInnerStateValue] = useState<T>(initialValue);

    const onChangeHandler = useCallback((val: T) => {
        context?.set(fieldName)(val);
        setInnerStateValue(val);
        onChange?.(val);
    }, [context, fieldName, onChange]);

    useEffect(() => {
        const isInitialized = (context && typeof contextValue !== "undefined") || !context;
        if (!isInitialized) {
            context?.set(fieldName)(initialValue);
        }
    }, [context, contextValue, fieldName, initialValue]);

    return [value ?? contextValue ?? innerStateValue, onChangeHandler];
};

export default useFormContextState;
