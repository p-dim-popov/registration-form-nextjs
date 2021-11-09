import React, { ReactElement } from "react";
import Input from "@src/components/input/Input";
import RegisterLayout from "@src/components/register/layout/RegisterLayout";
import { RegisterPage } from "@src/contexts/register/RegisterContext";
import { NextPageWithLayout } from "@src/pages/_app";
import Rule from "@src/features/rule-creators/ruleCreators";
import Selector from "@src/components/selector/Selector";
import DateInput from "@src/components/date-input/DateInput";

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
        <DateInput />

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
