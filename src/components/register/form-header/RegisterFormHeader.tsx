import React from "react";
import Stepper from "@src/components/stepper/Stepper";
import StepBox from "@src/components/step-box/StepBox";
import { RegisterPage } from "@src/contexts/register/RegisterContext";

const RegisterFormHeader: React.FC = (props) => (
    <div>
        <Stepper>
            <StepBox forPage={RegisterPage.AccountDetails}>1</StepBox>
            <StepBox forPage={RegisterPage.UserDetails}>2</StepBox>
            <StepBox forPage={RegisterPage.ContactDetails}>3</StepBox>
        </Stepper>
    </div>
);

export default RegisterFormHeader;
