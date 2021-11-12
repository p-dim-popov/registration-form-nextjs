import React, { useReducer } from "react";
import { DraggableContextProvider, IDraggableContext } from "@src/contexts/DraggableContext";

const Draggable: React.FC = ({ children }) => {
    const [state, setState] = useReducer(
        (prevState: IDraggableContext, newState: Partial<IDraggableContext>) => ({
            ...prevState, ...newState,
        }),
        {
            x: 0,
            y: 0,
            isDragging: false,
        },
    );

    return (
        <div draggable>
            <DraggableContextProvider value={state}>
                {children}
            </DraggableContextProvider>
        </div>
    );
};

export default Draggable;
