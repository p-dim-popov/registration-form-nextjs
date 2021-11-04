import { IFormContext, IFormFieldDefinition } from "@src/contexts/form/FormContext";
import React, { useContext, useEffect } from "react";

const useFormContextDefinitions = <TContext extends IFormContext> (
    fieldName: string,
    definitions: IFormFieldDefinition[],
    Context: React.Context<TContext>,
) => {
    const context = useContext(Context);

    useEffect(() => {
        context.setDefinitionFor(fieldName)(definitions);
    }, [context, definitions, fieldName]);
};

export default useFormContextDefinitions;
