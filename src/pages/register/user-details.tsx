import React, { ReactElement } from "react";
import Input from "@src/components/form/input/Input";
import RegisterLayout from "@src/components/register/layout/RegisterLayout";
import { RegisterPage } from "@src/contexts/register/RegisterContext";
import { NextPageWithLayout } from "@src/pages/_app";

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
    <RegisterLayout page={RegisterPage.UserDetails}>
        {page}
    </RegisterLayout>
);

export default UserDetails;
