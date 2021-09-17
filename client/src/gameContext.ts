import React from "react";

export interface IGameConetxtProps {
    isInRoom: boolean;
    setInRoom: (inRoom: boolean) => void;
}

const defaultState: IGameConetxtProps = {
    isInRoom: false,
    setInRoom: () => {},
};

export default React.createContext(defaultState);