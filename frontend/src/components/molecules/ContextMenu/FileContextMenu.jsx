import { useEditorSocketStore } from "../../../store/editorSocketStore";
import { useFileContextMenuStore } from "../../../store/fileContextMenuStore.js";
import './FileContextMenu.css'

export const FileContextMenu = ({
    x,
    y,
    path
}) => {
    const { setIsOpen } = useFileContextMenuStore();
    const {editorSocket} = useEditorSocketStore(); 

    function handleFileDelete(e){
        e.preventDefault();
        console.log("Deleted file : ",path);
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
             onClick={handleFileDelete}
             >
                Delete File
            </button>
            <button className="fileContextButton " >
                Rename File
            </button>
        </div>
    )
}