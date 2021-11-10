import React, { useContext } from "react";
import RegisterContext, { RegisterPage } from "@src/contexts/register/RegisterContext";
import { useRouter } from "next/router";
import classNames from "classnames";

export interface IStepBoxProps {
    title?: string;
    forPage: RegisterPage;
}

const RegisterStepBox: React.FC<IStepBoxProps> = ({ children, title, forPage }) => {
    const context = useContext(RegisterContext);
    const router = useRouter();
    const pageFormDefinitions = Object.entries(context.definitions[forPage] ?? {});

    const isActive = context.page === forPage;
    const isVisited = !!pageFormDefinitions.length;
    const isValid = pageFormDefinitions
        .every(([fieldName, rules]) => rules
            .every(({ test }) => test(context.data[fieldName], context)));

    return (
        <div
            role="button"
            className={classNames({
                "cursor-pointer flex flex-col items-center": true,
            })}
            onClick={() => router.push(forPage)}
            tabIndex={0}
        >
            <div
                className={classNames({
                    "rounded-full h-14 w-14 py-3 px-5 text-2xl font-bold": true,
                    "bg-gray-700 text-white": isActive,
                    "bg-gray-300 text-gray-400": !isActive && !isVisited,
                    "bg-green-200": !isActive && isVisited && isValid,
                    "bg-red-200": !isActive && isVisited && !isValid,
                })}
            >
                {children}
            </div>
            <h3>{title}</h3>
        </div>
    );
};

export default RegisterStepBox;
