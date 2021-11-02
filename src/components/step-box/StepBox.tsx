import React, { useContext } from "react";
import RegisterContext, { RegisterPage } from "@src/contexts/register/RegisterContext";
import { useRouter } from "next/router";

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
        <div role="button" className="cursor-pointer" onClick={() => router.push(forPage)} tabIndex={0}>
            <div className={isActive ? "bg-blue" : "bg-gray"}>{children}</div>
            <h3>{title}</h3>
        </div>
    );
};

export default StepBox;
