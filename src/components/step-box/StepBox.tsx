import React from "react";

export interface IStepBoxProps {
    boxContent?: string;
    title?: string;
}

const StepBox: React.FC<IStepBoxProps> = ({ boxContent, title }) => (
    <div role="button" className="cursor-pointer">
        <div>{boxContent}</div>
        <h3>{title}</h3>
    </div>
);

export default StepBox;
