import React from "react";

export interface IValidationErrorProps {
    message: string;
}

const ValidationError: React.FC<IValidationErrorProps> = ({ message }) => <li className="bg-red-300 text-white"><em>{message}</em></li>;

export default ValidationError;
