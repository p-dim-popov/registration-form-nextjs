import React from "react";

const Stepper: React.FC = ({ children }) => (
    <div className="flex flex-row">
        {
            [children]
                .flat()
                .reduce((prevVal, curVal) => (
                    <>
                        {prevVal}
                        <div className="border-t-2 border-gray-500 w-20 self-baseline m-8" />
                        {curVal}
                    </>
                ))
        }
    </div>
);

export default Stepper;
