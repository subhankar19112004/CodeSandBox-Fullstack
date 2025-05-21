import { useEditorSocketStore } from "../../../store/editorSocketStore";

import { useFolderContextMenuStore } from "../../../store/folderContextMenuStore";
import './FolderContextMenu.css'

export const FolderContextMenu = ({
    x,
    y,
    path
}) => {
    const { setIsOpen } = useFolderContextMenuStore();
    const {editorSocket} = useEditorSocketStore(); 

    function handleFolderDelete(e){
        e.preventDefault();
        console.log("Deleted folder : ",path);
        editorSocket.emit(
            "deleteFile", 
            {
                pathToFileOrFolder : path
            });
    }


    return(
        <div  onMouseLeave={() => {
            setIsOpen(false);
        }}
              style={
            {
                width: "120px",
                position: "absolute",
                top: y,
                left: x,
                borderRadius: "5px"
            }
        } className="fileContextOptionsWrapper" >
            <button className="fileContextButton"
             onClick={handleFolderDelete}
             >
                Delete Folder
            </button>
            <button className="fileContextButton " >
                Create Folder
            </button>
            <button className="fileContextButton " >
                Rename Folder
            </button>
            <button className="fileContextButton " >
                Create File
            </button>
        </div>
    )
}