import { create } from "zustand";

export const useFolderContextMenuStore = create((set) => ({
    x: null,
    y: null,
    isOpen: true,
    folder: null,
    setX: (incomingX) => {
        set({
            x: incomingX
        });
    },
    setY: (incomingY) => {
        set({
            y: incomingY
        });
    },
    setIsOpen: (incomingIsOpen) => {
        set({
            isOpen: incomingIsOpen
        });
    },
    setFolder: (incomingFolder) => {
        set({
            folder: incomingFolder   // FIXED here: was 'file'
        });
    }
}));
