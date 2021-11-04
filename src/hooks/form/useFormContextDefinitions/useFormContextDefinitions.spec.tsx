import useFormContextDefinitions
    from "@src/hooks/form/useFormContextDefinitions/useFormContextDefinitions";
import React from "react";
import { render } from "@testing-library/react";
import FormContext, { IFormContext } from "@src/contexts/form/FormContext";
import Rule from "@src/features/rule-creators/ruleCreators";

describe("useFormContextDefinitions", () => {
    it("should register in form context", () => {
        const setDefinitionsForFirstNameMock = jest.fn();
        const contextData: IFormContext = {
            setDefinitionFor: () => setDefinitionsForFirstNameMock,
            data: {},
            set: () => () => {},
            definitions: {},
            getDefinitionFor: () => [],
        };
        const definitions = [Rule().isRequired];
        const Mock: React.FC = () => {
            useFormContextDefinitions("firstName", definitions);
            return null;
        };
        render(<FormContext.Provider value={contextData}><Mock /></FormContext.Provider>);

        expect(setDefinitionsForFirstNameMock).toBeCalledWith(definitions);
    });

    it("should work (do nothing) without context", () => {
        const definitions = [Rule().isRequired];
        const Mock: React.FC = () => {
            useFormContextDefinitions("firstName", definitions);
            return null;
        };
        render(<Mock />);
    });
});
