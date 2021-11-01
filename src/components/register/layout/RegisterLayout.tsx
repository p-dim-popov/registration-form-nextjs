import React from "react";
import RegisterFormHeader from "@src/components/register/RegisterFormHeader";

const RegisterLayout: React.FC = ({ children }) => (
  <>
    <RegisterFormHeader />
    {children}
    <button type="button">Continue</button>
    {/* This is intended to be opened as external link */}
    <a target="_blank" href="/contact-us">Contact us</a>
  </>
);

export default RegisterLayout;
