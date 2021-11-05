import React from "react";

export interface IValidationErrorProps {
    message: string;
}

const ValidationError: React.FC<IValidationErrorProps> = ({ message }) => <div className="bg-red-300 text-white">{message}</div>;

export default ValidationError;
