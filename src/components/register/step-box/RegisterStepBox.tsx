import React, { useContext } from "react";
import RegisterContext, { RegisterPage } from "@src/contexts/register/RegisterContext";
import { useRouter } from "next/router";
import classNames from "classnames";

export enum StepBoxStatus {
    Active = "Active",
    Done = "Done",
    NotActive = "NotActive",
}

export interface IStepBoxProps {
    title?: string;
    forPage: RegisterPage;
}

const RegisterStepBox: React.FC<IStepBoxProps> = ({ children, title, forPage }) => {
    const context = useContext(RegisterContext);
    const router = useRouter();
    const pageFormDefinitions = Object.entries(context.definitions[forPage] ?? {});

    const isActive = context.page === forPage;
    const isVisitedAndValid = !isActive && !!pageFormDefinitions.length && pageFormDefinitions
        .every(([fieldName, rules]) => rules
            .every(([test]) => test(context.data[fieldName])));

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
                    "bg-gray-300 text-gray-400": !isVisitedAndValid && !isActive,
                    "bg-blue-200": isVisitedAndValid && !isActive,
                })}
            >
                {children}
            </div>
            <h3>{title}</h3>
        </div>
    );
};

export default RegisterStepBox;
