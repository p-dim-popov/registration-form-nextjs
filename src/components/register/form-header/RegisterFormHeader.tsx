import React from "react";
import Stepper from "@src/components/stepper/Stepper";
import RegisterStepBox from "@src/components/register/step-box/RegisterStepBox";
import { RegisterPage } from "@src/contexts/register/RegisterContext";

const RegisterFormHeader: React.FC = () => (
    <Stepper>
        <RegisterStepBox forPage={RegisterPage.AccountDetails} title="Account Details">1</RegisterStepBox>
        <RegisterStepBox forPage={RegisterPage.UserDetails} title="User Details">2</RegisterStepBox>
        <RegisterStepBox forPage={RegisterPage.ContactDetails} title="Contact Details">3</RegisterStepBox>
    </Stepper>
);

export default RegisterFormHeader;
