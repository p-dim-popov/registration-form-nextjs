import FormContext, { IFormContext } from "@src/contexts/form/FormContext";
import React, { useContext, useState } from "react";

const useFormContextState = <T, TContext extends IFormContext<T>>(fieldName: string, initialValue: T, Context?: React.Context<TContext>) => {
    const context = useContext((Context ?? FormContext) as React.Context<TContext | undefined>);
    const [value, setValue] = useState<T>(initialValue);
    const contextValue = context?.data?.[fieldName]?.value;

    return [contextValue ?? value, setValue];
};

export default useFormContextState;
