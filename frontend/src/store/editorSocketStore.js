import { create } from "zustand";
import { useActiveFileTabStore } from "./activeFileTabStore";

export const useEditorSocketStore = create((set) => ({
    editorSocket: null,
    setEditorSocket: (incomingSocket) => {

        const activeFileTabSetter = useActiveFileTabStore.getState().setActiveFileTab;

        incomingSocket?.on("readFileSuccess", (data) => {
        console.log("read File Success", data);
        activeFileTabSetter(data.path, data.value)
    });

    incomingSocket?.on("writeFileSuccess", (data) => {
        console.log("write File Success", data);
        // incomingSocket.emit("readFile", { pathToFileOrFolder: data.path });
    });
        set({
            editorSocket: incomingSocket
        })
    }
}))