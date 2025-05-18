import { useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { FileIcon } from "../../atoms/FileIcon/Fileicon";
import { useEditorSocketStore } from "../../../store/editorSocketStore";

export const TreeNode = ({ fileFolderData }) => {
  const [visibility, setVisibility] = useState({});
  const { editorSocket } = useEditorSocketStore();

  function toggleVisibility(name) {
    setVisibility({
      ...visibility,
      [name]: !visibility[name],
    });
  }

  function computeExtersion(fileFolderData) {
    const names = fileFolderData.name.split(".");
    return names[names.length - 1];
    
  }  

  function handleDoubleClick(fileFolderData){
    console.log("Double clicked on ",fileFolderData.name);
    editorSocket.emit("readFile", {
      pathToFileOrFolder : fileFolderData.path
    })
    
  }

  return (
    fileFolderData && (
      <div
        style={{
          paddingLeft: "15px",
          color: "white",
        }}
      >
        {fileFolderData.children /** If the current node is a folder ?  */ ? (
          /** If the current node is a folder, render it as a button */
          <button
            onClick={() => toggleVisibility(fileFolderData.name)}
            style={{
              border: "none",
              cursor: "pointer",
              outline: "none",
              color: "white",
              backgroundColor: "transparent",
              fontSize: "18px",
            }}
          >
            {visibility[fileFolderData.name] ? (
              <IoIosArrowDown style={{ height: "10px", width: "10px" }} />
            ) : (
              <IoIosArrowForward style={{ height: "10px", width: "10px" }} />
            )}
            {fileFolderData.name}
          </button>
        ) : (
          /** if the current node is not a folder, render it as a file */

          <div style={{ display: "flex", alignItems: "center" }}>
            <FileIcon extension={computeExtersion(fileFolderData)} />
            <p
              style={{
                paddingTop: "5px",
                cursor: "pointer",
                color: "white",
                fontSize: "15px",
                marginLeft: "5px",
              }}
              onDoubleClick={ () => handleDoubleClick(fileFolderData) }
            >
              {fileFolderData.name}
            </p>
          </div>
        )}
        {visibility[fileFolderData.name] &&
          fileFolderData.children &&
          fileFolderData.children.map((child) => (
            <TreeNode
              key={child.name}
              fileFolderData={child}
            /> /** Render the child nodes and this is recusrsion */
          ))}
      </div>
    )
  );
};
