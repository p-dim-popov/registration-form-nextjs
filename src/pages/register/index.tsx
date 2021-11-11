import React from "react";
import Link from "next/link";
import { getNextRegisterPage } from "@src/contexts/register/RegisterContext";

const Register: React.FC = () => (
    <div className="flex h-screen justify-center items-center content-center">
        <Link href={getNextRegisterPage()}>
            <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                Begin
            </a>
        </Link>
    </div>
);

export default Register;
