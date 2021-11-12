import React from "react";

const Draggable: React.FC = ({ children }) => (
    <div draggable>
        {children}
    </div>
);

export default Draggable;
