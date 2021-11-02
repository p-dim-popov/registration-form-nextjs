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

const StepBox: React.FC<IStepBoxProps> = ({ children, title, forPage }) => {
    const context = useContext(RegisterContext);
    const router = useRouter();

    const isActive = context.page === forPage;
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
                    "bg-gray-300 text-gray-400": !isActive,
                })}
            >
                {children}
            </div>
            <h3>{title}</h3>
        </div>
    );
};

export default StepBox;
