import { renderHook } from "@testing-library/react-hooks";
import useFormContextState from "@src/hooks/form/useFormContextState/useFormContextState";

describe("useFormContextState", () => {
    it("should work as useState", () => {
        const { result } = renderHook(() => useFormContextState(123));

        expect(result.current[0]).toEqual(123);
    });
});
