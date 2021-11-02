import React, { ReactElement } from "react";
import RegisterLayout from "@src/components/register/layout/RegisterLayout";
import type { NextPageWithLayout } from "@src/pages/_app";
import { RegisterPage } from "@src/contexts/register/RegisterContext";

const AccountDetails: NextPageWithLayout = () => {
  return (
    <>
      <input type="text" placeholder="email" />
      <input type="text" placeholder="password" />

      <section>
        Security Questions
        <input type="text" />
        <input type="text" />
      </section>

      <section>
        Marketing Preferences
      </section>
    </>
  );
};

AccountDetails.getLayout = (page: ReactElement) => (
  <RegisterLayout page={RegisterPage.AccountDetails}>
    {page}
  </RegisterLayout>
);

export default AccountDetails;
