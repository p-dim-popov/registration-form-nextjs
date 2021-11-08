import React from "react";

const RegisterFormFooter: React.FC = () => (
    <div className="flex flex-col items-center">
        <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-44 rounded-full">Continue</button>
        <div className="border-t-2 border-gray-200 min-w-full self-baseline my-8" />
        <div>
            Need help?
            {" "}
            <a target="_blank" href="/contact-us">Contact us</a>
        </div>
    </div>
);

export default RegisterFormFooter;
