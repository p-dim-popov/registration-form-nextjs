import React, { ReactElement } from "react";
import RegisterLayout from "@src/components/register/layout/RegisterLayout";
import { RegisterPage } from "@src/contexts/register/RegisterContext";
import { NextPageWithLayout } from "@src/pages/_app";
import Checkbox from "@src/components/checkbox/Checkbox";
import describeField, { isRequired } from "@src/features/field-descriptor/FieldDescriptor";

const validations = {
    hasAgreed: { rules: describeField({ rules: [[isRequired]] }) },
};

const ContactDetails: NextPageWithLayout = () => (
    <>
        <h2>One last thing!</h2>
        <section>
            You need to be resident of the Republic of Ireland to register.
        </section>
        <Checkbox id="hasAgreed" validation={validations.hasAgreed} label="I confirm that:" />
    </>
);

ContactDetails.getLayout = (page: ReactElement) => (
    <RegisterLayout page={RegisterPage.ContactDetails}>
        {page}
    </RegisterLayout>
);

export default ContactDetails;
