import React, { ReactElement } from "react";
import RegisterLayout from "@src/components/register/layout/RegisterLayout";
import type { NextPageWithLayout } from "@src/pages/_app";
import { RegisterPage } from "@src/contexts/register/RegisterContext";
import Input from "@src/components/input/Input";
import Checkbox from "@src/components/checkbox/Checkbox";
import FieldDefinition, {
    hasLengthBetween,
    hasMaxLength,
    isRequired,
    shouldMatch, shouldNotInclude,
} from "@src/features/rule-creators/FieldDefinition";

const EMAIL_REGEX = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

const validations = {
    email: {
        rules: FieldDefinition({
            name: "email",
            rules: [
                [isRequired],
                [shouldMatch(EMAIL_REGEX), "Email does not conform standards (RFC-822)"],
                [hasMaxLength(50)],
            ],
        }),
    },
    password: {
        rules: FieldDefinition({
            name: "password",
            rules: [
                [isRequired],
                [shouldNotInclude({ selector: (context) => context?.data?.firstName, description: "first name" })],
                [shouldNotInclude({ selector: (context) => context?.data?.lastName, description: "last name" })],
                [shouldNotInclude({ selector: (context) => context?.data?.email, description: "email" })],
            ],
        }),
    },
    securityQuestion1: {
        rules: FieldDefinition({
            name: "answer",
            rules: [
                [isRequired], [hasLengthBetween(2, 30)], [shouldMatch(/[a-z]/i)],
            ],
        }),
    },
    securityQuestion2: {
        rules: FieldDefinition({
            name: "answer",
            rules: [
                [isRequired], [hasLengthBetween(2, 30)], [shouldMatch(/[a-z]/i)],
            ],
        }),
    },
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
            isPassword
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
