import React, { ReactElement } from "react";
import RegisterLayout from "@src/components/register/layout/RegisterLayout";
import type { NextPageWithLayout } from "@src/pages/_app";
import {
    RegisterPage,
} from "@src/contexts/register/RegisterContext";
import Input from "@src/components/input/Input";
import Rule from "@src/features/rule-creators/ruleCreators";

const validations = {
    email: { rules: [Rule({ name: "email" }).isRequired, Rule().shouldMatch(/^.*?@.*?$/i)] },
    password: { rules: [Rule().isRequired] },
    securityQuestion1: { rules: [Rule<string>().isRequired, Rule<string>().hasLengthBetween(2, 30), Rule<string>().shouldMatch(/[a-z]/i)] },
    securityQuestion2: { rules: [Rule<string>().isRequired, Rule<string>().hasLengthBetween(2, 30), Rule<string>().shouldMatch(/[a-z]/i)] },
};

const AccountDetails: NextPageWithLayout = () => {
    return (
        <>
            <Input
                id="email"
                validation={validations.email}
                inlineLabel
            />

            <Input
                id="password"
                validation={validations.password}
                inlineLabel
                showValidationStatus
            />

            <section>
                Security Questions
                <Input
                    id="question-1"
                    label="Your mother's maiden name"
                    validation={validations.securityQuestion1}
                    inlineLabel
                />
                <Input
                    id="question-2"
                    label="Your place of birth"
                    validation={validations.securityQuestion2}
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
    <RegisterLayout page={RegisterPage.AccountDetails}>
        {page}
    </RegisterLayout>
);

export default AccountDetails;
