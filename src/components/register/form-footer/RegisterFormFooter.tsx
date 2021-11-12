import React from "react";
import ContinueButton from "@src/components/register/form-footer/ContinueButton";

const RegisterFormFooter: React.FC = () => (
    <section className="flex flex-col items-center mt-20">
        <ContinueButton />
        <div className="border-t-2 border-gray-200 min-w-full self-baseline my-8" />
        <div>
            Need help?
            {" "}
            <a target="_blank" href="/contact-us">Contact us</a>
        </div>
    </section>
);

export default RegisterFormFooter;
