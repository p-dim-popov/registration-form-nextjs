import React from "react";
import { render } from "@testing-library/react";
import FormContext from "./FormContext";

describe("FormContext", () => {
    it("should have definitions, data, and setter", () => {
        const { container } = render(
            <FormContext.Provider
                value={{
                    data: {},
                    definitions: {},
                    set: () => () => {},
                    setDefinitionFor: () => () => {},
                }}
            >
                <FormContext.Consumer>
                    {((props) => <div>{JSON.stringify(props)}</div>)}
                </FormContext.Consumer>
            </FormContext.Provider>,
        );

        expect(container.firstElementChild?.textContent).toContain("{}");
    });
});
