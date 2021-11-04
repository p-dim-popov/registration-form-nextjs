import FormContext, { IFormContext } from "@src/contexts/form/FormContext";
import React, { useContext, useEffect } from "react";
import { IUseValidationRule } from "@src/hooks/useValidation/useValidation";

const useFormContextDefinitions = <T, TContext extends IFormContext = IFormContext>(
    fieldName: string,
    rules: IUseValidationRule<T, TContext>[],
    Context?: React.Context<TContext>,
) => {
    const context = useContext((Context ?? FormContext) as React.Context<TContext>);

    useEffect(() => {
        if (!context.getDefinitionFor(fieldName)?.length) {
            context?.setDefinitionFor<T>(fieldName)((<IUseValidationRule<T>[]>rules));
        }
    }, [context, rules, fieldName]);
};

export default useFormContextDefinitions;
