import React, { useContext } from "react";
import { render, screen } from "@testing-library/react";
import RegisterLayout, {
    IRegisterLayoutState,
} from "@src/components/register/layout/RegisterLayout";
import RegisterContext, { RegisterPage } from "@src/contexts/register/RegisterContext";
import Field from "@src/features/rule-creators/ruleCreators";

describe("Layout", () => {
    it("should have 3 navigation buttons, 1 submit button, contact us link and children", () => {
        render(<RegisterLayout page={RegisterPage.AccountDetails}>CHILDREN</RegisterLayout>);

        const navigationButtons = screen.queryAllByText(/[123]/);
        expect(navigationButtons).toHaveLength(3);

        const submitButton = screen.queryByText(/continue/i);
        expect(submitButton).toBeInTheDocument();

        const contactUsLink = screen.queryByText(/contact us/i);
        expect(contactUsLink).toBeInTheDocument();
    });

    it("should should populate context with default data for each form definition", () => {
        const Mock: React.FC = () => {
            const context = useContext(RegisterContext);
            return <div>{JSON.stringify(context.data)}</div>;
        };

        render(
            <RegisterLayout
                page={RegisterPage.AccountDetails}
                formDefinitions={{ firstName: [Field().isRequired] }}
            >
                <Mock />
            </RegisterLayout>,
        );

        const element = screen.queryByText(/pending/i);
        expect(element).toBeInTheDocument();

        const contextFormData = JSON.parse(element?.textContent ?? "") as IRegisterLayoutState;
        expect(contextFormData.firstName.status).toMatch(/pending/i);
    });
});
