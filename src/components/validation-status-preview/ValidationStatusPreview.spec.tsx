import React from "react";
import { render, screen } from "@testing-library/react";
import ValidationStatusPreview
    from "@src/components/validation-status-preview/ValidationStatusPreview";

describe("ValidationStatusPreview", () => {
    it.each([
        [true],
        [false],
    ])("should not show valid status if validation not started, started: %s", (isStarted: boolean) => {
        render(<ValidationStatusPreview errorMessages={[]} validationMessages={["test 1"]} isValidationStarted={isStarted} />);

        const expectError = expect(screen.queryByText("test 1"));
        if (isStarted) {
            expectError.toHaveClass("text-green-700");
        } else {
            expectError.toHaveClass("text-gray-400");
        }
    });
});
