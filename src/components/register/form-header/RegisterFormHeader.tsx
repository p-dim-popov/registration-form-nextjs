import React from "react";
import Stepper from "@src/components/stepper/Stepper";
import StepBox from "@src/components/step-box/StepBox";
import { RegisterPage } from "@src/contexts/register/RegisterContext";

const RegisterFormHeader: React.FC = () => (
    <Stepper>
        <StepBox forPage={RegisterPage.AccountDetails} title="Account Details">1</StepBox>
        <StepBox forPage={RegisterPage.UserDetails} title="User Details">2</StepBox>
        <StepBox forPage={RegisterPage.ContactDetails} title="Contact Details">3</StepBox>
    </Stepper>
);

export default RegisterFormHeader;
