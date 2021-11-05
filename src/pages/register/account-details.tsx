import React, { ReactElement } from "react";
import RegisterLayout from "@src/components/register/layout/RegisterLayout";
import type { NextPageWithLayout } from "@src/pages/_app";
import {
    RegisterPage,
} from "@src/contexts/register/RegisterContext";
import Input from "@src/components/input/Input";
import Rule from "@src/features/rule-creators/ruleCreators";
import Checkbox from "@src/components/checkbox/Checkbox";

const validations = {
    email: { rules: [Rule<string>({ name: "email" }).isRequired, Rule<string>().shouldMatch(/^.*?@.*?$/i)] },
    password: { rules: [Rule<string>().isRequired] },
    securityQuestion1: { rules: [Rule<string>().isRequired, Rule<string>().hasLengthBetween(2, 30), Rule<string>().shouldMatch(/[a-z]/i)] },
    securityQuestion2: { rules: [Rule<string>().isRequired, Rule<string>().hasLengthBetween(2, 30), Rule<string>().shouldMatch(/[a-z]/i)] },
};

const AccountDetails: NextPageWithLayout = () => (
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
            <Checkbox
                id="showNameIfWon"
                label="I am happy for my first name to be shown on the site if I win (Optional)"
            />
            <Checkbox
                id="shouldSubscribeToNewsletter"
                label="Email me about promotions, large jackpots and results (Optional)"
            />
        </section>
    </>
);

AccountDetails.getLayout = (page: ReactElement) => (
    <RegisterLayout page={RegisterPage.AccountDetails}>
        {page}
    </RegisterLayout>
);

export default AccountDetails;
