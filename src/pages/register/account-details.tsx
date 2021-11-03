import React, { ReactElement, useContext } from "react";
import RegisterLayout from "@src/components/register/layout/RegisterLayout";
import type { NextPageWithLayout } from "@src/pages/_app";
import RegisterContext, {
    RegisterPage,
} from "@src/contexts/register/RegisterContext";
import Input from "@src/components/form/input/Input";
import Field from "@src/features/rule-creators/ruleCreators";

const AccountDetails: NextPageWithLayout = () => {
    const context = useContext(RegisterContext);
    const formDefinitions = context.allFormDefinitions[RegisterPage.AccountDetails];

    return (
        <>
            <Input
                id="email"
                validation={{
                    rules: (formDefinitions?.email as []) || [],
                    context,
                }}
                inlineLabel
            />

            <Input
                id="password"
                validation={{
                    rules: (formDefinitions?.password as []) || [],
                }}
                inlineLabel
            />

            <section>
                Security Questions
                <Input
                    id="question-1"
                    label="Your mother's maiden name"
                    validation={{
                        rules: (formDefinitions?.securityQuestion1 as []) || [],
                        context,
                    }}
                    inlineLabel
                />
                <Input
                    id="question-2"
                    label="Your place of birth"
                    validation={{
                        rules: (formDefinitions?.securityQuestion2 as []) || [],
                        context,
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
            email: [Field({ name: "email" }).isRequired, Field().shouldMatch(/^.*?@.*?$/i)],
            password: [Field().isRequired],
            securityQuestion1: [Field().isRequired, Field().hasLengthBetween(2, 30), Field().shouldMatch(/[a-z]/i)],
            securityQuestion2: [Field().isRequired, Field().hasLengthBetween(2, 30), Field().shouldMatch(/[a-z]/i)],
        }}
    >
        {page}
    </RegisterLayout>
);

export default AccountDetails;
