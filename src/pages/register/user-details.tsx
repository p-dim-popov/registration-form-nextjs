import React, { ReactElement } from "react";
import Input from "@src/components/input/Input";
import RegisterLayout from "@src/components/register/layout/RegisterLayout";
import { RegisterPage } from "@src/contexts/register/RegisterContext";
import { NextPageWithLayout } from "@src/pages/_app";
import Selector from "@src/components/selector/Selector";
import DateInput from "@src/components/date-input/DateInput";
import describeField, {
    isRequired,
    isValidBirthDate,
} from "@src/features/rule-creators/FieldDescriptor";

const validations = {
    firstName: { rules: describeField({ name: "first name", rules: [[isRequired]] }) },
    lastName: { rules: describeField({ name: "last name", rules: [[isRequired]] }) },
    dob: { rules: describeField({ name: "birth date", rules: [[isRequired], [isValidBirthDate()]] }) },
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
