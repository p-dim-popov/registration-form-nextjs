import React, { ReactElement } from "react";
import RegisterLayout from "@src/components/register/layout/RegisterLayout";
import { RegisterPage } from "@src/contexts/register/RegisterContext";
import { NextPageWithLayout } from "@src/pages/_app";

const ContactDetails: NextPageWithLayout = () => (
    <>
        <h2>One last thing!</h2>
        <section>
            You need to be resident of the Republic of Ireland to register.
        </section>
        <label htmlFor="hasAgreed">
            <input id="hasAgreed" type="checkbox" />
            I confirm that:
        </label>
    </>
);

ContactDetails.getLayout = (page: ReactElement) => (
    <RegisterLayout page={RegisterPage.ContactDetails}>
        {page}
    </RegisterLayout>
);

export default ContactDetails;
