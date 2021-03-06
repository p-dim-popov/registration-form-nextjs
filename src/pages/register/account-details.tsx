import React, { ReactElement } from "react";
import RegisterLayout from "@src/components/register/layout/RegisterLayout";
import type { NextPageWithLayout } from "@src/pages/_app";
import { RegisterPage } from "@src/contexts/register/RegisterContext";
import Input from "@src/components/input/Input";
import Checkbox from "@src/components/checkbox/Checkbox";
import describeField, {
    hasLengthBetween,
    hasMaxLength,
    isRequired,
    shouldMatch, shouldNotInclude,
} from "@src/features/field-descriptor/FieldDescriptor";

const EMAIL_REGEX = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

const validations = {
    email: {
        rules: describeField({
            name: "email",
            rules: [
                [isRequired],
                [shouldMatch(EMAIL_REGEX), "Email does not conform standards (RFC-822)"],
                [hasMaxLength(50)],
            ],
        }),
    },
    password: {
        rules: describeField({
            name: "password",
            rules: [
                [hasLengthBetween(8, 12)],
                [shouldMatch(/^(?=.*([a-z])).*$/gmi), "At least one letter"],
                [shouldMatch(/^(?=.*([0-9])).*$/gmi), "At least one number"],
                [shouldMatch(/[a-z0-9]/i), "No special characters"],
                [shouldMatch({ selector: (context) => new RegExp(`^(?!.*${context?.data?.firstName})(?!.*${context?.data?.lastName})(?!.*${context?.data?.email?.split("@").shift()}).*$`, "gmi"), description: "" }), "Can not include your first, last name or email"],
            ],
        }),
    },
    securityQuestion1: {
        rules: describeField({
            name: "answer",
            rules: [
                [isRequired], [hasLengthBetween(2, 30)], [shouldMatch(/[a-z]/i), "Answer should contain only letters"],
            ],
        }),
    },
    securityQuestion2: {
        rules: describeField({
            name: "answer",
            rules: [
                [isRequired], [hasLengthBetween(2, 30)], [shouldMatch(/[a-z]/i), "Answer should contain only letters"],
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
