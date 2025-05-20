import { create } from "zustand";


export const useFileContextMenuStore = create((set) => ({
    x: null,
    y: null,
    isOpen: false,
    setX: (incomingX) => {
        set: ({
            x: incomingX
        });
    },
    setY: (incomingY) => {
        set: ({
            y: incomingY
        });
    },
    setIsOpen: (incomingIsOpen) => {
        set: ({
            isOpen: incomingIsOpen
        });
    },
}))