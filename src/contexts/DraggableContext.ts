import React from "react";

export interface IDraggableContext {
    x: number;
    y: number;
    isDragging: boolean;
}

const DraggableContext = React.createContext<IDraggableContext>({
    x: 0, y: 0, isDragging: false,
});
export const DraggableContextProvider = DraggableContext.Provider;
export const DraggableContextConsumer = DraggableContext.Consumer;

export default DraggableContext;
