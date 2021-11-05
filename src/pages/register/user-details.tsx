import React, { ReactElement } from "react";
import Input from "@src/components/input/Input";
import RegisterLayout from "@src/components/register/layout/RegisterLayout";
import { RegisterPage } from "@src/contexts/register/RegisterContext";
import { NextPageWithLayout } from "@src/pages/_app";
import Rule from "@src/features/rule-creators/ruleCreators";

const validations = {
    firstName: { rules: [Rule<string>().isRequired] },
    lastName: { rules: [Rule<string>().isRequired] },
    dob: { rules: [Rule<string>().isRequired] },
    gender: { rules: [Rule<string>().isRequired] },
};

const UserDetails: NextPageWithLayout = () => (
    <>
        <Input id="firstName" label="First Name" validation={validations.firstName} inlineLabel />
        <Input id="lastName" label="Last Name" validation={validations.lastName} inlineLabel />
        <Input id="dob" label="Date of Birth" validation={validations.dob} />

        <label htmlFor="gender">
            Gender
            <input name="gender" type="radio" value="male" />
            <input name="gender" type="radio" value="female" />
        </label>
    </>
);

UserDetails.getLayout = (page: ReactElement) => (
    <RegisterLayout page={RegisterPage.UserDetails}>
        {page}
    </RegisterLayout>
);

export default UserDetails;
