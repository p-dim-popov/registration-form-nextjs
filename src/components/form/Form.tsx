import React from "react";

export interface IFormProps {
}

const Form: React.FC<IFormProps> = ({ children }) => (
    <>
        {children}
    </>
);

export default Form;
