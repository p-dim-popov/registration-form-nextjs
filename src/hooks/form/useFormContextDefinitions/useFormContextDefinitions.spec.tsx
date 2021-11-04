import useFormContextDefinitions
    from "@src/hooks/form/useFormContextDefinitions/useFormContextDefinitions";
import React from "react";
import { render } from "@testing-library/react";
import FormContext, { IFormContext } from "@src/contexts/form/FormContext";
import Field from "@src/features/rule-creators/ruleCreators";

describe("useFormContextDefinitions", () => {
    it("should register in form context", () => {
        const setDefinitionsForFirstNameMock = jest.fn();
        const contextData: IFormContext = {
            setDefinitionFor: () => setDefinitionsForFirstNameMock,
            data: {},
            set: () => () => {},
            definitions: {},
        };
        const definitions = [Field().isRequired];
        const Mock: React.FC = () => {
            useFormContextDefinitions("firstName", definitions, FormContext);
            return null;
        };
        render(<FormContext.Provider value={contextData}><Mock /></FormContext.Provider>);

        expect(setDefinitionsForFirstNameMock).toBeCalledWith(definitions);
    });
});
