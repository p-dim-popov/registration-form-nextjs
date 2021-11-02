import React, { ReactElement } from "react";
import RegisterLayout from "@src/components/register/layout/RegisterLayout";
import type { NextPageWithLayout } from "@src/pages/_app";
import { RegisterPages } from "@src/features/contexts/register-context/RegisterContext";

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
  <RegisterLayout page={RegisterPages.AccountDetails}>
    {page}
  </RegisterLayout>
);

export default AccountDetails;
