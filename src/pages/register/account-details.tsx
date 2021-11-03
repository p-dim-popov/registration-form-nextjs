import React, { ReactElement } from "react";
import RegisterLayout from "@src/components/register/layout/RegisterLayout";
import type { NextPageWithLayout } from "@src/pages/_app";
import { RegisterPage } from "@src/contexts/register/RegisterContext";
import Input from "@src/components/form/input/Input";
import Field from "@src/features/rule-creators/ruleCreators";

const AccountDetails: NextPageWithLayout = () => (
    <>
        <Input id="email" inlineLabel />
        <Input id="password" inlineLabel />

        <section>
            Security Questions
            <Input id="question-1" label="Your mother's maiden name" inlineLabel />
            <Input id="question-2" label="Your place of birth" inlineLabel />
        </section>

        <section>
            Marketing Preferences
        </section>
    </>
);

AccountDetails.getLayout = (page: ReactElement) => (
    <RegisterLayout
        page={RegisterPage.AccountDetails}
        formDefinitions={{
            email: [Field().isRequired],
            password: [Field().isRequired],
        }}
    >
        {page}
    </RegisterLayout>
);

export default AccountDetails;
