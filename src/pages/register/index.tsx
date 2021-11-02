import React from "react";
import Link from "next/link";

const Register: React.FC = () => (
  <Link href="/register/account-details" passHref>
    <button type="button">Begin</button>
  </Link>
);

export default Register;
