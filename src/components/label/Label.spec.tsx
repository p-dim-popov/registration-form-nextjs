import React from "react";
import { render } from "@testing-library/react";
import Label from "@src/components/label/Label";

describe("Label", () => {
    it.each([
        [true],
        [false],
    ])("should be hidden - %s", (isHidden) => {
        const label = "test-label";
        const { container } = render(<Label htmlFor="TEST" label={label} isHidden={isHidden} />);

        const labelElement = container.querySelector("label");
        const expectLabel = expect(labelElement);

        if (isHidden) {
            expectLabel.toBeNull();
        } else {
            expectLabel.toBeInTheDocument();
        }
    });
});
