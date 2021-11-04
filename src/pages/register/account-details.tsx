import React, { ReactElement, useContext } from "react";
import RegisterLayout from "@src/components/register/layout/RegisterLayout";
import type { NextPageWithLayout } from "@src/pages/_app";
import RegisterContext, {
    RegisterPage,
} from "@src/contexts/register/RegisterContext";
import Input from "@src/components/input/Input";
import Rule from "@src/features/rule-creators/ruleCreators";

const AccountDetails: NextPageWithLayout = () => {
    const context = useContext(RegisterContext);
    const formDefinitions = context.definitions[RegisterPage.AccountDetails];

    return (
        <>
            <Input
                id="email"
                validation={{
                    rules: (formDefinitions?.email as []) || [],
                }}
                inlineLabel
            />

            <Input
                id="password"
                validation={{
                    rules: (formDefinitions?.password as []) || [],
                }}
                inlineLabel
                showValidationStatus
            />

            <section>
                Security Questions
                <Input
                    id="question-1"
                    label="Your mother's maiden name"
                    validation={{
                        rules: (formDefinitions?.securityQuestion1 as []) || [],
                    }}
                    inlineLabel
                />
                <Input
                    id="question-2"
                    label="Your place of birth"
                    validation={{
                        rules: (formDefinitions?.securityQuestion2 as []) || [],
                    }}
                    inlineLabel
                />
            </section>

            <section>
                Marketing Preferences
            </section>
        </>
    );
};

AccountDetails.getLayout = (page: ReactElement) => (
    <RegisterLayout
        page={RegisterPage.AccountDetails}
        formDefinitions={{
            email: [Rule({ name: "email" }).isRequired, Rule().shouldMatch(/^.*?@.*?$/i)],
            password: [Rule().isRequired],
            securityQuestion1: [Rule().isRequired, Rule().hasLengthBetween(2, 30), Rule().shouldMatch(/[a-z]/i)],
            securityQuestion2: [Rule().isRequired, Rule().hasLengthBetween(2, 30), Rule().shouldMatch(/[a-z]/i)],
        }}
    >
        {page}
    </RegisterLayout>
);

export default AccountDetails;
