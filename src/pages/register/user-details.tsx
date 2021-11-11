import React, { ReactElement } from "react";
import Input from "@src/components/input/Input";
import RegisterLayout from "@src/components/register/layout/RegisterLayout";
import { RegisterPage } from "@src/contexts/register/RegisterContext";
import { NextPageWithLayout } from "@src/pages/_app";
import Selector from "@src/components/selector/Selector";
import DateInput from "@src/components/date-input/DateInput";
import describeField, {
    hasLengthBetween,
    isRequired,
    isValidBirthDate, shouldBeAgedMoreThan, shouldMatch,
} from "@src/features/field-descriptor/FieldDescriptor";

const ONLY_LETTERS_SPACE_APOSTROPHES_AND_DASHES_REGEX = /^[a-z- ']+$/gmi;
const NO_MORE_THAN_1_SPACE_APOSTROPHE_OR_DASH_REGEX = /^(?!.*-{2,})(?!.* {2,})(?!.*'{2,}).*$/gmi;

const validations = {
    firstName: {
        rules: describeField({
            name: "first name",
            rules: [
                [isRequired],
                [shouldMatch(ONLY_LETTERS_SPACE_APOSTROPHES_AND_DASHES_REGEX), "First name should be contained of only letters, spaces, apostrophes and dashes"],
                [shouldMatch(NO_MORE_THAN_1_SPACE_APOSTROPHE_OR_DASH_REGEX), "First name should not have 2 or more spaces, apostrophes or dashes one after another"],
                [hasLengthBetween(2, 30)],
            ],
        }),
    },
    lastName: {
        rules: describeField({
            name: "last name",
            rules: [
                [isRequired],
                [shouldMatch(ONLY_LETTERS_SPACE_APOSTROPHES_AND_DASHES_REGEX), "Last name should be contained of only letters, spaces, apostrophes and dashes"],
                [shouldMatch(NO_MORE_THAN_1_SPACE_APOSTROPHE_OR_DASH_REGEX), "Last name should not have 2 or more spaces, apostrophes or dashes one after another"],
                [hasLengthBetween(2, 30)],
            ],
        }),
    },
    dob: {
        rules: describeField({
            name: "birth date",
            rules: [
                [isRequired],
                [isValidBirthDate()],
                [shouldBeAgedMoreThan(18)],
            ],
        }),
    },
    gender: { rules: describeField({ name: "gender", rules: [[isRequired]] }) },
};

const UserDetails: NextPageWithLayout = () => (
    <>
        <Input id="firstName" label="First Name" validation={validations.firstName} inlineLabel />
        <Input id="lastName" label="Last Name" validation={validations.lastName} inlineLabel />
        <DateInput id="dateOfBirth" label="Date of Birth" validation={validations.dob} />

        <Selector
            id="gender"
            definitions={[{ value: "male", label: "Male" }, { value: "female", label: "Female" }]}
            label="Gender"
            validation={validations.gender}
        />
    </>
);

UserDetails.getLayout = (page: ReactElement) => (
    <RegisterLayout page={RegisterPage.UserDetails}>
        {page}
    </RegisterLayout>
);

export default UserDetails;
