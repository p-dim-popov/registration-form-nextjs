import React from "react";

export interface IFormProps {
}

const Form: React.FC<IFormProps> = ({ children }) => {
  return (
    <>
      {children}
    </>
  );
};

export default Form;
