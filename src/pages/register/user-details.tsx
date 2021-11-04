import React, { ReactElement } from "react";
import Input from "@src/components/input/Input";
import RegisterLayout from "@src/components/register/layout/RegisterLayout";
import { RegisterPage } from "@src/contexts/register/RegisterContext";
import { NextPageWithLayout } from "@src/pages/_app";
import Rule from "@src/features/rule-creators/ruleCreators";

const UserDetails: NextPageWithLayout = () => (
    <>
        <Input id="firstName" label="First Name" inlineLabel />
        <Input id="lastName" label="Last Name" inlineLabel />
        <Input id="dob" label="Date of Birth" />

        <label htmlFor="gender">
            Gender
            <input name="gender" type="radio" value="male" />
            <input name="gender" type="radio" value="female" />
        </label>
    </>
);

UserDetails.getLayout = (page: ReactElement) => (
    <RegisterLayout
        page={RegisterPage.UserDetails}
        formDefinitions={{
            firstName: [Rule().isRequired],
            lastName: [Rule().isRequired],
            dob: [Rule().isRequired],
            gender: [Rule().isRequired],
        }}
    >
        {page}
    </RegisterLayout>
);

export default UserDetails;
