import React, { useContext } from "react";
import RegisterContext, { RegisterPage } from "@src/contexts/register/RegisterContext";

export enum StepBoxStatus {
    Active = "Active",
    Done = "Done",
    NotActive = "NotActive",
}

export interface IStepBoxProps {
    boxContent?: string;
    title?: string;
    forPage: RegisterPage;
}

const StepBox: React.FC<IStepBoxProps> = ({ boxContent, title, forPage }) => {
    const context = useContext(RegisterContext);
    const isActive = context.page === forPage;
    return (
        <div role="button" className="cursor-pointer">
            <div className={isActive ? "bg-blue" : "bg-gray"}>{boxContent}</div>
            <h3>{title}</h3>
        </div>
    );
};

export default StepBox;
