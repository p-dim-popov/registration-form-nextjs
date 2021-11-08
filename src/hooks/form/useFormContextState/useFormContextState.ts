import FormContext, { IFormContext } from "@src/contexts/form/FormContext";
import React, {
    useCallback, useContext, useState,
} from "react";

const useFormContextState = <T, TContext extends IFormContext<T>>(
    fieldName: string,
    { initialValue, value, onChange }: { initialValue: T, value?: T, onChange?: (val: T) => void },
    Context?: React.Context<TContext>,
): [value: T, onChange: (value: T) => void, isInitializedInContext: boolean] => {
    const context = useContext((Context ?? FormContext) as React.Context<TContext | undefined>);
    const contextValue = context?.data?.[fieldName];

    const [innerStateValue, setInnerStateValue] = useState<T>(initialValue);

    const onChangeHandler = useCallback((val: T) => {
        context?.set(fieldName)(val);
        setInnerStateValue(val);
        onChange?.(val);
    }, [context, fieldName, onChange]);

    const isInitializedInContext = (context && typeof contextValue !== "undefined") || !context;

    return [value ?? contextValue ?? innerStateValue, onChangeHandler, isInitializedInContext];
};

export default useFormContextState;
