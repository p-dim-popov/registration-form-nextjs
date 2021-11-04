import FormContext, { IFormFieldDefinition } from "@src/contexts/form/FormContext";
import { useContext, useEffect } from "react";

const useFormContextDefinitions = (
    fieldName: string,
    definitions: IFormFieldDefinition[],
) => {
    const context = useContext(FormContext);

    useEffect(() => {
        context?.setDefinitionFor?.(fieldName)?.(definitions);
    }, [context, definitions, fieldName]);
};

export default useFormContextDefinitions;
