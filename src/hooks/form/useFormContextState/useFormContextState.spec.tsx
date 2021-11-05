import { renderHook } from "@testing-library/react-hooks";
import useFormContextState from "@src/hooks/form/useFormContextState/useFormContextState";
import { render, screen } from "@testing-library/react";
import FormContext, { getFormContextDefaultValue } from "@src/contexts/form/FormContext";
import React from "react";
import { ValidationStatus } from "@src/hooks/useValidation/useValidation";

describe("useFormContextState", () => {
    it("should work as useState", () => {
        const { result } = renderHook(() => useFormContextState("age", 123));

        expect(result.current[0]).toEqual(123);
    });

    it("should get value from context if available", () => {
        const Mock: React.FC = () => {
            const [value] = useFormContextState("age", 123);

            return <>{value}</>;
        };

        const state = getFormContextDefaultValue<number>();
        state.data.age = {
            value: 321,
            status: ValidationStatus.Valid,
        };

        render(
            <FormContext.Provider value={state}>
                <Mock />
            </FormContext.Provider>,
        );

        expect(screen.queryByText("321")).toBeInTheDocument();
    });
});
