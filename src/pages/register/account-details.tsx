import React, { ReactElement } from "react";
import RegisterLayout from "@src/components/register/layout/RegisterLayout";
import type { NextPageWithLayout } from "@src/pages/_app";

const AccountDetails: NextPageWithLayout = () => {
  return null;
};

AccountDetails.getLayout = (page: ReactElement) => (
  <RegisterLayout>
    {page}
  </RegisterLayout>
);

export default AccountDetails;
