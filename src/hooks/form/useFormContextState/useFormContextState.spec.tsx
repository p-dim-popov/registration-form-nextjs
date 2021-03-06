import { renderHook } from "@testing-library/react-hooks";
import useFormContextState from "@src/hooks/form/useFormContextState/useFormContextState";
import { render, screen } from "@testing-library/react";
import FormContext, { getFormContextDefaultValue } from "@src/contexts/form/FormContext";
import React, { useEffect } from "react";

describe("useFormContextState", () => {
    it("should work as useState", () => {
        const { result } = renderHook(() => useFormContextState("age", { initialValue: 123 }));

        expect(result.current[0]).toEqual(123);
    });

    it("should get value from context if available", () => {
        const Mock: React.FC = () => {
            const [value] = useFormContextState("age", { initialValue: 123 });

            return <>{value}</>;
        };

        const state = getFormContextDefaultValue<number>();
        state.data.age = 321;

        render(
            <FormContext.Provider value={state}>
                <Mock />
            </FormContext.Provider>,
        );

        expect(screen.queryByText("321")).toBeInTheDocument();
    });

    it("should not initialize itself inside the context", () => {
        const Mock: React.FC = () => {
            const [value] = useFormContextState("age", { initialValue: 123 });

            return <>{value}</>;
        };

        const state = getFormContextDefaultValue<number>();
        state.set = (fieldName) => (value) => {
            state.data[fieldName] = value;
        };

        render(
            <FormContext.Provider value={state}>
                <Mock />
            </FormContext.Provider>,
        );

        expect(state.data.age).toBeUndefined();
    });

    it("should return setter to value in context", () => {
        const Mock: React.FC = () => {
            const [value, set] = useFormContextState("age", { initialValue: 123 });

            useEffect(() => {
                set(321);
            }, [set]);

            return <>{value}</>;
        };

        const state = getFormContextDefaultValue<number>();
        state.set = (fieldName) => (value) => {
            state.data[fieldName] = value;
        };

        render(
            <FormContext.Provider value={state}>
                <Mock />
            </FormContext.Provider>,
        );

        expect(state.data.age).toEqual(321);
    });

    it("should receive value and setter/onChange", () => {
        const onChangeMock = jest.fn();
        const Mock: React.FC = () => {
            const [value, set] = useFormContextState("age", { initialValue: 123, onChange: onChangeMock });

            useEffect(() => {
                set(321);
            }, [set]);

            return <>{value}</>;
        };

        render(<Mock />);

        expect(onChangeMock).toHaveBeenCalled();
    });
});
