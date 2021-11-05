import { IFormContext } from "@src/contexts/form/FormContext";
import React, { useState } from "react";

const useFormContextState = <T, TContext extends IFormContext<T>>(initialValue: T, Context?: React.Context<TContext>) => {
    return useState<T>(initialValue);
};

export default useFormContextState;
