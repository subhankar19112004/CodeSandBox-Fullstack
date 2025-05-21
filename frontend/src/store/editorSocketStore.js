import { create } from "zustand";
import { useActiveFileTabStore } from "./activeFileTabStore";
import { useTreeStructureStore } from "./treeStructureStore";

export const useEditorSocketStore = create((set) => ({
    editorSocket: null,
    setEditorSocket: (incomingSocket) => {

        const activeFileTabSetter = useActiveFileTabStore.getState().setActiveFileTab;
        const projectTreeStructureSetter = useTreeStructureStore.getState().setTreeStructure;

        incomingSocket?.on("readFileSuccess", (data) => {
        console.log("read File Success", data);
        const fileExtension = data.path.split('.').pop();
        activeFileTabSetter(data.path, data.value, fileExtension)
    });

    incomingSocket?.on("writeFileSuccess", (data) => {
        console.log("write File Success", data);
        // incomingSocket.emit("readFile", { pathToFileOrFolder: data.path });
    });

    incomingSocket?.on("deleteFileSuccess", (data) => {
        console.log("delete File Success", data);
        projectTreeStructureSetter();
    });

    incomingSocket?.on("deleteFolderSuccess", (data) => {
        console.log("delete Folder Success", data);
        projectTreeStructureSetter();
    });
        set({
            editorSocket: incomingSocket
        })
    }
}))